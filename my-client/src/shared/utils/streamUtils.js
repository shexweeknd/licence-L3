import { postData } from "../../services/api.js";
import { store } from "../../store/store.js";

export const renderCurrentStream = async (sender) => {
    //get details of current cam socket.id from NodeServer: salle name
    const currentCam = await postData(`/api/cams/nom-de-salle/?socketId=${sender}`)

    console.log(`corresponding salle name of current socket : ${sender} is ${currentCam}`)

    console.log("current salle name is :", currentCam)

    //add the information of the room to the reducer
    store.dispatch({
        type: "webrtcSlice/pushToSalles",
        payload: {
            salle: currentCam,
            socketId: sender
        }})

    return {message: `la salle ${currentCam} a été ajoutée...`, salle: currentCam}
    }

export const removeSocketFromRedux = ({socketId}) => {
        try {
            //suppression de la salle concernée dans le reducer
            store.dispatch({
                type: "webrtcSlice/removeFromSalles",
                payload: {
                    socketId: socketId
                }
            })
            console.log(`socket ${socketId} removed from redux`);
        } catch (e) {
            console.log(`Unable to remove from redux : ${e}`)
        }
      };