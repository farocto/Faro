using Faro.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Faro.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Event> Events => Set<Event>();
    public DbSet<Venue> Venues => Set<Venue>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(e => e.Description)
                .HasMaxLength(2000);

            entity.Property(e => e.Category)
                .HasMaxLength(100);

            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500);

            entity.Property(e => e.ExternalUrl)
                .HasMaxLength(500);

            entity.Property(e => e.PriceLabel)
                .HasMaxLength(100);

            entity.Property(e => e.PriceAmount)
                .HasColumnType("decimal(10,2)");

            entity.HasOne(e => e.Venue)
                .WithMany(v => v.Events)
                .HasForeignKey(e => e.VenueId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Venue>(entity =>
        {
            entity.HasKey(v => v.Id);

            entity.Property(v => v.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(v => v.AddressLine1)
                .HasMaxLength(200);

            entity.Property(v => v.AddressLine2)
                .HasMaxLength(200);

            entity.Property(v => v.City)
                .HasMaxLength(100);

            entity.Property(v => v.State)
                .HasMaxLength(100);

            entity.Property(v => v.PostalCode)
                .HasMaxLength(50);

            entity.Property(v => v.Country)
                .HasMaxLength(100);

            entity.Property(v => v.PlaceId)
                .HasMaxLength(200);
        });

      
    }
}
