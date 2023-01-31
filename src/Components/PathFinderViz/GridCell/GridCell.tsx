import React, {useRef} from 'react'
import { GridCell } from '../PathFinderVizModels';
import "./GridCell.scss"
function GridCellNode({ node, mouseCapture}:{node:GridCell, mouseCapture:Function}) {
    

    const{isStart, isFinish, isVisited, isWall} = node;

    let extraClass = isStart ? "start" : isFinish ? "finish" : isVisited ?  "visited" : "";


  return (
    <div onMouseOver={() => mouseCapture(node)} className={`cell ${extraClass} ${isWall ? "wall" : ""}`}></div>
  )
}

export default GridCellNode