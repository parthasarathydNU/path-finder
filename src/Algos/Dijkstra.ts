import { GridCell, GridRow } from "../Components/PathFinderViz/PathFinderVizModels";

export function dijkstra(grid:Array<GridRow>, startNode:GridCell, finishNode:GridCell){

    // console.log("inside dijkstra algo")
    let visitedNodes:Array<GridCell> = [];

    // Pseudo code
    // start with the start node

    // if start node is null or end node is null or start node == end node, 
    // we return
    if(startNode == null || finishNode == null || startNode == finishNode){
        return visitedNodes; // will be returned as empty
    }

    // as long as we have nodes to visit
    // let's get all the nodes present and save them as unvisited nodes
    startNode.distance = 0;
    
    let unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length > 0){
        // let's sort the remaining cells
        sortNodesByDistance(unvisitedNodes); // initially the start node will be the first node

        // get the closest node - shift operation removes the first node from the array and returns it
        let closestNode = unvisitedNodes.shift();
        
        // mark this node as visited
        if(closestNode && !closestNode.isWall){
            // closestNode.isVisited = true;

            visitedNodes.push(closestNode);

            // if the closest node is the finishNode, we return the array
            if(closestNode == finishNode ){
                return visitedNodes;
            }

            // update all the neighbours of the closest node
            let neighbours = getNeighbours(grid, closestNode);

            updateNeighboursDistance(neighbours, closestNode.distance);

        }



    }

    return visitedNodes;

}

function updateNeighboursDistance(neighbours: Array<GridCell>, currentNodeDistance: number) : void{
    for(let i in neighbours){
        neighbours[i].distance = currentNodeDistance + 1;
    }
}

function getNeighbours(grid: Array<GridRow> , node:GridCell) : Array<GridCell> {

    let neighbours: Array<GridCell> = [];

    let top = 0, bottom = grid.length - 1, left = 0, right = grid[0].length - 1;

    let row = node.row, col = node.col;

    // can we go up ?
    if(row > top) neighbours.push(grid[row-1][col]);

    // can we go right ?
    if(col < right) neighbours.push(grid[row][col+1]);

    // can we go down ?
    if(row <  bottom) neighbours.push(grid[row+1][col]);

    // can we go left ? 
    if(col > left) neighbours.push(grid[row][col-1]); 

    return neighbours;
}


function sortNodesByDistance(unvisitedNodes:Array<GridCell>) : void {
    unvisitedNodes.sort((a,b) => a.distance - b.distance);
}


function getAllNodes(grid:Array<GridRow>): Array<GridCell> {
    
    let unvisitedCells = [];

    for(let i in grid){
        for(let j in grid[i]){
            unvisitedCells.push(grid[i][j]);
        }
    }

    return unvisitedCells;

  }