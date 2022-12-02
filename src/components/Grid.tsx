
type GridProps = {
  size: number[]
}

export function Grid({ size }: GridProps) {

  const totalTiles = size[0] * size[1];
  const tileElements = [];
  for (let i = 0; i < totalTiles; i++) {
    tileElements.push(
      <div className="grid__tile"></div>
    )
  }

  //render
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size[0]}, 1fr)`
      }}
    >
      {tileElements}
    </div>
  )
}