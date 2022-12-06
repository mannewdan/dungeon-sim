import { Tile } from "./Tile"

type GridProps = {
  grid: Array<Array<number>>
}

export function Grid({ grid }: GridProps) {

  const tileElements = [];  
  let i = 0;
  for (let h = 0; h < grid.length; h++) { 
    for (let w = 0; w < grid[h].length; w++) { 
      tileElements.push(
        <Tile
          key={i}
          type={grid[h][w]}
        />
      )
      i++;
    }
  }

  //render
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`
      }}
    >
      {tileElements}
    </div>
  )
}