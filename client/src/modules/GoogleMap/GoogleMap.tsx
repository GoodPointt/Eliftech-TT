import { GoogleMapsWrapper } from './components/GoogleMapsWrapper';
import { GoogleMaps } from './components/GoogleMaps';
import { LOCATIONS } from '../../common/coords';

const GoogleMap = ({
  setMapAddress,
}: {
  setMapAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={LOCATIONS} setMapAddress={setMapAddress} />
    </GoogleMapsWrapper>
  );
};

export default GoogleMap;
