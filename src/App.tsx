import React from "react";
import { Grid } from "./components/Grid";
import { Control } from "./components/Control";
import { useDungeonContext } from "./context/DungeonContext";
import { inBounds } from "./util/textureCoordinates";
import data from "./data/gridDefaults.json";

function App() {
  const sizeOptions = [
    [7, 5],
    [9, 6],
    [12, 8],
    [12, 10],
  ];
  const { dark, toggleDark, toggleDebug } = useDungeonContext();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [grid, setGrid] = React.useState(data[0].grid);

  //functions
  function selectNewIndex(index: number) {
    //check index
    if (
      index < 0 ||
      index > sizeOptions.length - 1 ||
      index > data.length - 1
    ) {
      console.log("An invalid index was given to setGridSize");
      return;
    }
    //check grid
    const newGrid = data[index].grid;
    if (
      !Array.isArray(newGrid) ||
      newGrid.length !== sizeOptions[index][1] ||
      !newGrid.every((item) => item.length === sizeOptions[index][0])
    ) {
      console.log(
        `Data at index ${index} is not an array or has incorrect dimensions`
      );
      return;
    }

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

  //theme on <body>
  React.useEffect(() => {
    const className = dark ? "dark" : "light";
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [dark]);

  //render
  return (
    <main className="app">
      <div className="app__content">
        <Grid grid={grid} writeGrid={writeGrid} />
        <Control
          sizeOptions={sizeOptions}
          currentIndex={currentIndex}
          selectNewIndex={selectNewIndex}
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
