using Faro.Domain.Enums;

namespace Faro.Application.Businesses.Dtos;

public class CreateBusinessRequest
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? BusinessType { get; set; }

    public BusinessVenueRelationship VenueRelationship { get; set; }

    public Guid OwnerUserAccountId { get; set; }
}