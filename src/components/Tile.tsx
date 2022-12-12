import { useDungeonContext } from "../context/DungeonContext";

type TileProps = {
  type: number;
  coords: { x: number; y: number };
  toggleWall: () => void;
};

export function Tile({ type, coords, toggleWall }: TileProps) {
  const { debug } = useDungeonContext();

  const posX = (coords.x * 100) / 7;
  const posY = 100 - (coords.y * 100) / 7;
  return (
    <div className="grid__tile" onClick={toggleWall}>
      <div className="grid__tile--ground"></div>
      <div
        className="grid__tile--wall"
        style={{
          backgroundPositionX: `${posX}%`,
          backgroundPositionY: `${posY}%`,
        }}
      >
        {debug && type}
      </div>
    </div>
  );
}
