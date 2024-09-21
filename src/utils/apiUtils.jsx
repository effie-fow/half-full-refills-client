import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3030";

export const getNominatedShops = async () => {
  try {
    const response = await axios.get(`${apiUrl}/shops?is_active=0`);
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
