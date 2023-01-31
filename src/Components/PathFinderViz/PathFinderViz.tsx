import React, { useEffect, useState } from 'react'
import GridCellNode from './GridCell/GridCell';
import './PathFinderViz.scss';
import { GridCell, GridRow } from './PathFinderVizModels';
import {dijkstra}  from "../../Algos/Dijkstra"

function PathFinderViz() {
  
    const [grid, setStateGrid] = useState<GridRow[]>([]);
    const [isVizRunning, setIsVizRunning] = useState<boolean>(false);
    const [isBoardClear, setIsBoardClear] = useState<boolean>(true);

    const START_NODE_ROW = 5;
    const START_NODE_COL = 5;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 30;

    const generateBoard = () : void => {
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
        setIsBoardClear(true);
    }

    const clearBoard = () : void => {

        if(!isVizRunning && !isBoardClear){
            generateBoard();
        }

        
    }


    const updateViz = (visitedNodes : Array<GridCell>) => {

        setIsVizRunning(true);
        setIsBoardClear(false);
        
        // here we update the state of the grid
        // we iterate through the visited nodes in order and re render the grid

        let count = 0;
        
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

                count++;

                if(count == visitedNodes.length - 1){
                    setIsVizRunning(false);
                }

            }, 5 * i);
            

            // setTimerId(newTimer);
        }


        
    }

    const runDijkstra = () => { 

        if(!isVizRunning && isBoardClear){

            console.log('run dijkstra');

            setIsVizRunning(true);
    
    
            // For the dijkstra's algorithm, we need to pass in the
            // grid, the start node and the end node
            let visitedNodes = dijkstra(grid, grid[START_NODE_ROW][START_NODE_COL], grid[FINISH_NODE_ROW][FINISH_NODE_COL] );
    
            // console.log(visitedNodes);
            updateViz(visitedNodes);

        }



    }


    
    useEffect(() => {
      

        generateBoard();

    
      
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
    <section className='wrapper'>
        <button onClick={runDijkstra} >Run Dijkstra</button>
        <button onClick={clearBoard} >Clear Board</button>

        <div className="grid">

            {grid?.length > 0 && grid.map( (row, idx) => (
                <div className='row' key={idx}>
                    {row.map( (node,id) => (<GridCellNode key={id} isStart={node.isStart} isFinish={node.isFinish} isVisited={node.isVisited} />))}
                </div>
                
            ))}
        </div>
    </section>
  )
}

export default PathFinderViz