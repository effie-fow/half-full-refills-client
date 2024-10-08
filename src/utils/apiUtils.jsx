import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getNominatedShops = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=0&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching nominated shops. ${error}`);
  }
};

export const getActiveShops = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching shops. ${error}`);
  }
};

export const getShopsByCity = async (city) => {
  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&city=${city}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching shops by city. ${error}`);
  }
};

export const getShopsByItems = async (items, strictSearch) => {
  const matchType = strictSearch ? "exact" : "partial";

  if (typeof items !== "object") {
    throw new Error(`Items query must be an array of items.`);
  }

  if (!items.length) {
    throw new Error(`There are no items to query by.`);
  }

  const formattedItems = items.join(",");

  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&items=${formattedItems}&match_type=${matchType}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching shops by item. ${error}`);
  }
};

export const getShopsByCityAndItems = async (city, items, strictSearch) => {
  const matchType = strictSearch ? "exact" : "partial";

  if (typeof items !== "object") {
    throw new Error(`Items query must be an array of items.`);
  }

  if (!items.length) {
    throw new Error(`There are no items to query by.`);
  }

  const formattedItems = items.join(",");

  try {
    const response = await axios.get(
      `${apiUrl}/shops?is_active=1&city=${city}&items=${formattedItems}&match_type=${matchType}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching shops by item and city. ${error}`);
  }
};

export const getSingleShop = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/shops/${id}?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching shop. ${error}`);
  }
};

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}/items?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching items. ${error}`);
  }
};

export const postNominationItems = async (shopId, nominationData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/nominations/shops/${shopId}?api_key=${apiKey}`,
      nominationData
    );
    return response;
  } catch (error) {
    throw new Error(`Error whilst posting nomination items. ${error}`);
  }
};

export const postNewShop = async (newShop) => {
  try {
    const response = await axios.post(
      `${apiUrl}/shops?api_key=${apiKey}`,
      newShop
    );
    return response;
  } catch (error) {
    throw new Error(`Error whilst posting new shop to database. ${error}`);
  }
};

export const getNominationsForShop = async (shopId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/nominations/shops/${shopId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching nomination data. ${error}`);
  }
};

export const getUniqueNominationsShops = async (nominationId) => {
  try {
    const response = await axios.get(
      `${apiUrl}/nominations/shops/${nominationId}/items?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Error whilst fetching unique shop's nomination data. ${error}`
    );
  }
};

export const postShopItem = async (shopItemObject) => {
  try {
    const response = await axios.post(
      `${apiUrl}/shops/items?api_key=${apiKey}`,
      shopItemObject
    );
    return response;
  } catch (error) {
    throw new Error(`Error whilst posting new shop item. ${error}`);
  }
};

export const editShopDetails = async (shopId, detailsToUpdate) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/shops/${shopId}?api_key=${apiKey}`,
      detailsToUpdate
    );
    return response;
  } catch (error) {
    throw new Error(`Error whilst patching new shop information. ${error}`);
  }
};

export const registerUser = async (userDetails) => {
  try {
    await axios.post(`${apiUrl}/users/register?api_key=${apiKey}`, userDetails);
  } catch (error) {
    throw new Error(`Error whilst registering new user. ${error}`);
  }
};

export const loginUser = async (userLoginDetails) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/users/login?api_key=${apiKey}`,
      userLoginDetails
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserData = async (authToken) => {
  try {
    const response = await axios.get(
      `${apiUrl}/users/profile?api_key=${apiKey}`,
      {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error whilst fetching user data. ${error}`);
  }
};

export const checkUserExists = async (emailAddress) => {
  try {
    const response = await axios.get(
      `${apiUrl}/users/confirm?api_key=${apiKey}`,
      {
        headers: { email: emailAddress },
      }
    );

    const message = response.data.message;

    if (message === "New user enabled.") {
      return false;
    }

    if (message === "User already exists.") {
      return true;
    }
  } catch (error) {
    throw new Error(
      `Error whilst verifying if email address matches any on our database. ${error}`
    );
  }
};

export const checkShopExists = async (streetNumber, streetName, city) => {
  try {
    const response = await axios.get(
      `${apiUrl}/shops/find/address?api_key=${apiKey}`,
      {
        headers: {
          streetnumber: streetNumber,
          streetname: streetName,
          city: city,
        },
      }
    );

    const message = response.data.message;

    if (message === "New shop enabled.") {
      return false;
    }

    if (message === "Shop already exists.") {
      return true;
    }
  } catch (error) {
    throw new Error(
      `Error whilst checking if new shop matches existing shop on our database. ${error}`
    );
  }
};
