type ControlProps = {
  sizeOptions: Array<Array<number>>;
  currentIndex: number;
  selectNewIndex: (index: number) => void;
  resetGrid: () => void;
};

export function Control({
  sizeOptions,
  currentIndex,
  selectNewIndex,
  resetGrid,
}: ControlProps) {
  //render
  const buttonElements = sizeOptions.map((item, index) => {
    return (
      <button
        key={index}
        className={index === currentIndex ? "active" : ""}
        onClick={() => selectNewIndex(index)}
      >
        {item[0]}x{item[1]}
      </button>
    );
  });
  return (
    <div className="control">
      <div className="control__size">
        <h3>Grid Size</h3>
        <div className="control__size--buttons">{buttonElements}</div>
      </div>
      <button className="control--size-reset-button" onClick={resetGrid}>
        Reset Grid
      </button>
    </div>
  );
}
