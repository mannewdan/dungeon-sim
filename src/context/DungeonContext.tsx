import React from "react";

type DungeonContextProps = {
  children: React.ReactNode;
};
type DungeonContext = {
  dark: boolean;
  debug: boolean;
  toggleDark: () => void;
  toggleDebug: () => void;
};

const Context = React.createContext({} as DungeonContext);
export function useDungeonContext() {
  return React.useContext(Context);
}

export function DungeonContextProvider(props: DungeonContextProps) {
  const [dark, setDark] = React.useState<boolean>(() => {
    const settings = loadSettings();
    return settings ? settings.theme : true;
  });
  const [debug, setDebug] = React.useState<boolean>(() => {
    const settings = loadSettings();
    return settings ? settings.debug : false;
  });

  function toggleDark() {
    setDark((prev) => !prev);
  }
  function toggleDebug() {
    setDebug((prev) => !prev);
  }

  //save
  React.useEffect(() => {
    const settings = {
      theme: dark,
      debug: debug,
    };
    localStorage.setItem("dungeon-settings", JSON.stringify(settings));
  }, [dark, debug]);

  //load
  function loadSettings() {
    const data = localStorage.getItem("dungeon-settings");
    return data ? JSON.parse(data) : null;
  }

  //theme on <body>
  React.useEffect(() => {
    const className = dark ? "dark" : "light";
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [dark]);

  return (
    <Context.Provider value={{ dark, toggleDark, debug, toggleDebug }}>
      {props.children}
    </Context.Provider>
  );
}
