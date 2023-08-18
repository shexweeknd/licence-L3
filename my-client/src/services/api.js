// ce dossier contient les fonctions de requetes vers les API 
import axios from 'axios';
import { logout } from '../shared/utils/authFunctions.js'

const API = axios.create({
  baseURL: 'http://localhost:4000', // Remplace cette URL par l'URL réelle de ton API
  timout: 1000
});

//creation de l'intercepteur
API.interceptors.request.use((config) => {
  const userDetails = localStorage.getItem("user");
  if (userDetails) {
    const token = JSON.parse(userDetails).token;
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, (err) => {
  return Promise.reject(err);
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
    const response = await API.post('/api/auth/register', {...userData});
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

export const authUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/login', {...userData})
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la connexion de l\'utilisateur :', error);
    throw error;
  }

};

export const registerUser = async (userData) => {
  try {
    return await API.post('/api/auth/register', {...userData});
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
};

// Routes API protégés
export const queryCamsList = async (data) => {
  try {
    return await API.get('/api/cams/getcams', {data});
  } catch (error) {
    console.log('Impossible d\'obtenir la liste des caméras actifs : ', error);
    checkResponseStatus(error)
    throw error;
  }
}

//fonction de gestion des erreurs
const checkResponseStatus = (exception) => {
  const responseStatus = exception?.response?.status;

  // action lors de l'echec d'execution des middlewares serveurs
  if (responseStatus) {
    (responseStatus === 401  || responseStatus === 403) && logout(); //middleware auth
  }
}

export default API;