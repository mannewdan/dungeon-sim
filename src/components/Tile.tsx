import React from "react";
import { useDungeonContext } from "../context/DungeonContext";

type TileProps = {
  type: number;
  coords: { x: number; y: number };
  toggleWall: (e: React.SyntheticEvent) => void;
  paint: () => void;
};

export function Tile({ type, coords, toggleWall, paint }: TileProps) {
  const posX = (coords.x * 100) / 7;
  const posY = 100 - (coords.y * 100) / 7;
  const [savedCoords, setSavedCoords] = React.useState({ posX: 0, posY: 0 });

  //update coords only if type is "wall"
  if (type === 1 && (savedCoords.posX !== posX || savedCoords.posY !== posY)) {
    setSavedCoords({ posX, posY });
  }

  const { debug } = useDungeonContext();

  //render
  const activeClass = type === 1 ? "active" : "";
  return (
    <div className="grid__tile" onMouseDown={toggleWall} onMouseEnter={paint}>
      <div className="grid__tile--ground"></div>
      <div
        className={`grid__tile--wall ${activeClass}`}
        style={{
          backgroundPositionX: `${savedCoords.posX}%`,
          backgroundPositionY: `${savedCoords.posY}%`,
        }}
      >
        {debug && type}
      </div>
    </div>
  );
}
