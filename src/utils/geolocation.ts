export function coordsToString(position: GeolocationPosition): string {
    return `${position.coords.latitude},${position.coords.longitude}`;
}
