import { Tile } from "./Tile";
import { wallCoordinates } from "../util/textureCoordinates";
import React from "react";
import { useMouseStatus } from "../hooks/useMouseStatus";

type GridProps = {
  grid: Array<Array<number>>;
  writeGrid: (w: number, h: number, newValue: number) => void;
  currentToon: string;
  currentEditIndex: number;
};

export function Grid({
  grid,
  writeGrid,
  currentToon,
  currentEditIndex,
}: GridProps) {
  const [paintType, setPaintType] = React.useState(-1);
  const [mouseIsHeld] = useMouseStatus();

  //functions
  function toggleWall(h: number, w: number) {
    if (h < 0 || h > grid.length - 1 || w < 0 || w > grid[0].length - 1) {
      console.log("Invalid coordinates passed to toggleWall: " + h + ", " + w);
      return;
    }

    const newValue = 1 - grid[h][w];
    setPaintType(newValue);
    writeGrid(h, w, newValue);
  }
  React.useEffect(() => {
    if (!mouseIsHeld) setPaintType(-1);
  }, [mouseIsHeld]);

  //render
  const tileElements = [];
  let i = 0;
  for (let h = 0; h < grid.length; h++) {
    for (let w = 0; w < grid[h].length; w++) {
      tileElements.push(
        <Tile
          key={i}
          type={grid[h][w]}
          coords={wallCoordinates(w, h, grid)}
          toggleWall={(e: React.SyntheticEvent) => {
            //prevent copy-drag and text selection
            if (e.preventDefault) e.preventDefault();
            toggleWall(h, w);
          }}
          paint={() => {
            if (!mouseIsHeld || paintType < 0) return;
            writeGrid(h, w, paintType);
          }}
          currentToon={currentToon}
        />
      );
      i++;
    }
  }
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
