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
    public DbSet<UserAccount> UserAccounts => Set<UserAccount>();
    public DbSet<Business> Businesses => Set<Business>();

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

        modelBuilder.Entity<UserAccount>(entity =>
        {
            entity.ToTable("UserAccounts");

            entity.HasKey(u => u.Id);

            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(256);

            entity.Property(u => u.DisplayName)
                .IsRequired()
                .HasMaxLength(150);

            entity.HasMany(u => u.Businesses)
                .WithOne(b => b.OwnerUserAccount)
                .HasForeignKey(b => b.OwnerUserAccountId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Business>(entity =>
        {
            entity.ToTable("Businesses");

            entity.HasKey(b => b.Id);

            entity.Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(b => b.Description)
                .HasMaxLength(1000);

            entity.Property(b => b.BusinessType)
                .HasMaxLength(100);

            entity.HasMany(b => b.Events)
                .WithOne(e => e.HostBusiness)
                .HasForeignKey(e => e.HostBusinessId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasMany(b => b.Venues)
                .WithOne(v => v.OwnerBusiness)
                .HasForeignKey(v => v.OwnerBusinessId)
                .OnDelete(DeleteBehavior.Restrict);
        });

    }
}
