import React , {useState, useEffect} from 'react'
import Cell from "./cell";
import Boardstyles from "./board.module.scss"
import {useSelector,useDispatch} from "react-redux";

export default function Board() {

    
    const initialarray = useSelector(state => state.board.initialarray)
    const issolved = useSelector(state => state.board.issolved); //selecting data from redux store
    const clientid = useSelector(state=> state.board.clientid)

    useEffect(() => {
        if(issolved)
            alert("Congrats! You are a great team!");
    } ); //useEffect hook 

    useEffect(() => {
            window.io.emit("initiateme"); //Emit event to get the initial object from server
    },[]) //this will run exactly once .
    

    var allcells = [], key=0;
    for(var i=1;i<10;i++)
        for(var j=1;j<10;j++){
        var borderinfo = {
            right : 0,
            bottom : 0
        };
        if(i==3 || i==6) //this logic is used to create borders for all the nine 3x3 squares
             borderinfo.bottom = 1; //cells which has 3 or 6 as index values should have right/bottom border
        if(j==3 || j==6)    
            borderinfo.right = 1;
        allcells.push(<Cell cellinfo = {initialarray[i-1][j-1]} borderinfo={borderinfo} key={key++} i={i} j={j} />); //list rendering in React
    }

    

    return (
        //learn about css/scss modules and how to use them in react
        <div className={Boardstyles.board} >
            {allcells}
        </div>
    )
}
