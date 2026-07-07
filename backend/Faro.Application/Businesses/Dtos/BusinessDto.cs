using Faro.Domain.Enums;

namespace Faro.Application.Businesses.Dtos;

public class BusinessDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? BusinessType { get; set; }

    public BusinessStatus Status { get; set; }

    public BusinessVenueRelationship VenueRelationship { get; set; }

    public Guid OwnerUserAccountId { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public DateTime UpdatedAtUtc { get; set; }
}