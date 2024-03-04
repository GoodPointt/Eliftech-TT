import { GoogleMapsWrapper } from './components/GoogleMapsWrapper';
import { GoogleMaps } from './components/GoogleMaps';
import { LOCATIONS } from '../../common/coords';

const GoogleMap = ({
  setMapAddress,
  mapAddress,
}: {
  setMapAddress: React.Dispatch<React.SetStateAction<string>>;
  mapAddress: string;
}) => {
  return (
    <GoogleMapsWrapper>
      <GoogleMaps
        locations={LOCATIONS}
        setMapAddress={setMapAddress}
        mapAddress={mapAddress}
      />
    </GoogleMapsWrapper>
  );
};

export default GoogleMap;
