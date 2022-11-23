import { Window } from "./components/Window"
import { Control } from "./components/Control"
import { useDungeonContext } from "./context/DungeonContext"

function App() {
  const { dark, toggleDark } = useDungeonContext();

  return (
    <main className={`app ${dark ? "dark" : "light"}`}>
      <Window />
      <Control />

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
