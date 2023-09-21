import { postData } from "../../services/api.js";
import { store } from "../../store/store.js";
import { registerStreamOfPeer } from "../../socketClient/webrtcPeersList.js";

export const renderCurrentStream = async (sender, stream) => {
    //get details of current cam socket.id from NodeServer: salle name
    const currentCam = await postData(`/api/cams/nom-de-salle/?socketId=${sender}`)

    console.log("current salle name is :", currentCam)

    //add the information of the room to the reducer
    store.dispatch({
        type: "webrtcSlice/pushToSalles",
        payload: {
            salle: currentCam,
            socketId: sender
        }})

    //TODO register the stream to webrtcPeersList
    registerStreamOfPeer({
        socketId: sender,
        stream: stream
    })

    return {message: `la salle ${currentCam} a été ajoutée...`}
    }

export const removeStreamFromScreen = ({socketId}) => {
    return new Promise(async (resolve, reject) => {
        const currentCam = await postData(`/api/cams/nom-de-salle/?socketId=${socketId}`)

        try {
            //suppression de la salle concernée dans le reducer
            store.dispatch({
                type: "webrtcSlice/removeFromSalles",
                payload: {
                    currentCam: currentCam,
                    socketId: socketId
                }
            })

            resolve("removed successfully")
        } catch (e) {
            reject("unable to remove : ", e)
        }
      });
}