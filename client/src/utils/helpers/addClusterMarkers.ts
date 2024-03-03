import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { addSingleMarkers } from './addSingleMarker';

export const addClusterMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<{
    position: google.maps.LatLngLiteral;
    title: string;
  }>;
  map: google.maps.Map | null | undefined;
}) => {
  const markers = addSingleMarkers({ locations, map });

  new MarkerClusterer({
    markers,
    map,
    algorithm: new SuperClusterAlgorithm({
      radius: 350,
    }),
  });
};
