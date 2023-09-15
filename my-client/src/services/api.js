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

const token = JSON.parse(localStorage.getItem("userData")).token

export const fetchData = async (apiLink) => {
    try {
      const response = await API.get(`${apiLink}`);
      return response.data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données API sur fetchData:', error);
      throw error;
    }
  };

// --------------admin----------------

export const getPendings = async () => {
  try {
    const response = await API.post('/api/admin/get-all', {token});

    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données API sur fetchData:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await API.post('/api/admin/get-users', {token});

    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données API sur fetchData:', error);
    throw error;
  }
};

export const approveUser = async ({email}) => {
  try {
    const response = await API.post('/api/admin/approve', {email, token});
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
}

export const denyUser = async ({email}) => {
  try {
    const response = await API.post('/api/admin/deny', {email, token});
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
}

export const deleteFromRecord = async (userData) => {
  try {
    const response = await API.post('/api/admin/delete-record', {...userData, token});
    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
    throw error;
  }
}

// ----------------admin ----------------------


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