namespace Faro.Domain.Entities;

using Faro.Domain.Enums;

public class BusinessAccount : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? BusinessType { get; set; }

    public BusinessAccountStatus Status { get; set; } = BusinessAccountStatus.Pending;

    public BusinessVenueRelationship VenueRelationship { get; set; } = BusinessVenueRelationship.NoVenueNeeded;

    public Guid OwnerUserAccountId { get; set; }

    public UserAccount OwnerUserAccount { get; set; } = null!;

    public ICollection<Event> Events { get; set; } = new List<Event>();

    public ICollection<Venue> Venues { get; set; } = new List<Venue>();
}