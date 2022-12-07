import { useDungeonContext } from "../context/DungeonContext";

type TileProps = { 
  type: number
}

export function Tile ({ type } : TileProps) {   
  const { debug } = useDungeonContext();

  return (
      <div className="grid__tile">
        {debug && type}
      </div>
  )
}