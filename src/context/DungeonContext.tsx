import React from "react"

type DungeonContextProps = {
  children: React.ReactNode
}
type DungeonContext = {
  dark: boolean
  toggleDark: () => void
}

const Context = React.createContext({} as DungeonContext);
export function useDungeonContext() {
  return React.useContext(Context);
}

export function DungeonContextProvider(props: DungeonContextProps) {
  const [dark, setDark] = React.useState<boolean>(() => {
    const settings = loadSettings();
    return settings ? settings.theme : true;
  });

  function toggleDark() {
    setDark(prev => !prev);
  }

  //save
  React.useEffect(() => {
    const settings = {
      theme: dark
    }
    localStorage.setItem("dungeon-settings", JSON.stringify(settings));
  }, [dark]);

  //load
  function loadSettings() {
    const data = localStorage.getItem("dungeon-settings");
    return data ? JSON.parse(data) : null;
  }

  return (
    <Context.Provider
      value={{ dark, toggleDark }}
    >
      {props.children}
    </Context.Provider>
  )
}