import "./MapBox.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import { ShopInfoCard } from "../ShopInfoCard/ShopInfoCard";

export const MapBox = ({ shops }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const initialCenter = [-0.11427566747321748, 50.8170309602071];
  const initialZoom = 13;

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);

  shops.forEach((shop) => {
    if (typeof shop.coordinates === "string") {
      const newCoordinates = JSON.parse(shop.coordinates);
      shop.coordinates = newCoordinates;
    }
  });

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    shops.forEach((shop) => {
      new mapboxgl.Marker({
        color: "black",
        id: "marker",
        coordinates: shop.coordinates,
      })
        .setLngLat(shop.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(shop.name))
        .addTo(mapRef.current);
    });

    mapRef.current.on("click", (e) => {
      setCenter(e.lngLat);
      setZoom(initialZoom);

      mapRef.current.flyTo({
        center: e.lngLat,
        zoom: initialZoom,
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const handleReset = () => {
    setCenter(initialCenter);
    setZoom(initialZoom);

    mapRef.current.flyTo({
      center: initialCenter,
      zoom: initialZoom,
    });
  };

  const handleTravel = (coordinates) => {
    setCenter(coordinates);
    setZoom(12);
    mapRef.current.flyTo({ center: coordinates, zoom: 16 });
  };

  return (
    <section>
      <article className="map">
        <div
          id="map-container"
          ref={mapContainerRef}
          className="map__container"
        ></div>
        <span className="map__reset-button" onClick={handleReset}>
          Reset
        </span>
      </article>
      <ShopInfoCard shops={shops} clickHandle={handleTravel} />
    </section>
  );
};
