import React, { ReactElement, useEffect, useState } from 'react'
import GridCellNode from './GridCell/GridCell';
import './PathFinderViz.scss';
import { GridCell, GridRow } from './PathFinderVizModels';
import {dijkstra}  from "../../Algos/Dijkstra"

function PathFinderViz() {
  
    const [grid, setStateGrid] = useState<GridRow[]>([]);
    const [isVizRunning, setIsVizRunning] = useState<boolean>(false);
    const [isBoardClear, setIsBoardClear] = useState<boolean>(true);
    const [startWall, setStartWall] = useState<boolean>(false);
    const [wallCells, setWallCells] = useState<Array<GridCell>>([]);
    

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
                document.getElementById(`cell-${i}-${j}`)?.classList.remove("visited", "wall", "shortestPathNode")
            }
            temp.push(row);

        }

        setStateGrid(temp);
        setIsBoardClear(true);
    }

    const clearBoard = () : void => {

        if(!isVizRunning){
            generateBoard();
            setWallCells([]);
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

                document.getElementById(`cell-${node.row}-${node.col}`)?.classList.add("visited");


                count++;

                if(count == visitedNodes.length - 1){

                    // Render the shortest path
                    // we need to get the path followed from the finish node to the start node
                    let shortestPathNodes = getShortestPathNodes(visitedNodes);

                    animateShortestPath(shortestPathNodes);

                    setIsVizRunning(false);
                }

            }, 5 * i);
            

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

    function animateShortestPath(shortestPathNodes: Array<GridCell>) : void {

        // we just change the background color of all these nodes to yellow
        for(let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                let node = shortestPathNodes[i];
                document.getElementById(`cell-${node.row}-${node.col}`)?.classList.add("shortestPathNode");
            }, 5*i);
            
        }
    }

    /**
     * Function that takes in the array of visited 
     * nodes and returns the shortest path nodes in order
     * @param visitedNodes Array of Grid Cells, 
     * this will contains all the nodes that were visited, 
     * from the start to the last visited node
     * @returns 
     */
    function getShortestPathNodes(visitedNodes:Array<GridCell>) : Array<GridCell> {
        
        let shortestPath:Array<GridCell> = [];

        // let's start from the finish node and iterate all the way back up to the start node, who's parent is null
        // the finish node will be the last in the visited node list
        let node = visitedNodes[visitedNodes.length-1];
        
        // check if this is the finish node
        // because sometimes we cannot reach the finish node, so
        // we do not have a path here
        if(node.row !== FINISH_NODE_ROW || node.col !== FINISH_NODE_COL ){
            return shortestPath;
        }

        while(node.previousNode != null){
            shortestPath.unshift(node);
            node = node.previousNode;
        }

        return shortestPath;
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
            col,
            isWall : false,
            previousNode: null
        }

        return currentCell;

    }

    const mouseMoveCapture = (node:GridCell, overRide:boolean) : void => {
        // console.log(node.row, node.col);

        if(startWall || overRide){
            let wall = wallCells.slice();

            wall.push(grid[node.row][node.col]);
    
            setWallCells(wall);

            document.getElementById(`cell-${node.row}-${node.col}`)?.classList.add("wall")
        }
        


    }   

    const drawWall = () : void => {

        let grid_ = grid;
        for(const brick of wallCells){
            let gridNode = grid_[brick.row][brick.col];
            if(!gridNode.isStart && !gridNode.isFinish) grid_[brick.row][brick.col].isWall = true;
        }

        setStateGrid(grid_);
        // setStartWall(false);

    }

    const handleMouseClick = (node:GridCell) : void => {
        if(!startWall){
            setStartWall(true);
            mouseMoveCapture(node, true);
        } else {
            setStartWall(false);
            drawWall();
        }
    }
    
  return (
    <section className='wrapper'>
        <button onClick={runDijkstra} >Run Dijkstra</button>
        <button onClick={clearBoard} >Clear Board</button>

        <div className="grid"  >

            {grid?.length > 0 && grid.map( (row, idx) => (
                <div className='row' key={idx}>
                    {row.map( (node,id) => (
                    <GridCellNode 

                    mouseCapture={(d:GridCell) => mouseMoveCapture(d, false)} 
                    
                    mouseClick={(node:GridCell) => { handleMouseClick(node) }}

                    key={id} node={node}  />))}
                </div>
                
            ))}
        </div>
    </section>
  )
}

export default PathFinderViz