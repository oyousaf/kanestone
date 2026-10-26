export const VEHICLE_EVENT = "ks:select-vehicle";

/** Pre-select a vehicle in the enquiry form from anywhere on the page. */
export function selectVehicle(name: string) {
  window.dispatchEvent(new CustomEvent<string>(VEHICLE_EVENT, { detail: name }));
}
