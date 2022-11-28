
type GridProps = {
  size: number[]
}

export function Grid({ size }: GridProps) {

  //render
  return (
    <div className="grid">
      {size[0]}x{size[1]}
    </div>
  )
}