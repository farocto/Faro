using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Faro.Application.Events.Interfaces;
using Faro.Infrastructure.Events.Services;
using Faro.Application.Venues.Interfaces;
using Faro.Infrastructure.Venues.Services;
using Faro.Application.Businesses.Interfaces;
using Faro.Application.UserAccounts.Interfaces;
using Faro.Infrastructure.Businesses.Services;
using Faro.Infrastructure.UserAccounts.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddOpenApi();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IVenueService, VenueService>();
builder.Services.AddScoped<IUserAccountService, UserAccountService>();
builder.Services.AddScoped<IBusinessService, BusinessService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FaroFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("FaroFrontend");

app.MapControllers();

app.MapGet("/", () => Results.Ok(new
{
    App = "Faro API",
    Status = "Running"
}));

app.Run();