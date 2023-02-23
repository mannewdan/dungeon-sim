import { inBounds } from "./textureCoordinates";

type Node = {
  h: number; //y coordinate (height)
  w: number; //x coordinate (width)

  j: number; //how far away from the start
  k: number; //how far away from the end
  l: number; //j + k

  parent: Node | null; //for tracing the path back to the beginning
};

export function buildPath(
  grid: Array<Array<number>>,
  allowDiagonals: boolean
): Array<Node> {
  //find the start and end nodes
  let startNode = {} as Node;
  let endNode = {} as Node;
  for (let h = 0; h < grid.length; h++) {
    for (let w = 0; w < grid[h].length; w++) {
      if (grid[h][w] === 2) {
        startNode = { w, h, j: 0, k: 0, l: 0, parent: null };
      }
      if (grid[h][w] === 3) {
        endNode = { w, h, j: 0, k: 0, l: 0, parent: null };
      }
    }
  }

  if (!startNode || !endNode) {
    console.log(
      "Couldn't locate either a start or an end node when building a path " +
        startNode +
        " " +
        endNode
    );
    return [];
  }

  endNode.parent = startNode;
  let openList = [startNode] as Array<Node>;
  let closedList = [] as Array<Node>;

  let failsafe = 0;
  do {
    //identify the lowest l (best path candidate)
    const currentNode = openList.reduce((lowest, node): Node => {
      if (node.l < lowest.l) return node;
      else if (node.l === lowest.l && node.k < lowest.k) return node;
      return lowest;
    }, openList[0]);

    if (nodesAreEqual(currentNode, endNode)) {
      endNode.parent = currentNode;
      return tracePath(endNode);
    }

    //move it to the closed list and add its neighbors to the open list
    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode);
    openList.push(
      ...getAdjacentNodes(currentNode, endNode, grid, allowDiagonals)
    );

    openList = openList.reduce((acc, node) => {
      //closed nodes don't go into the open list
      if (closedList.find((closedNode) => nodesAreEqual(node, closedNode))) {
        return acc;
      }

      //if there is a duplicate node, take the better one
      const dupeNode = acc.find((accNode) => nodesAreEqual(node, accNode));
      if (dupeNode) {
        if (node.l < dupeNode.l) {
          return [...acc.filter((item) => item !== dupeNode), node];
        } else return acc;
      }

      return [...acc, node];
    }, [] as Array<Node>);

    failsafe++;
  } while (openList.length > 0 && failsafe < 10000);

  console.log("Couldn't find a path after " + failsafe + " iterations");
  return [];
}

function getAdjacentNodes(
  node: Node,
  endNode: Node,
  grid: Array<Array<number>>,
  allowDiagonals: boolean
): Array<Node> {
  const adjacentNodes = [] as Array<Node>;

  let w = false;
  let e = false;
  let s = false;
  let n = false;

  //west
  if (inBounds(node.w - 1, node.h, grid) && grid[node.h][node.w - 1] !== 1) {
    adjacentNodes.push(newNode(node, 0, -1, endNode, allowDiagonals));
    w = true;
  }
  //east
  if (inBounds(node.w + 1, node.h, grid) && grid[node.h][node.w + 1] !== 1) {
    adjacentNodes.push(newNode(node, 0, 1, endNode, allowDiagonals));
    e = true;
  }
  //south
  if (inBounds(node.w, node.h + 1, grid) && grid[node.h + 1][node.w] !== 1) {
    adjacentNodes.push(newNode(node, 1, 0, endNode, allowDiagonals));
    s = true;
  }
  //north
  if (inBounds(node.w, node.h - 1, grid) && grid[node.h - 1][node.w] !== 1) {
    adjacentNodes.push(newNode(node, -1, 0, endNode, allowDiagonals));
    n = true;
  }

  if (!allowDiagonals) return adjacentNodes;

  //northwest
  if (
    (n || w) &&
    inBounds(node.w - 1, node.h - 1, grid) &&
    grid[node.h - 1][node.w - 1] !== 1
  ) {
    adjacentNodes.push(newNode(node, -1, -1, endNode, allowDiagonals));
  }
  //northeast
  if (
    (n || e) &&
    inBounds(node.w + 1, node.h - 1, grid) &&
    grid[node.h - 1][node.w + 1] !== 1
  ) {
    adjacentNodes.push(newNode(node, -1, 1, endNode, allowDiagonals));
  }
  //southwest
  if (
    (s || w) &&
    inBounds(node.w - 1, node.h + 1, grid) &&
    grid[node.h + 1][node.w - 1] !== 1
  ) {
    adjacentNodes.push(newNode(node, 1, -1, endNode, allowDiagonals));
  }
  //southeast
  if (
    (s || e) &&
    inBounds(node.w + 1, node.h + 1, grid) &&
    grid[node.h + 1][node.w + 1] !== 1
  ) {
    adjacentNodes.push(newNode(node, 1, 1, endNode, allowDiagonals));
  }

  return adjacentNodes;
}
function newNode(
  node: Node,
  hDiff: number,
  wDiff: number,
  endNode: Node,
  allowDiagonals: boolean
): Node {
  const dist = Math.abs(wDiff) + Math.abs(hDiff) > 1 ? 14 : 10;
  const h = node.h + hDiff;
  const w = node.w + wDiff;
  const j = node.j + dist;
  const k = distance(h, w, endNode, allowDiagonals);
  const l = j + k;
  return { w, h, j, k, l, parent: node };
}
function distance(
  h: number,
  w: number,
  dest: Node,
  allowDiagonals: boolean
): number {
  const hDiff = Math.abs(h - dest.h);
  const wDiff = Math.abs(w - dest.w);

  const diffTotal = hDiff + wDiff;
  const diffMin = Math.min(hDiff, wDiff);

  return allowDiagonals
    ? diffMin * 14 + (diffTotal - diffMin) * 10
    : diffTotal * 10;
}
function nodesAreEqual(node1: Node, node2: Node): boolean {
  return (
    node1 !== null &&
    node2 !== null &&
    node1.h === node2.h &&
    node1.w === node2.w
  );
}
function tracePath(endNode: Node): Array<Node> {
  const path = [] as Array<Node>;

  let currentNode = endNode;
  while (currentNode.parent !== null) {
    path.unshift(currentNode.parent);
    currentNode = currentNode.parent;
  }

  return path;
}
