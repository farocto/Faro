namespace Faro.Application.Events.Dtos;

public class EventDetailDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime StartAtUtc { get; set; }

    public DateTime? EndAtUtc { get; set; }

    public bool IsFree { get; set; }

    public decimal? PriceAmount { get; set; }

    public string? PriceLabel { get; set; }

    public string? Category { get; set; }

    public string? ImageUrl { get; set; }

    public string? ExternalUrl { get; set; }

    public string Status { get; set; } = string.Empty;

    public Guid VenueId { get; set; }

    public string VenueName { get; set; } = string.Empty;

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public DateTime UpdatedAtUtc { get; set; }
}