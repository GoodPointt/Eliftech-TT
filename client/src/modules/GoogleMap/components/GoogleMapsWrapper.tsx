import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const GOOGLE_API_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY;

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiKey = GOOGLE_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};
