import React, { useEffect, useState } from 'react'
import GridCellNode from './GridCell/GridCell';
import './PathFinderViz.scss';
import { GridCell, GridRow } from './PathFinderVizModels';
import {dijkstra}  from "../../Algos/Dijkstra"

function PathFinderViz() {
  
    const [grid, setStateGrid] = useState<GridRow[]>([]);

    const START_NODE_ROW = 5;
    const START_NODE_COL = 5;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 30;


    const updateViz = (visitedNodes : Array<GridCell>) => {
        
        // here we update the state of the grid
        // we iterate through the visited nodes in order and re render the grid
        
        // let's iterate through the visited nodes and update them in the state
        for( let i  = 0 ; i < visitedNodes.length; i++){

            setTimeout(() => {

                let node = visitedNodes[i];

                let newGrid = grid.slice();
    
                const newNode = {
                    ...node,
                    isVisited : true,
                }
    
                newGrid[node.row][node.col] = newNode;

                setStateGrid(newGrid);

            }, 5 * i);
        }
    }

    const runDijkstra = () => { 
        console.log('run dijkstra');


        // For the dijkstra's algorithm, we need to pass in the
        // grid, the start node and the end node
        let visitedNodes = dijkstra(grid, grid[START_NODE_ROW][START_NODE_COL], grid[FINISH_NODE_ROW][FINISH_NODE_COL] );

        // console.log(visitedNodes);
        updateViz(visitedNodes);

    }


    
    useEffect(() => {
      
        const temp:GridRow[] = [];
        // create 15 rows and 50 columns
        for(let i = 0; i < 15 ; i++){
            let row:GridCell[] = [];
            for (let j = 0; j < 50; j++) {
                
                row.push(generateCell(i, j));
            }
            temp.push(row);

        }

        setStateGrid(temp);
    
      
    }, [])

    const generateCell = (row:number, col:number) => {
        
        let isStart = row === START_NODE_ROW && col === START_NODE_COL;
        let isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
        

        let currentCell:GridCell = {
            isFinish,
            isStart ,
            distance: Infinity,
            isVisited: false,
            row,
            col
        }

        return currentCell;

    }
    
  return (
    <>
    <button onClick={runDijkstra}>Run Dijkstra</button>
    <div className="grid">

        {grid?.length > 0 && grid.map( (row, idx) => (
            <div className='row' key={idx}>
                {row.map( (node,id) => (<GridCellNode key={id} isStart={node.isStart} isFinish={node.isFinish} isVisited={node.isVisited} />))}
            </div>
            
        ))}
    </div>
    </>
  )
}

export default PathFinderViz