import { useEffect, useRef } from 'react';
// import { addClusterMarkers } from '../../../utils/helpers/addClusterMarkers';
import { addSingleMarkers } from '../../../utils/helpers/addSingleMarker';
import {
  fromLatLng,
  setKey,
  setLanguage,
  setLocationType,
} from 'react-geocode';

const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY;
setKey(GOOGLE_API_KEY);
setLanguage('en');
setLocationType('ROOFTOP');

const DEFAULT_CENTER = { lat: 51.50590471372898, lng: -0.12980912474259243 };
const DEFAULT_ZOOM = 10;

export const GoogleMaps = ({
  locations,
  useClusters = true,
  mapId,
  setMapAddress,
}: {
  locations: ReadonlyArray<{
    position: google.maps.LatLngLiteral;
    title: string;
  }>;
  setMapAddress: React.Dispatch<React.SetStateAction<string>>;
  useClusters?: boolean;
  mapId?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapId,
        clickableIcons: true,
        heading: 1,
      });

      const markers =
        // useClusters
        // ? addClusterMarkers({ locations, map })
        // :
        addSingleMarkers({ locations, map });

      markers.forEach((marker) => {
        marker.addListener('click', () => {
          const markerPosition = marker.getPosition();
          const markerTitle = marker.getTitle();
          if (markerPosition) {
            fromLatLng(markerPosition.lat(), markerPosition.lng()).then(
              (response) => {
                const address = response.results[0].formatted_address;
                setMapAddress(address);
              },
              (error) => {
                console.error(error);
                setMapAddress(('London, ' + markerTitle) as string);
              }
            );
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mapId, locations, useClusters]);

  return <div ref={ref} style={{ maxWidth: '100%', height: '700px' }} />;
};
