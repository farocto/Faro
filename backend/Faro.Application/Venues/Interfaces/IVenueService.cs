using Faro.Application.Venues.Dtos;

namespace Faro.Application.Venues.Interfaces;

public interface IVenueService
{
    Task<List<VenueSummaryDto>> GetVenuesAsync();

    Task<VenueDto?> GetVenueByIdAsync(Guid id);

    Task<VenueDto> CreateVenueAsync(CreateVenueRequest request);

    Task<VenueDto?> UpdateVenueAsync(Guid id, UpdateVenueRequest request);

    Task<bool> DeleteVenueAsync(Guid id);
}