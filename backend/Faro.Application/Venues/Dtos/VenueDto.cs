namespace Faro.Application.Venues.Dtos;

public class VenueDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string? PlaceId { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public DateTime UpdatedAtUtc { get; set; }
}