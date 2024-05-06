import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// Retrieve user data from localStorage
let TOKEN = null;
const persistedRoot = localStorage.getItem("persist:root");
if (persistedRoot) {
    const userData = JSON.parse(JSON.parse(persistedRoot).user);
    if (userData && userData.currentUser && userData.currentUser.accessToken) {
        TOKEN = userData.currentUser.accessToken;
    }
}

// Create axios instances
export const publicRequest = axios.create({
    baseURL: BASE_URL, 
});

// Create userRequest only if TOKEN exists
export const userRequest = 
     axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${TOKEN}` },
      })
  
