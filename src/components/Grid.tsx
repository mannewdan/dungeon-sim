import { Tile } from "./Tile";
import { wallCoordinates } from "../util/textureCoordinates";

type GridProps = {
  grid: Array<Array<number>>;
  writeGrid: (w: number, h: number, newValue: number) => void;
};

export function Grid({ grid, writeGrid }: GridProps) {
  const tileElements = [];
  let i = 0;
  for (let h = 0; h < grid.length; h++) {
    for (let w = 0; w < grid[h].length; w++) {
      tileElements.push(
        <Tile
          key={i}
          type={grid[h][w]}
          coords={wallCoordinates(w, h, grid)}
          toggleWall={() => toggleWall(h, w)}
        />
      );
      i++;
    }
  }

  function toggleWall(h: number, w: number) {
    if (h < 0 || h > grid.length - 1 || w < 0 || w > grid[0].length - 1) {
      console.log("Invalid coordinates passed to toggleWall: " + h + ", " + w);
      return;
    }

    writeGrid(h, w, 1 - grid[h][w]);
  }

  //render
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
      }}
    >
      {tileElements}
    </div>
  );
}
