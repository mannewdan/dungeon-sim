import React from "react";
import { Grid } from "./components/Grid"
import { Control } from "./components/Control"
import { useDungeonContext } from "./context/DungeonContext"

function App() {
  const sizeOptions = [[9, 9], [9, 12], [12, 15], [15, 18]];
  const { dark, toggleDark } = useDungeonContext();
  const [size, setSize] = React.useState(sizeOptions[0]);

  //functions
  function setGridSize(index: number) {
    if (index < 0 || index > sizeOptions.length - 1) {
      console.log("An invalid index was given to setGridSize");
      return;
    }

    setSize(sizeOptions[index]);
  }
  function isActive(index: number): boolean {
    if (index < 0 || index > sizeOptions.length - 1) {
      return false;
    }

    const option = sizeOptions[index];
    if (option.length !== size.length) return false;
    for (let i = 0; i < option.length; i++) {
      if (option[i] !== size[i]) return false;
    }

    return true;
  }

  //render
  return (
    <main className={`app ${dark ? "dark" : "light"}`}>
      <div className="app__content">
        <Grid
          size={size}
        />
        <Control
          sizeOptions={sizeOptions}
          setSize={setGridSize}
          isActive={isActive}
        />
      </div>

      {/* debug */}
      <br></br>
      <br></br>
      {dark && "Dark "}
      {!dark && "Light "}
      <button onClick={toggleDark}>Toggle Dark</button>
      {/* debug end */}
    </main>
  )
}

export default App
