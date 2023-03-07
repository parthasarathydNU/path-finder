/**
 * This component displays the instructions to run the app on the UI
 */

import "./Instructions.scss"


function Instructions() {
  return (
    <div className="instructions-wrapper">
        <h1 className="title">Hello there ! Welcome to the Path Finder application</h1>
        <h2 className="subTitle">Here are instructions to use this app!</h2>
        <ul className="instructions">
            <li>The grid here below represents the various nodes that the algorithm processes</li>
            <li>The green dot represents the start node and the red dot represens the end</li>
            <li>Users can drag the start and end nodes to any location on the grid</li>
            <li>Once the user is satisfied with the start and end position of the node, they can run the algorithm by clicking on the "Run Dinjstra" button</li>
            <li>Once the algorithm is run, to clear the board select the clear board button</li>
            <li>Users' cannot run another algorithm / re run the same algorithm / clear the board when the current algo is processing</li>
            <li>Users can click on an empty cell and move the mouse to draw a wall. Click again to stop drawing the wall</li>
        </ul>

    </div>
  )
}

export default Instructions