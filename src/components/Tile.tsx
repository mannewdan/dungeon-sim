import React from "react";
import { useDungeonContext } from "../context/DungeonContext";

type TileProps = {
  type: number;
  isPath: boolean;
  currentEditIndex: number;
  texCoords: { x: number; y: number };
  gridCoords: { h: number; w: number };
  toggleWall: (e: React.SyntheticEvent) => void;
  setEntity: (e: React.SyntheticEvent) => void;
  paint: () => void;
  currentToon: string;
};

export function Tile({
  type,
  isPath,
  currentEditIndex,
  texCoords,
  gridCoords,
  toggleWall,
  setEntity,
  paint,
  currentToon,
}: TileProps) {
  const posX = (texCoords.x * 100) / 7;
  const posY = 100 - (texCoords.y * 100) / 7;
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
      className={`grid__tile`}
      onMouseDown={currentEditIndex === 0 ? toggleWall : setEntity}
      onMouseEnter={paint}
    >
      <div className={`grid__tile--path ${isPath ? "active" : ""}`}></div>
      <div className="grid__tile--ground"></div>
      <div
        className={`grid__tile--wall ${wallActive}`}
        style={{
          backgroundPositionX: `${savedCoords.posX}%`,
          backgroundPositionY: `${savedCoords.posY}%`,
        }}
      ></div>
      <div className={`grid__tile--toon-holder ${toonActive}`}>
        <div
          className="grid__tile--toon-sprite"
          style={{
            backgroundImage: `url(images/${currentToon}.svg)`,
          }}
        ></div>
      </div>
      <div
        className={`grid__tile--goal ${goalActive}`}
        style={{
          backgroundImage: "url(images/treasure.svg)",
        }}
      ></div>

      {debug && (
        <span className="debug">{gridCoords.w + ", " + gridCoords.h}</span>
      )}
    </div>
  );
}
