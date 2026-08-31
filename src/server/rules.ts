/* SafeRide Priority. Backend rules module.
   Single source of truth for product rules and shared trip data.
   The written spec is in src/server/specifications/RULES.md.
   Keep rule values here. Never hardcode them in screens. */

export const LATE_NIGHT_START_HOUR = 20; // 8 PM. Late hours count too, not just late night.
export const LATE_NIGHT_END_HOUR = 5; // 5 AM
export const PICKUP_SLOT_MINUTES = 15;
export const MAX_CIRCLE_CONTACTS = 5;
export const TRACKING_LINK_EXPIRY_MINUTES = 30; // after the trip ends and the rider confirms safe
export const NO_RESPONSE_LINK_HOURS = 12; // if the rider never confirms, the link stays this long
export const CHECKIN_PROMPT_AFTER_MINUTES = 5;
export const CHECKIN_REMINDER_AFTER_MINUTES = 10;
export const TRACKING_URL = "saferide.demo/t/8FK2Q";
export const TRIP_ETA_MINUTES = 24;
export const TRIP_PIN = "4827"; // one source for the ride PIN, shown to rider and contacts
export const UBER_HELPLINE = "1800 555 0199"; // fictional demo helpline

/* Rules 7 and 8. SafeRide runs only between 8 PM and 5 AM. */
export function isWithinLateNightWindow(hour: number): boolean {
  return hour >= LATE_NIGHT_START_HOUR || hour < LATE_NIGHT_END_HOUR;
}

/* Rule 9. Pickup slots run every 15 minutes from 8:00 PM to 5:00 AM. */
export function pickupSlots(): string[] {
  const slots: string[] = [];
  const hours = [20, 21, 22, 23, 0, 1, 2, 3, 4];
  for (const h of hours) {
    for (const m of [0, 15, 30, 45]) {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h >= 12 ? "PM" : "AM";
      slots.push(`${h12}:${String(m).padStart(2, "0")} ${ampm}`);
    }
  }
  slots.push("5:00 AM");
  return slots;
}

/* Rules 30 to 34. The Female rider toggle.
   Any user can use SafeRide. A rider who turns this on gets priority
   matching, the driver is alerted before the trip that a female
   passenger is travelling, and live GPS tracking becomes mandatory. */
export const FEMALE_RIDER_DRIVER_ALERT =
  "The driver will be alerted that a female passenger is travelling.";
export const FEMALE_RIDER_GPS_NOTE =
  "Live GPS tracking is mandatory for this trip.";

/* Committed pickup. A SafeRide match is a promise the ride will come.
   The driver accepts the trip before the rider sees the match, cannot
   drop it for a ride on another app, and a cancel means an instant
   first-in-line rematch. Urgent and hospital trips head the queue. */
export const MATCH_COMMIT_NOTE =
  "This driver accepted your trip before you saw this match and cannot drop it for a ride on another app. If anything changes, you are rematched first in line.";

/* Why this ride. One tap tells SafeRide why the rider is travelling.
   The reason sets the place in the priority queue, and the top reasons
   unlock SafeRide at any hour of the day. The reason stays private:
   the driver only ever sees a priority flag. */
export type ReasonTier = "top" | "high" | "standard";
export type TripReason = {
  key: string;
  label: string;
  sub: string;
  tier: ReasonTier;
  anyHour: boolean;
};
export const TRIP_REASONS: TripReason[] = [
  { key: "emergency", label: "Emergency", sub: "personal or accident", tier: "top", anyHour: true },
  { key: "medical", label: "Medical", sub: "hospital or pharmacy run", tier: "top", anyHour: true },
  { key: "urgent", label: "Urgent", sub: "cannot wait", tier: "high", anyHour: true },
  { key: "work", label: "Work or shift", sub: "office or late shift home", tier: "standard", anyHour: false },
  { key: "study", label: "Classes or exams", sub: "tuition, college, exam hall", tier: "standard", anyHour: false },
  { key: "catch", label: "Train, bus or flight", sub: "a departure to catch", tier: "high", anyHour: false },
  { key: "family", label: "Family pickup", sub: "child or elderly pickup", tier: "standard", anyHour: false },
  { key: "event", label: "Late event", sub: "dinner, party, wedding", tier: "standard", anyHour: false },
  { key: "alone", label: "Travelling alone", sub: "extra eyes on the trip", tier: "standard", anyHour: false },
  { key: "just", label: "Just a ride", sub: "no special reason needed", tier: "standard", anyHour: false },
];
export const REASON_TIER_LINES: Record<ReasonTier, string> = {
  top: "Top of the queue. A committed driver is assigned to you first.",
  high: "High priority. You are matched ahead of standard requests.",
  standard: "Standard priority queue, with every SafeRide protection on.",
};
export const REASON_QUEUE_LABELS: Record<ReasonTier, string> = {
  top: "Top of the queue",
  high: "High priority",
  standard: "Standard priority",
};
export const REASON_PRIVACY_NOTE =
  "Your reason stays private. The driver only sees a priority flag, never the reason.";
export const REASON_ANY_HOUR_NOTE =
  "Emergency, medical and urgent trips can use SafeRide Priority at any hour, day or night.";
export function tripReason(key: string): TripReason {
  return TRIP_REASONS.find((r) => r.key === key) ?? TRIP_REASONS[TRIP_REASONS.length - 1];
}

/* Turns a label like "10:45 PM" into an hour in 24 hour time. */
export function parseTimeLabel(label: string): number | null {
  const m = label.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h;
}

/* Rule 35. A rider can save up to 5 contacts. */
export function canAddContact(currentCount: number): boolean {
  return currentCount < MAX_CIRCLE_CONTACTS;
}

export interface Driver {
  name: string;
  car: string;
  plate: string;
  rating: string;
  initials: string;
  phone: string;
}

/* One place for the demo drivers. Screens must read from here. */
export const DRIVERS: Record<"standard" | "priority", Driver> = {
  standard: { name: "Ramesh K.", car: "White Swift Dzire", plate: "TS 09 EM 4821", rating: "4.7", initials: "RK", phone: "+91 90000 11223" },
  priority: { name: "Anil S.", car: "Grey Ertiga", plate: "TS 10 CB 2214", rating: "4.8", initials: "AS", phone: "+91 90000 44556" },
};

export function vehicleLine(d: Driver): string {
  return `${d.car} · ${d.plate}`;
}

/* Rule 39. The SMS to each selected contact must carry the rider's name,
   the tracking link, the driver's name, the vehicle and the plate number. */
export function buildCircleSms(input: {
  riderName: string;
  dropShort: string;
  driver: Driver;
  etaLabel?: string;
  anchor?: string | null;
}): { lines: string[]; footer: string } {
  const { riderName, dropShort, driver } = input;
  return {
    lines: [
      `${riderName} is travelling in an Uber late at night, from HITEC City to ${dropShort}.`,
      `Track the trip live: ${TRACKING_URL} (mock)`,
      `Driver: ${driver.name} (${driver.rating} ★)`,
      `Vehicle: ${driver.car} · Plate ${driver.plate}`,
      `Trip PIN: ${TRIP_PIN}`,
      ...(input.anchor ? [`Safer drop anchor: ${input.anchor} (staffed spot)`] : []),
      `ETA: ${input.etaLabel ?? `${TRIP_ETA_MINUTES} minutes`}`,
    ],
    footer: `This is an automated safety message. Reply HELP if concerned. The link stays live for the whole trip and expires ${TRACKING_LINK_EXPIRY_MINUTES} minutes after it ends.`,
  };
}

/* Rules 11 to 14. SafeRide covers in-city trips and outstation trips,
   on every ride type except Parcel. The demo outstation trip. */
export const OUTSTATION_ETA_LABEL = "about 4 hours";
export const OUTSTATION_DROPS = [
  "Warangal, Fort Road",
  "Vijayawada, MG Road",
  "Srisailam, Temple Gate",
];

/* Initials for a contact chip. "Rahul D." becomes "RD". */
export function contactInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "?";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0]?.[1] ?? "");
  return (a + b).toUpperCase();
}
