using Faro.Application.Venues.Dtos;
using Faro.Application.Venues.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Faro.Api.Controllers;

[ApiController]
[Route("api/venues")]
public class VenuesController : ControllerBase
{
    private readonly IVenueService _venueService;

    public VenuesController(IVenueService venueService)
    {
        _venueService = venueService;
    }

    [HttpGet]
    public async Task<ActionResult<List<VenueSummaryDto>>> GetVenues()
    {
        var venues = await _venueService.GetVenuesAsync();

        return Ok(venues);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<VenueDto>> GetVenueById(Guid id)
    {
        var venue = await _venueService.GetVenueByIdAsync(id);

        if (venue is null)
        {
            return NotFound();
        }

        return Ok(venue);
    }

    [HttpPost]
    public async Task<ActionResult<VenueDto>> CreateVenue(CreateVenueRequest request)
    {
        var createdVenue = await _venueService.CreateVenueAsync(request);

        return CreatedAtAction(
            nameof(GetVenueById),
            new { id = createdVenue.Id },
            createdVenue);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<VenueDto>> UpdateVenue(Guid id, UpdateVenueRequest request)
    {
        var updatedVenue = await _venueService.UpdateVenueAsync(id, request);

        if (updatedVenue is null)
        {
            return NotFound();
        }

        return Ok(updatedVenue);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteVenue(Guid id)
    {
        try
        {
            var deleted = await _venueService.DeleteVenueAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new
            {
                error = exception.Message
            });
        }
    }
}