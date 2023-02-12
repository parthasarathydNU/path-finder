
type GridCell = {
    isStart: boolean;
    isFinish: boolean;
    distance: number,
    isVisited: boolean,
    row: number,
    col: number,
    isWall : boolean,
    previousNode : GridCell | null
}
type GridRow = GridCell[];

export type { GridCell, GridRow };
