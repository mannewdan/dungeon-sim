import React from "react";
import { Grid } from "./components/Grid"
import { Control } from "./components/Control"
import { useDungeonContext } from "./context/DungeonContext"
import data from "./data/gridDefaults.json"

function App() {
  const sizeOptions = [[7, 5], [9, 6], [12, 8], [12, 10]];
  const { dark, toggleDark, toggleDebug } = useDungeonContext();
  const [grid, setGrid] = React.useState(data[0].grid);

  //functions
  function setGridSize(index: number) {    
    //check index
    if (index < 0 || 
        index > sizeOptions.length - 1 || 
        index > data.length - 1) {
      console.log("An invalid index was given to setGridSize");
      return;
    }      
    //check grid
    const newGrid = data[index].grid;
    if (!Array.isArray(newGrid) || 
        newGrid.length !== sizeOptions[index][1] ||
        !newGrid.every(item => item.length === sizeOptions[index][0])) { 
      console.log(`Data at index ${index} is not an array or has incorrect dimensions`);
      return;
    }

    setGrid(newGrid);
  }
  function isActive(index: number): boolean {
    if (index < 0 || index > sizeOptions.length - 1) {
      return false;
    }

    const option = sizeOptions[index];
    if (option[1] !== grid.length || !grid.every(item => item.length === option[0])) { 
      return false;
    }    

    return true;
  }

  //theme on <body>
  React.useEffect(() => {
    const className = dark ? "dark" : "light";
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    }
  }, [dark]);

  //render
  return (
    <main className="app">
      <div className="app__content">
        <Grid
          grid={grid}
        />
        <Control
          sizeOptions={sizeOptions}
          setSize={setGridSize}
          isActive={isActive}
        />
      </div>

      {/* debug */}
      <button className="debug-button" onClick={toggleDebug}>Toggle Debug</button>      
      <br></br>
      <button onClick={toggleDark}>Toggle Dark</button>  
      {/* end debug */}      
    </main>
  )
}

export default App
