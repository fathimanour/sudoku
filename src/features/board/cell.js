import React, {useState, useEffect} from 'react'
import Cellstyles from "./cell.module.scss"; //'scss module', not a normal scss file
import {useSelector, useDispatch} from 'react-redux' //using Redux inside react components
import {highlighter, countincrement} from "./boardSlice"; //importing 'redux action creators' corresponding to the reducers in boardSlice file. 

export default function Cell(props) {
    const {i,j} = props; //destructuring  object
    const [value, visibility] = props.cellinfo; //destructuring array
    const cellid = (i*10)+j; //a two digit integer
    var rightborder, bottomborder;
    const {right, bottom} = props.borderinfo; //destructuring
    rightborder = Cellstyles.rightborder;
    bottomborder = Cellstyles.bottomborder;
    var elementtorender;


    
    const dispatch = useDispatch();
     const highlightcell = () => {
        dispatch(highlighter({cellid : cellid})) //dispatching redux actions . The highligter() function we imported will return a redux action. The dispatch() function will then dispatch that action. 
    }

    const hightlightedcell = useSelector((state) => state.board.highlightedcell);
    const inputnum = useSelector(state => state.board.inputnum);

    const [flag, setflag] = useState(0); //using this flag to increment/decrement count exactly once for correct/wrong input 
    
    
    useEffect(() => {
        var element = document.getElementById(cellid);
        if(hightlightedcell == cellid){
            element.classList.add(Cellstyles.highlight);
        }
        else  element.classList.remove(Cellstyles.highlight); //when the highlighted cell id changes inside the store, all cells will rerender. However, only the cell whose id equals that id inside state can highlight itself. 
    })
    useEffect(() => {
        var element = document.getElementById(cellid);
        if(hightlightedcell == cellid && inputnum.inputterid == cellid){
            element.innerHTML = inputnum.inputnum;
            if(inputnum.inputnum == value && flag == 0){
                dispatch(countincrement({sign: 1}));
                setflag(1);
            }
            else if(flag && inputnum.inputnum != value){
                dispatch(countincrement({sign: -1}));
                setflag(0);
            }
        }
    })
    

    if(visibility)
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.visible} `} >
            {value}
        </div>
    else
        elementtorender =  <div id={cellid} className ={`${Cellstyles.cell} ${right ? rightborder : "" } ${bottom ? bottomborder : ""} ${Cellstyles.hidden} `} onClick={highlightcell} ></div>

   

    return elementtorender
       
    
}
