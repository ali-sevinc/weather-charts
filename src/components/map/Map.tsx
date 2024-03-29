import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { LeafletMouseEvent } from "leaflet";
import { FormEvent, useState } from "react";
import { useWeatherContext } from "../../context/WeatherContext";
export default function Map() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const { onGetPosition } = useWeatherContext();

  function handleClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onGetPosition({ lat, lon: lng });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        onGetPosition({ lat, lon: lng });
      },
      (err) => console.error(err.message)
    );
  }

  return (
    <div className={styles.mapContainer}>
      <div className="absolute right-0 sm:right-2 top-[16px] sm:top-6 z-[999] px-4 py-6 bg-slate-600 sm:max-w-[24rem] rounded-t-[20px] text-center text-slate-50 sm:rounded-xl w-full max-h-[30%]">
        <h1 className="text-2xl font-semibold pb-4">
          Welcome to WeatherCharts
        </h1>
        <p className="text-lg pb-2">
          Select a location on the map for one week hourly weather forecast
          data.
        </p>
        <p className="font-semibold pb-4 ">
          You can get your own location by click the button.
        </p>
        <form onSubmit={handleSubmit}>
          <button className="bg-slate-50 text-slate-700 px-2 py-1 rounded-md font-bold hover:bg-slate-200 duration-200">
            Get Your Location
          </button>
        </form>
      </div>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>

        {/* events*/}
        <MapClick onMouseClick={handleClick} />
        <MapCenter position={position} />
      </MapContainer>
    </div>
  );
}

function MapClick({
  onMouseClick,
}: {
  onMouseClick: (e: LeafletMouseEvent) => void;
}) {
  useMapEvents({
    click: onMouseClick,
  });
  return null;
}

function MapCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}
