import { Tile } from "./Tile";
import { wallCoordinates, inBounds } from "../util/textureCoordinates";
import React from "react";
import { useMouseStatus } from "../hooks/useMouseStatus";
import { buildPath } from "../util/buildPath";

type GridProps = {
  grid: Array<Array<number>>;
  writeGrid: (w: number, h: number, newValue: number) => void;
  currentToon: string;
  currentEditIndex: number;
  allowDiagonals: boolean;
};

export function Grid({
  grid,
  writeGrid,
  currentToon,
  currentEditIndex,
  allowDiagonals,
}: GridProps) {
  const [paintType, setPaintType] = React.useState(-1);
  const [mouseIsHeld] = useMouseStatus();

  //functions
  function toggleWall(h: number, w: number) {
    if (grid[h][w] === 2 || grid[h][w] === 3) {
      //walls can't replace entities
      return;
    }
    if (!inBounds(w, h, grid)) {
      console.log("Invalid coordinates passed to toggleWall: " + h + ", " + w);
      return;
    }

    const newValue = 1 - grid[h][w];
    setPaintType(newValue);
    writeGrid(h, w, newValue);
  }
  function setEntity(h: number, w: number, type: number) {
    if (type !== 2 && type !== 3) {
      console.log("Invalid entity type: " + type);
      return;
    }
    if (grid[h][w] === 2 || grid[h][w] === 3) {
      //entities can't replace other entities
      return;
    }
    if (!inBounds(w, h, grid)) {
      console.log("Invalid coordinates passed to setEntity: " + h + ", " + w);
      return;
    }

    //clear the original entity
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === type) {
          writeGrid(y, x, 0);
        }
      }
    }

    //set the new entity
    writeGrid(h, w, type);
  }
  React.useEffect(() => {
    if (!mouseIsHeld) setPaintType(-1);
  }, [mouseIsHeld]);

  const path = buildPath(grid, allowDiagonals);

  //render
  const tileElements = [];
  let i = 0;
  for (let h = 0; h < grid.length; h++) {
    for (let w = 0; w < grid[h].length; w++) {
      tileElements.push(
        <Tile
          key={i}
          type={grid[h][w]}
          isPath={!!path.find((item) => item.w === w && item.h === h)}
          currentEditIndex={currentEditIndex}
          texCoords={wallCoordinates(w, h, grid)}
          gridCoords={{ h, w }}
          toggleWall={(e: React.SyntheticEvent) => {
            //prevent copy-drag and text selection
            if (e.preventDefault) e.preventDefault();
            toggleWall(h, w);
          }}
          setEntity={(e: React.SyntheticEvent) => {
            if (e.preventDefault) e.preventDefault();
            const t =
              currentEditIndex === 1 ? 2 : currentEditIndex === 2 ? 3 : 0;

            setEntity(h, w, t);
          }}
          paint={() => {
            if (!mouseIsHeld || paintType < 0) return;
            if (grid[h][w] === 2 || grid[h][w] === 3) {
              //walls can't replace entities
              return;
            }
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
