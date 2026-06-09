using Faro.Application.Events.Dtos;
using Faro.Application.Events.Interfaces;
using Faro.Domain.Entities;
using Faro.Domain.Enums;
using Faro.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Faro.Infrastructure.Events.Services;

public class EventService : IEventService
{
    private readonly AppDbContext _dbContext;

    public EventService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<EventSummaryDto>> GetEventsAsync(DateTime? dateUtc = null)
    {
        var query = _dbContext.Events
            .AsNoTracking()
            .Include(e => e.Venue)
            .AsQueryable();

        if (dateUtc.HasValue)
        {
            var startOfDayUtc = dateUtc.Value.Date;
            var endOfDayUtc = startOfDayUtc.AddDays(1);

            query = query.Where(e =>
                e.StartAtUtc >= startOfDayUtc &&
                e.StartAtUtc < endOfDayUtc);
        }

        return await query
            .OrderBy(e => e.StartAtUtc)
            .Select(e => new EventSummaryDto
            {
                Id = e.Id,
                Title = e.Title,
                StartAtUtc = e.StartAtUtc,
                EndAtUtc = e.EndAtUtc,
                Category = e.Category,
                ImageUrl = e.ImageUrl,
                IsFree = e.IsFree,
                PriceAmount = e.PriceAmount,
                PriceLabel = e.PriceLabel,
                VenueId = e.VenueId,
                VenueName = e.Venue.Name,
                VenueAddress = e.Venue.AddressLine1,
                Latitude = e.Venue.Latitude,
                Longitude = e.Venue.Longitude,
                Status = e.Status.ToString()
            })
            .ToListAsync();
    }

    public async Task<EventDetailDto?> GetEventByIdAsync(Guid id)
    {
        return await _dbContext.Events
            .AsNoTracking()
            .Include(e => e.Venue)
            .Where(e => e.Id == id)
            .Select(e => new EventDetailDto
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                StartAtUtc = e.StartAtUtc,
                EndAtUtc = e.EndAtUtc,
                IsFree = e.IsFree,
                PriceAmount = e.PriceAmount,
                PriceLabel = e.PriceLabel,
                Category = e.Category,
                ImageUrl = e.ImageUrl,
                ExternalUrl = e.ExternalUrl,
                Status = e.Status.ToString(),
                VenueId = e.VenueId,
                VenueName = e.Venue.Name,
                AddressLine1 = e.Venue.AddressLine1,
                AddressLine2 = e.Venue.AddressLine2,
                City = e.Venue.City,
                State = e.Venue.State,
                PostalCode = e.Venue.PostalCode,
                Country = e.Venue.Country,
                Latitude = e.Venue.Latitude,
                Longitude = e.Venue.Longitude,
                CreatedAtUtc = e.CreatedAtUtc,
                UpdatedAtUtc = e.UpdatedAtUtc
            })
            .FirstOrDefaultAsync();
    }

    public async Task<EventDetailDto> CreateEventAsync(CreateEventRequest request)
    {
        var venueExists = await _dbContext.Venues
            .AnyAsync(v => v.Id == request.VenueId);

        if (!venueExists)
        {
            throw new InvalidOperationException("Venue does not exist.");
        }

        var nowUtc = DateTime.UtcNow;

        var eventEntity = new Event
        {
            Id = Guid.NewGuid(),
            Title = request.Title.Trim(),
            Description = request.Description,
            StartAtUtc = request.StartAtUtc,
            EndAtUtc = request.EndAtUtc,
            IsFree = request.IsFree,
            PriceAmount = request.PriceAmount,
            PriceLabel = request.PriceLabel,
            Category = request.Category,
            ImageUrl = request.ImageUrl,
            ExternalUrl = request.ExternalUrl,
            VenueId = request.VenueId,
            Status = EventStatus.Published,
            CreatedAtUtc = nowUtc,
            UpdatedAtUtc = nowUtc
        };

        _dbContext.Events.Add(eventEntity);

        await _dbContext.SaveChangesAsync();

        var createdEvent = await GetEventByIdAsync(eventEntity.Id);

        return createdEvent!;
    }

    public async Task<EventDetailDto?> UpdateEventAsync(Guid id, UpdateEventRequest request)
    {
        var eventEntity = await _dbContext.Events
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity is null)
        {
            return null;
        }

        var venueExists = await _dbContext.Venues
            .AnyAsync(v => v.Id == request.VenueId);

        if (!venueExists)
        {
            throw new InvalidOperationException("Venue does not exist.");
        }

        eventEntity.Title = request.Title.Trim();
        eventEntity.Description = request.Description;
        eventEntity.StartAtUtc = request.StartAtUtc;
        eventEntity.EndAtUtc = request.EndAtUtc;
        eventEntity.IsFree = request.IsFree;
        eventEntity.PriceAmount = request.PriceAmount;
        eventEntity.PriceLabel = request.PriceLabel;
        eventEntity.Category = request.Category;
        eventEntity.ImageUrl = request.ImageUrl;
        eventEntity.ExternalUrl = request.ExternalUrl;
        eventEntity.VenueId = request.VenueId;
        eventEntity.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return await GetEventByIdAsync(eventEntity.Id);
    }

    public async Task<bool> DeleteEventAsync(Guid id)
    {
        var eventEntity = await _dbContext.Events
            .FirstOrDefaultAsync(e => e.Id == id);

        if (eventEntity is null)
        {
            return false;
        }

        _dbContext.Events.Remove(eventEntity);

        await _dbContext.SaveChangesAsync();

        return true;
    }
}