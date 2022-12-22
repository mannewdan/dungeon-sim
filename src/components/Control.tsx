type ControlProps = {
  sizeOptions: Array<Array<number>>;
  currentSizeIndex: number;
  selectNewSizeIndex: (index: number) => void;
  resetGrid: () => void;
  toonOptions: Array<string>;
  currentToonIndex: number;
  incrementToonIndex: (change: number) => void;
};

export function Control({
  sizeOptions,
  currentSizeIndex,
  selectNewSizeIndex,
  resetGrid,
  toonOptions,
  currentToonIndex,
  incrementToonIndex,
}: ControlProps) {
  //render
  const sizeButtons = sizeOptions.map((item, index) => {
    return (
      <button
        key={index}
        className={index === currentSizeIndex ? "active" : ""}
        onClick={() => selectNewSizeIndex(index)}
      >
        {item[0]}x{item[1]}
      </button>
    );
  });
  let toonName = toonOptions[currentToonIndex];
  toonName = toonName.charAt(0).toUpperCase() + toonName.slice(1);
  return (
    <div className="control">
      <div className="control__size">
        <h3>Grid Size</h3>
        <div className="control__size--buttons">{sizeButtons}</div>
      </div>
      <button className="control--size-reset-button" onClick={resetGrid}>
        Reset Grid
      </button>
      <div className="control__toon">
        <button onClick={() => incrementToonIndex(-1)}>{"<"}</button>
        <span>{toonName}</span>
        <button onClick={() => incrementToonIndex(1)}>{">"}</button>
      </div>
    </div>
  );
}
