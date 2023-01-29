import React, { useEffect, useState } from 'react'
import GridCellNode from './GridCell/GridCell';
import './PathFinderViz.scss';
import { GridCell, GridRow } from './PathFinderVizModels';

function PathFinderViz() {
  
    const [nodes, setNodes] = useState<GridRow[]>([]);

    
    useEffect(() => {
      
        const temp:GridRow[] = [];
        // create 15 rows and 50 columns
        for(let i = 0; i < 15 ; i++){
            let row:GridCell[] = [];
            for (let j = 0; j < 50; j++) {
                let currentCell:GridCell = {
                    isFinish : i === 14 && j === 49,
                    isStart : i === 0 && j === 0,
                }
                row.push(currentCell);
            }
            temp.push(row);

        }

        setNodes(temp);
    
      
    }, [])
    
  return (
    <div className="grid">

        {nodes?.length > 0 && nodes.map( (row, idx) => (
            <div className='row' key={idx}>
                {row.map( node => (<GridCellNode isStart={node.isStart} isFinish={node.isFinish} />))}
            </div>
            
        ))}
    </div>
  )
}

export default PathFinderViz