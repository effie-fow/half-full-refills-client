import axios from "axios";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const baseUrl = "https://api.mapbox.com/search/geocode/v6/forward";

export const getCoordinates = async (streetNumber, streetName, city) => {
  try {
    const formattedStreetName = streetName.split(" ").join("%20");
    const formattedCity = city.split(" ").join("%20");

    const response = await axios.get(
      `${baseUrl}?q=${streetNumber}%20${formattedStreetName}%20${formattedCity}&country=gb&proximity=ip&access_token=${mapboxToken}`
    );

    const coordinates = response.data.features[0].geometry.coordinates;
    return coordinates;
  } catch (error) {
    console.error(error);
    return <Navigate to="/500" />;
  }
};
