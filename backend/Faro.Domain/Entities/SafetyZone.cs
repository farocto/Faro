namespace Faro.Domain.Entities;

using Faro.Domain.Enums;
using System;

public class SafetyZone
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public double RadiusMeters { get; set; }

    public SafetyZoneType Type { get; set; } = SafetyZoneType.General;

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAtUtc { get; set; }
    public DateTime UpdatedAtUtc { get; set; }
}