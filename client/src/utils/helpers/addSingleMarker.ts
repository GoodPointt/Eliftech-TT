export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<{
    position: google.maps.LatLngLiteral;
    title: string;
  }>;
  map: google.maps.Map | null | undefined;
}) =>
  locations.map(({ position, title }) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title,
    });
    return marker;
  });
