import {createSlice} from "@reduxjs/toolkit"
import { initiate } from "../board/boardSlice";



const initial = {
    isinside : 0,
    isgameon : 0,
    onlineusers : []
}

const gamesSlice = createSlice({
    name: "games",
    initialState : initial,
    reducers: {
        isinside : state => {
            state.isinside = 1
        },
        isgameon : (state) => {
            state.isgameon = 1
        },
        onlineusers : {
            reducer : (state, action) => {
                state.onlineusers = action.payload
            },
            prepare : (allusers) => {
                var allplayers =  Object.values(allusers)
                allplayers = allplayers.filter(e => {
                    return e != null
                })

                return {
                    payload : allplayers
                }
            }
        }
    }
});

export default gamesSlice.reducer;
export const {isgameon, isinside, onlineusers} = gamesSlice.actions;