import React from "react";

export function useMouseStatus() {
  const [isHeld, setIsHeld] = React.useState(false);

  React.useEffect(() => {
    const hold = () => setIsHeld(true);
    const release = () => setIsHeld(false);

    window.addEventListener("mousedown", hold);
    window.addEventListener("mouseup", release);
    window.addEventListener("blur", release);

    return () => {
      window.removeEventListener("mousedown", hold);
      window.removeEventListener("mouseup", release);
      window.addEventListener("blur", release);
    };
  }, []);

  return [isHeld];
}
