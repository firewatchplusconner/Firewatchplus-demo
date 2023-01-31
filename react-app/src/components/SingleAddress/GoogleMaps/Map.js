import { useMemo } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";

const Map = ({ address }) => {
    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: api_key,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <MapComponent address={address} />;
};

function MapComponent({ address }) {
    const center = useMemo(
        () => ({
            lat: address.lat,
            lng: address.lng,
        }),
        [address.lat, address.lng]
    );

    return (
        <>
            <GoogleMap
                zoom={19}
                center={center}
                mapContainerClassName="address-map-container"
                streetViewControl={false}
                mapTypeId="satellite"
                tilt={0}
                gestureHandling="greedy"
            >
                <Marker position={center} />
            </GoogleMap>
        </>
    );
}

export default Map;
