const BASE_URL = process.env.REACT_APP_BASE_URL
// const BASE_URL = "https://bitehub24-server.vercel.app"


// Generalized GET request
export const getDataApi = async (endpoint, token) => {
  try {
    // console.log("Token being sent:", token); // Debug line
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Ensure this matches your backend
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


// Generalized POST request


// Generalized PUT (Update) request
export const updateData = async (endpoint, data, token) => {
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
    throw error; // Re-throw error for further handling
  }
};
