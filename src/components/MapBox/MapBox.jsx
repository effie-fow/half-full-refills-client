import "./MapBox.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import { ShopInfoCard } from "../ShopInfoCard/ShopInfoCard";
import { Navigate } from "react-router-dom";

export const MapBox = ({ shops }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const mapScrollToRef = useRef();
  const initialZoom = 14;

  const [initialCenter, setInitialCenter] = useState([
    -0.11427566747321748, 50.8170309602071,
  ]);

  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(1);

  if (typeof shops === "string") {
    return <Navigate to="/500" />;
  }

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

    shops.forEach((shop) => {
      new mapboxgl.Marker({
        color: "#1d6b22",
        id: "marker",
        coordinates: shop.coordinates,
      })
        .setLngLat(shop.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p class="map__pop-up-name">${shop.name}</p>
                <p class="map__pop-up-address">${shop.street_number} ${shop.street_name}</p>
                <p class="map__pop-up-refills">Refillable items: ${shop.items.length}</p>`
          )
        )
        .addTo(mapRef.current);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newUserCoordinates = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        new mapboxgl.Marker({
          color: "#fb8a62",
          id: "marker",
          coordinates: newUserCoordinates,
        })
          .setLngLat(newUserCoordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<p class="map__pop-up-name">You are here</p>`
            )
          )
          .addTo(mapRef.current);

        mapRef.current.flyTo({
          center: newUserCoordinates,
          zoom: initialZoom,
        });

        setInitialCenter(newUserCoordinates);
        setCenter(newUserCoordinates);
        setZoom(initialZoom);
      });
    }

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

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
    setZoom(initialZoom);
    mapRef.current.flyTo({ center: coordinates, zoom: 16 });
    mapScrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <article ref={mapScrollToRef} className="map">
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
