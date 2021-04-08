export const isInsidePolygon = (
  ref: React.RefObject<any>,
  dragPointerCoordinates: { x: number; y: number },
  extraReach: number = 1 / 3
): boolean => {
  const boundingRect: DOMRect = ref.current.getBoundingClientRect();
  if (!boundingRect) return;

  const withinBounds = (
    point: { x: number; y: number },
    top: number,
    right: number,
    bottom: number,
    left: number
  ): boolean => {
    if (
      left < point.x &&
      point.x < right &&
      top < point.y &&
      point.y < bottom
    ) {
      return true;
    }
    return false;
  };

  return withinBounds(
    dragPointerCoordinates,
    boundingRect.top - boundingRect.height * extraReach,
    boundingRect.right,
    boundingRect.bottom + boundingRect.height * extraReach,
    boundingRect.left
  );
};
