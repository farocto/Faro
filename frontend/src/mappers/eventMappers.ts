import type { EventSummaryDto } from "../api/eventsApi";
import type { EventPin } from "../types/map";

export function mapEventSummaryToEventPin(event: EventSummaryDto): EventPin {
  return {
    id: event.id,
    title: event.title,
    hostBusinessId: event.hostBusinessId,
    hostBusinessName: event.hostBusinessName,

    date: event.startAtUtc.split("T")[0],
    startAtUtc: event.startAtUtc,
    endAtUtc: event.endAtUtc,

    coordinates: [event.longitude, event.latitude],

    venueId: event.venueId,
    venueName: event.venueName,
    address: event.venueAddress ?? "",

    category: event.category,
    imageUrl: event.imageUrl,

    isFree: event.isFree,
    priceAmount: event.priceAmount,
    priceLabel: event.priceLabel,

    status: event.status,
    description: null,
  };
}

export function mapEventSummariesToEventPins(
  events: EventSummaryDto[]
): EventPin[] {
  return events.map(mapEventSummaryToEventPin);
}