const axios = require("axios");
const io = require('socket.io-client');

const API = axios.create({
  baseURL: "http://localhost:4000", // Remplace cette URL par l'URL réelle de ton API
  timout: 1000,
});

const data = {
  salle: "labo",
  ip: "192.168.10.16",
  src: ["src1", "src2"],
  type: "mp4",
  key: "camera123",
};

const app = async () => {
  //appel API pour authentifier la caméra
  const res = await API.post("/api/cams/integrate", data);

  // console.log("la reponse json du serveur est : ", res.data.camsDetails)

  jwtToken = res.data.camsDetails.token

  if (res.status === 202) {
    //initie la connection socket
    const socket = io("http://localhost:4000", {
      auth: {
          token: jwtToken,
      }
    });

    socket.on("connect", () => {
        console.log("successfully added to socket.io server");

        console.log(socket.id);
    });

    socket.on("emit-camslist", async (data) => {
      console.log(data)
      store.dispatch({
          type: "camsSlice/setConnectedCams",
          payload: data,
        });
    });
    
  }
};

app();

module.exports = app;
