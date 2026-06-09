using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Faro.Application.Events.Interfaces;
using Faro.Infrastructure.Events.Services;
using Faro.Application.Venues.Interfaces;
using Faro.Infrastructure.Venues.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddOpenApi();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IVenueService, VenueService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/", () => Results.Ok(new
{
    App = "Faro API",
    Status = "Running"
}));

app.Run();