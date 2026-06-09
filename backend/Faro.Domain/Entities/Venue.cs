

namespace Faro.Domain.Entities
{
    public class Venue : BaseEntity
    {
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

        public string? VenueType { get; set; }
        public int? Capacity { get; set; }

        public bool IsRentable { get; set; }
        public string? RentalNotes { get; set; }

        public bool IsPubliclyListed { get; set; } = true;

        public ICollection<Event> Events { get; set; } = new List<Event>();
    }

}
