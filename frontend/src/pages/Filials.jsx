import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export default function Filials() {
  const defaultState = {
    center: [41.311081, 69.240562],
    zoom: 15,
  };

  const getRandomOffset = () => {
    // Generate random offset within a small range
    const offset = 0.01;
    const randomOffset = Math.random() * offset - offset / 2;
    return randomOffset;
  };

  const generateRandomCoordinates = () => {
    const center = [41.311081, 69.240562];
    const randomLatitude = center[0] + getRandomOffset();
    const randomLongitude = center[1] + getRandomOffset();
    return [randomLatitude, randomLongitude];
  };

  return (
    <YMaps className="h-full w-full" style={{ height: "100vh" }}>
      <Map defaultState={defaultState} className="h-full w-full">
        <Placemark geometry={[41.311081, 69.240562]} />
        {/* put 5 more placemark in near random areas */}
        <Placemark geometry={generateRandomCoordinates()} />
        <Placemark geometry={generateRandomCoordinates()} />
        <Placemark geometry={generateRandomCoordinates()} />
        <Placemark geometry={generateRandomCoordinates()} />
        <Placemark geometry={generateRandomCoordinates()} />
      </Map>
    </YMaps>
  );
}
