// ce dossier contient les fonctions de requetes vers les API 
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000' // Remplace cette URL par l'URL réelle de ton API
});

export const fetchOneUserData = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données utilisateur :', error);
    throw error;
  }
};

export const fetchUsersData = async () => {
    try {
      const response = await API.get('/api/users');
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données utilisateur :', error);
      throw error;
    }
  };

export const createUser = async (userData) => {
  try {
    const response = await API.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

// Ajoute d'autres fonctions d'appel à l'API selon tes besoins

export default API;