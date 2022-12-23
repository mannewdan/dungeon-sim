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
        <button className="control--size-reset-button" onClick={resetGrid}>
          Reset Grid
        </button>
      </div>

      <div className="control__right-container">
        <div className="control__toon">
          <h3>Select Toon</h3>
          <div className="control__toon--selector">
            <button onClick={() => incrementToonIndex(-1)}>{"<"}</button>
            <span>{toonName}</span>
            <button onClick={() => incrementToonIndex(1)}>{">"}</button>
          </div>
        </div>

        <hr></hr>

        <div className="control__edit">
          <h3>Edit Mode</h3>
          <div className="control__edit--buttons">
            <button>Walls</button>
            <button>Toon</button>
            <button>Goal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
