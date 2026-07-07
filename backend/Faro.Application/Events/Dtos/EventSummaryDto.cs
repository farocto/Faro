namespace Faro.Application.Events.Dtos;

public class EventSummaryDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public Guid? HostBusinessId { get; set; }

    public string? HostBusinessName { get; set; }

    public DateTime StartAtUtc { get; set; }

    public DateTime? EndAtUtc { get; set; }

    public string? Category { get; set; }

    public string? ImageUrl { get; set; }

    public bool IsFree { get; set; }

    public decimal? PriceAmount { get; set; }

    public string? PriceLabel { get; set; }

    public Guid VenueId { get; set; }

    public string VenueName { get; set; } = string.Empty;

    public string? VenueAddress { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string Status { get; set; } = string.Empty;
}