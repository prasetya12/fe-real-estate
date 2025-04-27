
'use client'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from "react"
import L from 'leaflet';


interface MapProps {
    onCoordinatesChange: (coordinates: { lat: number; lng: number }) => void;
    initialCoordinates?: { lat: number; lng: number };
}
export default function MapPreview({ onCoordinatesChange,initialCoordinates }: MapProps) {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: initialCoordinates?.lat?? 30.2672, 
        lng: initialCoordinates?.lng??-97.7431,
    });


    const customIcon = new L.Icon({
        iconUrl: '/icons/icon-marker.png',
        iconSize: [40, 40], 
        iconAnchor: [15, 40],
    });
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setCoordinates({ lat, lng });
                onCoordinatesChange({ lat, lng });
            },
        });
        return <Marker position={coordinates} icon={customIcon} />;
    };

   


    return (
        <div className="h-60 w-full rounded-md bg-muted">
            <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />
            </MapContainer>
        </div>
    );
}