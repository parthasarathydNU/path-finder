
type GridCell = {
    isStart: boolean;
    isFinish: boolean;
    distance: number,
    isVisited: boolean,
    row: number,
    col: number,
    isWall : boolean
}
type GridRow = GridCell[];

export type { GridCell, GridRow };
