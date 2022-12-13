import { useDungeonContext } from "../context/DungeonContext";

type TileProps = {
  type: number;
  coords: { x: number; y: number };
  toggleWall: (e: React.SyntheticEvent) => void;
  paint: () => void;
};

export function Tile({ type, coords, toggleWall, paint }: TileProps) {
  const { debug } = useDungeonContext();

  const posX = (coords.x * 100) / 7;
  const posY = 100 - (coords.y * 100) / 7;
  return (
    <div className="grid__tile" onMouseDown={toggleWall} onMouseEnter={paint}>
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
