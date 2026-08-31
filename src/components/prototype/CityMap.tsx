/* Shared Hyderabad demo map. One source for the blocks, roads and
   pickup/drop markers used by the rider phone and the contact tracker. */

export const MAP_ROUTE_PATH = "M56 94 L124 94 L124 190 L262 190 L262 146 L340 146";

export function CityMapLayers() {
  return (
    <>
      <rect width="402" height="250" fill="#EAEDEF" />
      <rect x="-20" y="16" width="148" height="70" rx="5" fill="#E0E5E8" />
      <rect x="150" y="-12" width="118" height="82" rx="5" fill="#DEE4E8" />
      <rect x="290" y="22" width="132" height="66" rx="5" fill="#E0E5E8" />
      <rect x="-10" y="108" width="120" height="80" rx="5" fill="#DDE3E7" />
      <rect x="132" y="94" width="118" height="74" rx="5" fill="#E3E8EB" />
      <rect x="272" y="110" width="150" height="74" rx="5" fill="#DDE3E7" />
      <rect x="30" y="204" width="140" height="60" rx="5" fill="#E0E5E8" />
      <rect x="196" y="194" width="130" height="70" rx="5" fill="#E3E8EB" />
      <path d="M0 94 H402" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M0 190 H402" stroke="#FFFFFF" strokeWidth="7" />
      <path d="M124 0 V250" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M262 0 V250" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M330 0 L402 108" stroke="#FFFFFF" strokeWidth="5" />
    </>
  );
}

export function CityMapMarkers() {
  return (
    <>
      <circle cx="56" cy="94" r="7" fill="#111111" />
      <circle cx="56" cy="94" r="3" fill="#FFFFFF" />
      <rect x="333" y="139" width="14" height="14" fill="#111111" />
      <rect x="338" y="144" width="4" height="4" fill="#FFFFFF" />
    </>
  );
}
