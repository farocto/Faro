using Faro.Application.Venues.Dtos;
using Faro.Application.Venues.Interfaces;
using Faro.Domain.Entities;
using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Faro.Infrastructure.Venues.Services;

public class VenueService : IVenueService
{
    private readonly AppDbContext _dbContext;

    public VenueService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<VenueSummaryDto>> GetVenuesAsync()
    {
        return await _dbContext.Venues
            .AsNoTracking()
            .OrderBy(v => v.Name)
            .Select(v => new VenueSummaryDto
            {
                Id = v.Id,
                Name = v.Name,
                AddressLine1 = v.AddressLine1,
                City = v.City,
                State = v.State,
                Country = v.Country,
                Latitude = v.Latitude,
                Longitude = v.Longitude
            })
            .ToListAsync();
    }

    public async Task<VenueDto?> GetVenueByIdAsync(Guid id)
    {
        return await _dbContext.Venues
            .AsNoTracking()
            .Where(v => v.Id == id)
            .Select(v => new VenueDto
            {
                Id = v.Id,
                Name = v.Name,
                AddressLine1 = v.AddressLine1,
                AddressLine2 = v.AddressLine2,
                City = v.City,
                State = v.State,
                PostalCode = v.PostalCode,
                Country = v.Country,
                Latitude = v.Latitude,
                Longitude = v.Longitude,
                PlaceId = v.PlaceId,
                CreatedAtUtc = v.CreatedAtUtc,
                UpdatedAtUtc = v.UpdatedAtUtc
            })
            .FirstOrDefaultAsync();
    }

    public async Task<VenueDto> CreateVenueAsync(CreateVenueRequest request)
    {
        var nowUtc = DateTime.UtcNow;

        var venue = new Venue
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            AddressLine1 = request.AddressLine1,
            AddressLine2 = request.AddressLine2,
            City = request.City,
            State = request.State,
            PostalCode = request.PostalCode,
            Country = request.Country,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            PlaceId = request.PlaceId,
            CreatedAtUtc = nowUtc,
            UpdatedAtUtc = nowUtc
        };

        _dbContext.Venues.Add(venue);

        await _dbContext.SaveChangesAsync();

        var createdVenue = await GetVenueByIdAsync(venue.Id);

        return createdVenue!;
    }

    public async Task<VenueDto?> UpdateVenueAsync(Guid id, UpdateVenueRequest request)
    {
        var venue = await _dbContext.Venues
            .FirstOrDefaultAsync(v => v.Id == id);

        if (venue is null)
        {
            return null;
        }

        venue.Name = request.Name.Trim();
        venue.AddressLine1 = request.AddressLine1;
        venue.AddressLine2 = request.AddressLine2;
        venue.City = request.City;
        venue.State = request.State;
        venue.PostalCode = request.PostalCode;
        venue.Country = request.Country;
        venue.Latitude = request.Latitude;
        venue.Longitude = request.Longitude;
        venue.PlaceId = request.PlaceId;
        venue.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return await GetVenueByIdAsync(venue.Id);
    }

    public async Task<bool> DeleteVenueAsync(Guid id)
    {
        var venue = await _dbContext.Venues
            .Include(v => v.Events)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (venue is null)
        {
            return false;
        }

        if (venue.Events.Any())
        {
            throw new InvalidOperationException("Cannot delete a venue that has events assigned to it.");
        }

        _dbContext.Venues.Remove(venue);

        await _dbContext.SaveChangesAsync();

        return true;
    }
}