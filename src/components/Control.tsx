
type ControlProps = {
  sizeOptions: Array<Array<number>>
  setSize: (index: number) => void
  isActive: (index: number) => boolean
}

export function Control({ sizeOptions, setSize, isActive }: ControlProps) {

  //render
  const buttonElements = sizeOptions.map((item, index) => {
    return (
      <button
        key={index}
        className={isActive(index) ? "active" : ""}
        onClick={() => setSize(index)}
      >
        {item[0]}x{item[1]}
      </button>
    )
  });
  return (
    <div className="control">
      <div className="control__size">
        <h3>Grid Size</h3>
        <div className="control__size--buttons">
          {buttonElements}
        </div>
      </div>
    </div>
  )
}