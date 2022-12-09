//each number corresponds to a tile on the texture sheet, starting from the bottom left
const eightBitValues = [0, 1, 2, 4, 5, 8, 9, 10, 16, 17, 18, 20, 21, 32, 33, 34, 36, 37, 40, 41, 42, 64, 65, 66, 68, 69, 72, 73, 74, 80, 81, 82, 84, 85, 128, 130, 132, 136, 138, 144, 146, 148, 160, 162, 164, 168, 170 ]

export function wallCoordinates(w: number, h: number, grid: Array<Array<number>>) { 
  return typeCoordinates(1, w, h, grid);
}

function typeCoordinates(type: number, w: number, h: number, grid: Array<Array<number>>) { 
  const baseType = grid[h][w];
  //not a match? return transparent tile
  if (baseType !== type) return { x: 7, y: 7 }

  //note: north and south are reversed because the y axis is being flipped in Tile.tsx
  const north = inBounds(w, h - 1, grid) && grid[h - 1][w] === type;
  const south = inBounds(w, h + 1, grid) && grid[h + 1][w] === type;
  const east = inBounds(w + 1, h, grid) && grid[h][w + 1] === type;
  const west = inBounds(w - 1, h, grid) && grid[h][w - 1] === type;
  const northeast = inBounds(w + 1, h - 1, grid) && grid[h - 1][w + 1] === type;
  const northwest = inBounds(w - 1, h - 1, grid) && grid[h - 1][w - 1] === type;
  const southeast = inBounds(w + 1, h + 1, grid) && grid[h + 1][w + 1] === type;
  const southwest = inBounds(w - 1, h + 1, grid) && grid[h + 1][w - 1] === type;
  
  let value = 0;
  if (!north) value += 128;
  if (!northeast && north && east) value += 64;
  if (!east) value += 32;
  if (!southeast && south && east) value += 16;
  if (!south) value += 8;
  if (!southwest && south && west) value += 4;
  if (!west) value += 2;
  if (!northwest && north && west) value += 1;

  const coordIndex = eightBitValues.indexOf(value);
  if (coordIndex < 0) {
    console.log(`Couldn't find a tile matching the code: ${value}. ${north} ${south} ${east} ${west} ${northeast} ${northwest} ${southeast} ${southwest} `)
    return { x: 7, y: 7 }
  } 

  return { 
    x: coordIndex % 8,
    y: Math.floor(coordIndex / 8)
  }
}
function inBounds(x: number, y: number, grid: Array<Array<number>>) { 
  if (y < 0) return false;
  if (y > grid.length - 1) return false;
  if (x < 0) return false;
  if (x > grid[0].length - 1) return false;
  return true;
}