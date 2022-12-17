import React from "react";
import { Grid } from "./components/Grid";
import { Control } from "./components/Control";
import { useDungeonContext } from "./context/DungeonContext";
import { inBounds } from "./util/textureCoordinates";
import gridData from "./data/gridDefaults.json";

function App() {
  const sizeOptions = [
    [7, 5],
    [9, 6],
    [12, 8],
    [12, 10],
  ];
  const { toggleDark, toggleDebug } = useDungeonContext();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [grid, setGrid] = React.useState(() => {
    const grid = loadGrid(0);
    return grid ? grid : gridData[0].grid;
  });

  //functions
  function selectNewIndex(index: number) {
    //check index
    if (
      index < 0 ||
      index > sizeOptions.length - 1 ||
      index > gridData.length - 1
    ) {
      console.log("An invalid index was given to selectNewIndex");
      return;
    }

    const newGrid = loadGrid(index);
    if (!newGrid) return;

    setCurrentIndex(index);
    setGrid(newGrid);
  }
  function writeGrid(h: number, w: number, newValue: number) {
    if (!inBounds(w, h, grid)) return -1;

    setGrid((prev) =>
      prev.map((row, h2) =>
        row.map((cell, w2) => {
          return h === h2 && w === w2 ? newValue : cell;
        })
      )
    );
  }
  function resetGrid() {
    const newGrid = gridData[currentIndex].grid;
    if (!newGrid) return;

    setGrid(newGrid);
  }

  //save
  React.useEffect(() => {
    localStorage.setItem(`dungeon-grid-${currentIndex}`, JSON.stringify(grid));
  }, [grid]);

  //load
  function loadGrid(index: number) {
    const data = localStorage.getItem(`dungeon-grid-${index}`);
    if (!data) return null;

    const grid = JSON.parse(data) as Array<Array<number>>;
    if (
      !Array.isArray(grid) ||
      grid.length !== sizeOptions[index][1] ||
      !grid.every((item) => item.length === sizeOptions[index][0])
    ) {
      console.log(
        `Data at index ${index} is not an array or has incorrect dimensions`
      );
      return null;
    }

    return grid;
  }

  //render
  return (
    <main className="app">
      <div className="app__content">
        <Grid grid={grid} writeGrid={writeGrid} />
        <Control
          sizeOptions={sizeOptions}
          currentIndex={currentIndex}
          selectNewIndex={selectNewIndex}
          resetGrid={resetGrid}
        />
      </div>

      {/* debug */}
      <button className="debug-button" onClick={toggleDebug}>
        Toggle Debug
      </button>
      <br></br>
      <button onClick={toggleDark}>Toggle Dark</button>
      {/* end debug */}
    </main>
  );
}

export default App;
