export type Coordinate = {
  x: number;
  y: number;
};

export interface updateDragPointerCoordinatesAction {
  payload: Coordinate;
  type: string;
}
