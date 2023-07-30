// ce dossier contient les fonctions de requetes vers les API 
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000', // Remplace cette URL par l'URL réelle de ton API
  timout: 1000
});

export const fetchData = async (apiLink) => {
    try {
      const response = await API.get(`${apiLink}`);
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données utilisateur :', error);
      throw error;
    }
  };

export const createUser = async (userData) => {
  try {
    const response = await API.post('/api/register', {...userData});
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

export const authUser = async (userData) => {
  try {
    const response = await API.post('/api/login', {...userData})
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }

  // const res = await axios.post('http://localhost:4000/api/login', { email: 'guest@gmail.com', password: "guest123"} )
};

export const registerUser = async (userData) => {
  try {
    return await API.post('/api/register', {...userData});
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

// Ajoute d'autres fonctions d'appel à l'API selon tes besoins

export default API;