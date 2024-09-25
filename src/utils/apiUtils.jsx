import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getNominatedShops = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shops?is_active=0`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActiveShops = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shops?is_active=1`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getShopsByCity = async (city) => {
  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&city=${city}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getShopsByItems = async (items, strictSearch) => {
  const matchType = strictSearch ? "exact" : "partial";

  if (typeof items !== "object") {
    console.error("Items query must be an array of items.");
    return;
  }

  if (!items.length) {
    console.error("There are no items to query by");
    return;
  }

  const formattedItems = items.join(",");

  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&items=${formattedItems}&match_type=${matchType}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getShopsByCityAndItems = async (city, items, strictSearch) => {
  const matchType = strictSearch ? "exact" : "partial";

  if (typeof items !== "object") {
    console.error("Items query must be an array of items.");
    return;
  }

  if (!items.length) {
    console.error("There are no items to query by");
    return;
  }

  const formattedItems = items.join(",");

  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&city=${city}&items=${formattedItems}&match_type=${matchType}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleShop = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/shops/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}/items`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postNominationItems = async (shopId, nominationData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/nominations/shops/${shopId}`,
      nominationData
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postNewShop = async (newShop) => {
  try {
    const response = await axios.post(`${apiUrl}/shops`, newShop);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNominationsForShop = async (shopId) => {
  try {
    const response = await axios.get(`${apiUrl}/nominations/shops/${shopId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUniqueNominationsShops = async (nominationId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/nominations/shops/${nominationId}/items`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postShopItem = async (shopItemObject) => {
  try {
    const response = await axios.post(`${apiUrl}/shops/items`, shopItemObject);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const editShopDetails = async (shopId, detailsToUpdate) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/shops/${shopId}`,
      detailsToUpdate
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (userDetails) => {
  try {
    await axios.post(`${apiUrl}/users/register`, userDetails);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (userLoginDetails) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/users/login`,
      userLoginDetails
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserData = async (authToken) => {
  try {
    const response = await axios.get(`${apiUrl}/users/profile`, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
