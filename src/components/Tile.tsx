import React from "react";
import { useDungeonContext } from "../context/DungeonContext";

type TileProps = {
  type: number;
  isPath: boolean;
  currentEditIndex: number;
  coords: { x: number; y: number };
  toggleWall: (e: React.SyntheticEvent) => void;
  setEntity: (e: React.SyntheticEvent) => void;
  paint: () => void;
  currentToon: string;
};

export function Tile({
  type,
  isPath,
  currentEditIndex,
  coords,
  toggleWall,
  setEntity,
  paint,
  currentToon,
}: TileProps) {
  const posX = (coords.x * 100) / 7;
  const posY = 100 - (coords.y * 100) / 7;
  const [savedCoords, setSavedCoords] = React.useState({ posX: 0, posY: 0 });

  //update coords only if type is "wall"
  if (type === 1 && (savedCoords.posX !== posX || savedCoords.posY !== posY)) {
    setSavedCoords({ posX, posY });
  }

  const { debug } = useDungeonContext();

  //render
  const wallActive = type === 1 ? "active" : "";
  const toonActive = type === 2 ? "active" : "";
  const goalActive = type === 3 ? "active" : "";
  return (
    <div
      className={`grid__tile ${isPath ? "path" : ""}`}
      onMouseDown={currentEditIndex === 0 ? toggleWall : setEntity}
      onMouseEnter={paint}
    >
      <div className="grid__tile--ground"></div>
      <div
        className={`grid__tile--wall ${wallActive}`}
        style={{
          backgroundPositionX: `${savedCoords.posX}%`,
          backgroundPositionY: `${savedCoords.posY}%`,
        }}
      ></div>
      <div
        className={`grid__tile--toon ${toonActive}`}
        style={{
          backgroundImage: `url(src/assets/${currentToon}.svg)`,
        }}
      ></div>
      <div
        className={`grid__tile--goal ${goalActive}`}
        style={{
          backgroundImage: "url(src/assets/treasure.svg)",
        }}
      ></div>

      {debug && <span className="debug">{type}</span>}
    </div>
  );
}
