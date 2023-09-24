import { createSlice } from "@reduxjs/toolkit";

export const webrtcSlice = createSlice({
  name: "webrtcSlice",
  initialState: {
    salles: []
  },
  reducers: {
    pushToSalles: (state, action) => {

      // verify si existe et si plein
      let exists = null;
      let full = null;

      state.salles.forEach(element => {
        
        if(!element) {
          exists = null;
        }

        if (element.salle === action.payload.salle) {
          if(element.socketId.length > 3){
            exists = true;
            full = true;
          } else {
            exists = true;
            full= false;
          }
        } else {
          exists = false;
        }
      });
      exists = false
      //---------------------------------------------------

      // Ajoutez le socketId dans l'ancien tableau si existe et pas plein
      if (exists && !full) {
        const newData = {salle: action.payload.salle, socketId: [action.payload.socketId]}

        state.salles = [...state.salles, newData]
  
        console.log("salle registered to slice state successfully")
      }

      //---------------------------------------------------------

      // return a full message si existe et plein
      if (exists && full) {
        console.log(`salle: ${action.payload.salle} pleine`)
      }
      //---------------------------------------------------------

      // push if not existing

      if (!exists) {
        state.salles = [
          {
            salle: action.payload.salle,
            socketId: [
              action.payload.socketId
            ]
          }
        ]
  
        console.log(`salle ${action.payload.salle} doesn't exists but added successfully.`)
      }
      //-----------------------------------------------------
      exists = null;
      full = null;
    },

    removeFromSalles: (state, action) => {
      let position = null;
      const socket = action.payload.socketId;
      
      try {
        state.salles.forEach((salleObj, index) => {

            state.salles[index].socketId.forEach((content, index) => {
              if (content === socket) {
                position = index
                state.salles[index].socketId.splice(position, 1);
              } else {
                position = null
              }
            })

            // verifier si socketId n'est pas vide sinon on supprime la salle du state
            if (state.salles[index].socketId.length === 0) {
              state.salles.splice(index, 1)
            }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
});
