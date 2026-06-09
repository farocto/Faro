

using Faro.Domain.Enums;
using System;

namespace Faro.Domain.Entities
{
    public class Event : BaseEntity
    {

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

        public EventStatus Status { get; set; } = EventStatus.Draft;

        public Guid VenueId { get; set; }
        public Venue Venue { get; set; } = null!;

    }
}