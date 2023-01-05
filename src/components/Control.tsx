type ControlProps = {
  sizeOptions: Array<Array<number>>;
  currentSizeIndex: number;
  selectNewSizeIndex: (index: number) => void;
  resetGrid: () => void;
  toonOptions: Array<string>;
  currentToonIndex: number;
  incrementToonIndex: (change: number) => void;
  currentEditIndex: number;
  selectNewEditIndex: (index: number) => void;
  allowDiagonals: boolean;
  toggleAllowDiagonals: () => void;
};

export function Control({
  sizeOptions,
  currentSizeIndex,
  selectNewSizeIndex,
  resetGrid,
  toonOptions,
  currentToonIndex,
  incrementToonIndex,
  currentEditIndex,
  selectNewEditIndex,
  allowDiagonals,
  toggleAllowDiagonals,
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

        <div className="control__diagonals">
          <button
            className={allowDiagonals ? "active" : ""}
            onClick={toggleAllowDiagonals}
          >
            Allow Diagonal Paths
          </button>
        </div>

        <div className="control__edit">
          <h3>Edit Mode</h3>
          <div className="control__edit--buttons">
            <button
              className={currentEditIndex === 0 ? "active" : ""}
              onClick={() => selectNewEditIndex(0)}
            >
              Walls
            </button>
            <button
              className={currentEditIndex === 1 ? "active" : ""}
              onClick={() => selectNewEditIndex(1)}
            >
              Toon
            </button>
            <button
              className={currentEditIndex === 2 ? "active" : ""}
              onClick={() => selectNewEditIndex(2)}
            >
              Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
