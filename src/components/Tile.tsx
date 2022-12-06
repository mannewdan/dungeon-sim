
type TileProps = { 
  type: number
}

export function Tile ({ type } : TileProps) { 
  return (
      <div 
        className="grid__tile"
      >
        {type}
      </div>
  )
}