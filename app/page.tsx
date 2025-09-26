"use client";


import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Sample JSON data (replace with API later)
import busData from "./data.json"; // <- place your JSON here in app folder

// Bus icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [32, 32],
});

export default function Home() {
  const busLines = busData.bus_lines;
  const [selectedBusId, setSelectedBusId] = useState(busLines[0].id);

  const selectedBus = busLines.find((bus) => bus.id === selectedBusId);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="font-bold">AmanaLogo</span>
          <button className="text-sm">Menu</button>
        </div>
        <div className="text-center py-4 bg-green-500 text-black">
          <h1 className="text-lg font-bold">Amana Transportation</h1>
          <p>Proudly Servicing Malaysian Bus Riders Since 2019</p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 space-y-6 p-4">
        {/* Section 1 - Active Bus Map */}
        <section className="space-y-4">
          <h2 className="text-center font-semibold bg-yellow-200 p-2">
            Active Bus Map
          </h2>

          {/* Bus selection buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {busLines.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={`px-3 py-1 rounded ${
                  bus.id === selectedBusId
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {bus.name}
              </button>
            ))}
          </div>

          {/* Map */}
          {selectedBus && (
            <MapContainer
              center={[
                selectedBus.current_location.latitude,
                selectedBus.current_location.longitude,
              ]}
              zoom={12}
              className="h-72 w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Bus stops */}
              {selectedBus.bus_stops.map((stop) => (
                <Marker
                  key={stop.id}
                  position={[stop.latitude, stop.longitude]}
                >
                  <Popup>
                    {stop.name} <br /> ETA: {stop.estimated_arrival}
                  </Popup>
                </Marker>
              ))}
              {/* Bus route line */}
              <Polyline
                positions={selectedBus.bus_stops.map((stop) => [
                  stop.latitude,
                  stop.longitude,
                ])}
                color="black"
              />
              {/* Current bus location */}
              <Marker
                position={[
                  selectedBus.current_location.latitude,
                  selectedBus.current_location.longitude,
                ]}
                icon={busIcon}
              >
                <Popup>Current Bus Location</Popup>
              </Marker>
            </MapContainer>
          )}
        </section>

        {/* Section 2 - Bus Schedule */}
        <section className="space-y-4">
          <h2 className="text-center font-semibold bg-yellow-200 p-2">
            Bus Schedule
          </h2>

          {/* Bus selection buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {busLines.map((bus) => (
              <button
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={`px-3 py-1 rounded ${
                  bus.id === selectedBusId
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {bus.name}
              </button>
            ))}
          </div>

          {/* Schedule table */}
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Bus Stop</th>
                <th className="p-2 border">Next Time of Arrival</th>
              </tr>
            </thead>
            <tbody>
              {selectedBus?.bus_stops.map((stop) => (
                <tr
                  key={stop.id}
                  className={`text-center ${
                    stop.is_next_stop ? "bg-orange-300" : ""
                  }`}
                >
                  <td className="p-2 border">{stop.name}</td>
                  <td className="p-2 border">{stop.estimated_arrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-white text-center py-2">
        All Rights Reserved
      </footer>
    </div>
  );
}




