namespace Faro.Application.Events.Dtos;

public class CreateEventRequest
{
    public string Title { get; set; } = string.Empty;

    public Guid? HostBusinessId { get; set; }

    public string? Description { get; set; }

    public DateTime StartAtUtc { get; set; }

    public DateTime? EndAtUtc { get; set; }

    public bool IsFree { get; set; }

    public decimal? PriceAmount { get; set; }

    public string? PriceLabel { get; set; }

    public string? Category { get; set; }

    public string? ImageUrl { get; set; }

    public string? ExternalUrl { get; set; }

    public Guid VenueId { get; set; }
}