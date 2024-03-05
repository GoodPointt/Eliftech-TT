import { useEffect, useRef, useState } from 'react';
// import { addClusterMarkers } from '../../../utils/helpers/addClusterMarkers';
import { addSingleMarkers } from '../../../utils/helpers/addSingleMarker';
import { useDebouncedCallback } from 'use-debounce';
import {
  fromLatLng,
  setKey,
  setLanguage,
  setLocationType,
} from 'react-geocode';
import { Box, Text } from '@chakra-ui/react';

const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY;
setKey(GOOGLE_API_KEY);
setLanguage('en');
setLocationType('ROOFTOP');

const DEFAULT_ZOOM = 10;
const DEFAULT_CENTER = { lat: 51.49996043070496, lng: -0.19024171526197536 };
let MAP: google.maps.Map | undefined;

export const GoogleMaps = ({
  locations,
  useClusters = true,
  mapId,
  setMapAddress,
  mapAddress,
}: {
  locations: ReadonlyArray<{
    position: google.maps.LatLngLiteral;
    title: string;
  }>;
  setMapAddress: React.Dispatch<React.SetStateAction<string>>;
  useClusters?: boolean;
  mapId?: string;
  mapAddress: string;
}) => {
  const [, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral>(DEFAULT_CENTER);
  const [duration, setDuration] = useState<string>('');

  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(
    null
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  const calculateAndDisplayRoute = (origin: string) => {
    if (!directionsService.current || !directionsRenderer.current) return;

    directionsService.current.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          if (response) {
            setDirections(response);

            if (directionsRenderer.current) {
              directionsRenderer.current.setDirections(response);
            }

            const route = response.routes[0];
            if (route) {
              const leg = route.legs[0];
              if (leg) {
                const duration = leg.duration?.text;
                if (duration) {
                  setDuration(duration);
                } else {
                  console.error('Duration information not available.');
                }
              } else {
                console.error('Leg information not available.');
              }
            } else {
              console.error('Route information not available.');
            }
          } else {
            console.error('Response is null or undefined.');
          }
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  const getAddressFromLatLng = (
    latLng: google.maps.LatLng,
    markerTitle = ''
  ) => {
    fromLatLng(latLng.lat(), latLng.lng()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setMapAddress(address);
        calculateAndDisplayRoute(address);
      },
      (error) => {
        console.error(error);
        setMapAddress(('London, ' + markerTitle) as string);
      }
    );
  };

  const debouncedGeocode = useDebouncedCallback((address: string) => {
    geocoder.current?.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry
          .location as unknown as google.maps.LatLngLiteral;
        MAP?.setCenter(location);
        // setCenter(location);
      } else {
        console.error(
          'Geocode was not successful for the following reason:',
          status
        );
        setMapAddress(address);
      }
    });
  }, 300);

  useEffect(() => {
    if (mapAddress) {
      debouncedGeocode(mapAddress);
    }
  }, [mapAddress, debouncedGeocode, setMapAddress]);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapId,
        clickableIcons: true,
        heading: 1,
        draggableCursor: 'false',
      });
      MAP = map;

      geocoder.current = new window.google.maps.Geocoder();
      directionsService.current = new window.google.maps.DirectionsService();
      directionsRenderer.current = new window.google.maps.DirectionsRenderer({
        map: map,
      });

      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        const clickedPosition = event.latLng;
        if (clickedPosition) {
          getAddressFromLatLng(clickedPosition);
        }
      });

      const markers =
        // useClusters ? addClusterMarkers({ locations, map }) :
        addSingleMarkers({ locations, map });

      markers.forEach((marker) => {
        marker.addListener('click', () => {
          const markerPosition = marker.getPosition();
          if (markerPosition) {
            setDestination({
              lat: markerPosition?.lat(),
              lng: markerPosition?.lng(),
            });
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mapId, locations, useClusters]);

  useEffect(() => {
    calculateAndDisplayRoute(mapAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  return (
    <Box maxW={{ base: '100%', lg: '49%' }}>
      {duration && (
        <Text textAlign={'right'} fontWeight={600}>
          Approximately time: {duration}
        </Text>
      )}
      <Box ref={ref} h={'300px'} />
    </Box>
  );
};
