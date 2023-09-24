import { postData } from "../../services/api.js";
import { store } from "../../store/store.js";

export const renderCurrentStream = async (sender) => {
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
    // registerStreamOfPeer({
    //     socketId: sender,
    //     stream: stream
    // })

    return {message: `la salle ${currentCam} a été ajoutée...`}
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