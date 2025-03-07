import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDataApi = async (endpoint, token) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Generalized POST request
export const postDataApi = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: `Bearer ${token}` }), // Set token if provided
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to post data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error; // Re-throw error for further handling
  }
};

export const fileUploadHandler = async (endpoint, method, formData, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response =
      method === "post"
        ? await axios.post(`${BASE_URL}${endpoint}`, formData, config)
        : await axios.put(`${BASE_URL}${endpoint}`, formData, config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Generalized PUT (Update) request
export const putDataApi = async (endpoint, data, token) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Set token if provided
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Re-throw error for further handling
  }
};

// Generalized DELETE request
export const deleteDataApi = async (endpoint, token) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Set token if provided
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error; 
  }
};
