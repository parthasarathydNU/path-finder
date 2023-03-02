import React, {useRef} from 'react'
import { GridCell } from '../PathFinderVizModels';
import "./GridCell.scss"
function GridCellNode({ node, mouseClick,  mouseCapture, cells}:{node:GridCell,mouseClick:Function, mouseCapture:Function, cells:number}) {
    

    const{isStart, isFinish, isWall} = node;

    let extraClass = 
    isStart 
      ? "start" 
      : ( isFinish 
          ? "finish" 
          :  ""  
        );


  return (
    <div style={{'width':`calc(100%/${cells})`}} id={`cell-${node.row}-${node.col}`} onClick={() => mouseClick(node)}  onMouseEnter={() => mouseCapture(node)} className={`cell ${extraClass} ${isWall ? "wall" : ""}`}></div>
  )
}

export default GridCellNode