namespace Faro.Domain.Enums;

public enum BusinessVenueRelationship
{
    HasOwnVenue = 0,
    HasOwnVenueAndRentsIt = 1,
    NeedsVenue = 2,
    NoVenueNeeded = 3
}