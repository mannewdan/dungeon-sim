import { useDungeonContext } from "../context/DungeonContext";

type TileProps = { 
  type: number
}

export function Tile ({ type } : TileProps) {   
  const { debug } = useDungeonContext();

  const x = 2;
  const y = 6;

  const posX = x * 100 / 7;
  const posY = y * 100 / 7;
  return (
      <div className="grid__tile">
        <div className="grid__tile--ground"></div>
        <div 
          className="grid__tile--wall"
          style={{
            backgroundPositionX: `${posX}%`,
            backgroundPositionY: `${posY}%`
          }}
        >
          {debug && type}
        </div>
      </div>
  )
}