import React from 'react'
import "./GridCell.scss"
function GridCellNode({isStart, isFinish, isVisited}:{isStart:boolean, isFinish:boolean, isVisited: boolean}) {
    let extraClass = isStart ? "start" : isFinish ? "finish" : isVisited ?  "visited" : "";
  return (
    <div className={`cell ${extraClass}`}></div>
  )
}

export default GridCellNode