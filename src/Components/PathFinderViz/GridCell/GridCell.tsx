import React from 'react'
import "./GridCell.scss"
function GridCellNode({isStart, isFinish}:{isStart:boolean, isFinish:boolean}) {
    let extraClass = isStart ? "start" : isFinish ? "finish" : "";
  return (
    <div className={`cell ${extraClass}`}></div>
  )
}

export default GridCellNode