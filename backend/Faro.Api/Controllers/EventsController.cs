using Faro.Application.Events.Dtos;
using Faro.Application.Events.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Faro.Api.Controllers;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<ActionResult<List<EventSummaryDto>>> GetEvents([FromQuery] DateTime? dateUtc)
    {
        var events = await _eventService.GetEventsAsync(dateUtc);

        return Ok(events);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EventDetailDto>> GetEventById(Guid id)
    {
        var eventDetail = await _eventService.GetEventByIdAsync(id);

        if (eventDetail is null)
        {
            return NotFound();
        }

        return Ok(eventDetail);
    }

    [HttpPost]
    public async Task<ActionResult<EventDetailDto>> CreateEvent(CreateEventRequest request)
    {
        try
        {
            var createdEvent = await _eventService.CreateEventAsync(request);

            return CreatedAtAction(
                nameof(GetEventById),
                new { id = createdEvent.Id },
                createdEvent);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new
            {
                error = exception.Message
            });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<EventDetailDto>> UpdateEvent(Guid id, UpdateEventRequest request)
    {
        try
        {
            var updatedEvent = await _eventService.UpdateEventAsync(id, request);

            if (updatedEvent is null)
            {
                return NotFound();
            }

            return Ok(updatedEvent);
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new
            {
                error = exception.Message
            });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        var deleted = await _eventService.DeleteEventAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}