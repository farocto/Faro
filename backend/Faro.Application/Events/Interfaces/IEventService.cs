using Faro.Application.Events.Dtos;

namespace Faro.Application.Events.Interfaces;

public interface IEventService
{
    Task<List<EventSummaryDto>> GetEventsAsync(DateTime? dateUtc = null);

    Task<EventDetailDto?> GetEventByIdAsync(Guid id);

    Task<EventDetailDto> CreateEventAsync(CreateEventRequest request);

    Task<EventDetailDto?> UpdateEventAsync(Guid id, UpdateEventRequest request);

    Task<bool> DeleteEventAsync(Guid id);
}