// Undirected graph — adjacency list
class Graph {
  constructor() {
    this.list = {};
  }

  addVertex(vertex) {
    if (!this.list[vertex]) this.list[vertex] = new Set();
  }

  addEdge(a, b) {
    this.addVertex(a);
    this.addVertex(b);
    this.list[a].add(b);
    this.list[b].add(a);
  }

  hasEdge(a, b) {
    if (!this.list[a] || !this.list[b]) return false;
    return this.list[a].has(b);
  }

  hasVertex(vertex) {
    return this.list[vertex] !== undefined;
  }

  removeEdge(a, b) {
    this.list[a]?.delete(b);
    this.list[b]?.delete(a);
  }

  removeVertex(vertex) {
    for (const neighbor of [...(this.list[vertex] || [])]) {
      this.removeEdge(vertex, neighbor);
    }
    delete this.list[vertex];
  }

  dfsRecursive(start, visited = new Set(), result = []) {
    if (!this.list[start] || visited.has(start)) return result;

    visited.add(start);
    result.push(start);

    for (const neighbor of this.list[start]) {
      this.dfsRecursive(neighbor, visited, result);
    }
    return result;
  }

  dfsIterative(start) {
    if (!this.list[start]) return [];

    // put the start vertex in the stack
    const stack = [start];

    // create a set to keep track of visited vertices
    const visited = new Set();

    // create a result array to store the vertices in the order of their visit
    const result = [];

    while (stack.length) {
      const curr = stack.pop();
      // if the current vertex has been visited, skip it
      if (visited.has(curr)) continue;

      // add the current vertex to the visited set
      visited.add(curr);

      // add the current vertex to the result array
      result.push(curr);

      // get the neighbors of the current vertex
      const neighbors = [...this.list[curr]];

      // push the neighbors to the stack
      for (let i = neighbors.length - 1; i >= 0; i--) {
        // if the neighbor has not been visited, push it to the stack
        if (!visited.has(neighbors[i])) stack.push(neighbors[i]);
      }
    }
    // return the result array
    return result;
  }

  bfsRecursive(start) {
    if (!this.list[start]) return [];

    const result = [];
    const visited = new Set([start]);

    const walk = (level) => {
      if (!level.length) return;

      const next = [];
      for (const curr of level) {
        result.push(curr);
        for (const neighbor of this.list[curr]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            next.push(neighbor);
          }
        }
      }
      walk(next);
    };

    walk([start]);
    return result;
  }

  bfsIterative(start) {
    if (!this.list[start]) return [];

    const queue = [start];
    const visited = new Set([start]);
    const result = [];

    while (queue.length) {
      const curr = queue.shift();
      result.push(curr);

      for (const neighbor of this.list[curr]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  print() {
    for (const vertex in this.list) {
      const neighbors = [...this.list[vertex]].join(" ");
      console.log(`${vertex} -> ${neighbors}`);
    }
  }

  pictorialGraph() {
    const vertices = Object.keys(this.list);
    if (vertices.length === 0) {
      console.log("(empty graph)");
      return;
    }

    const children = {};
    const treeEdges = new Set();
    const placed = new Set();
    for (const vertex of vertices) children[vertex] = [];

    for (const start of vertices) {
      if (placed.has(start)) continue;
      const queue = [start];
      placed.add(start);

      for (let i = 0; i < queue.length; i++) {
        for (const neighbor of this.list[queue[i]]) {
          if (placed.has(neighbor)) continue;
          placed.add(neighbor);
          children[queue[i]].push(neighbor);
          treeEdges.add([queue[i], neighbor].sort().join("\0"));
          queue.push(neighbor);
        }
      }
    }

    const isChild = new Set(vertices.flatMap((vertex) => children[vertex]));
    const pos = {};
    let cursor = 0;

    const layout = (node, depth) => {
      const kids = children[node];
      if (kids.length === 0) {
        pos[node] = { x: cursor, y: depth * 2 };
        cursor += String(node).length + 3;
        return;
      }

      for (const kid of kids) layout(kid, depth + 1);
      const first = pos[kids[0]].x;
      const last = pos[kids[kids.length - 1]].x + String(kids[kids.length - 1]).length - 1;
      const mid = Math.round((first + last) / 2);
      pos[node] = {
        x: Math.max(first, mid - Math.floor((String(node).length - 1) / 2)),
        y: depth * 2,
      };
    };

    for (const root of vertices.filter((vertex) => !isChild.has(vertex))) {
      layout(root, 0);
      cursor += 3;
    }

    let maxX = 0;
    let maxY = 0;
    for (const vertex of vertices) {
      maxX = Math.max(maxX, pos[vertex].x + String(vertex).length);
      maxY = Math.max(maxY, pos[vertex].y);
    }

    const canvas = Array.from({ length: maxY + 1 }, () => Array(maxX).fill(" "));
    const center = (vertex) => pos[vertex].x + Math.floor((String(vertex).length - 1) / 2);

    for (const vertex of vertices) {
      const px = center(vertex);
      for (const kid of children[vertex]) {
        const kx = center(kid);
        const ch = kx < px ? "/" : kx > px ? "\\" : "|";
        const row = pos[vertex].y + 1;
        if (canvas[row][kx] === " ") canvas[row][kx] = ch;
      }
    }

    for (const vertex of vertices) {
      const label = String(vertex);
      for (let i = 0; i < label.length; i++) {
        canvas[pos[vertex].y][pos[vertex].x + i] = label[i];
      }
    }

    console.log(canvas.map((row) => row.join("").trimEnd()).join("\n"));

    const extra = [];
    const seen = new Set();
    for (const vertex of vertices) {
      for (const neighbor of this.list[vertex]) {
        const key = [vertex, neighbor].sort().join("\0");
        if (seen.has(key) || treeEdges.has(key)) continue;
        seen.add(key);
        extra.push(`${vertex} —— ${neighbor}`);
      }
    }
    if (extra.length) console.log(extra.join("\n"));
  }
}

// stack and queue are used to implement the dfs and bfs algorithms
// for stack we use push and pop methods
// for queue we use push and shift methods

const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");

graph.print();
graph.pictorialGraph();
// A -> B C
// B -> A D
// C -> A
// D -> B

console.log(graph.dfsRecursive("A")); // [A, B, D, C]
console.log(graph.dfsIterative("A")); // [A, B, D, C]
console.log(graph.bfsRecursive("A")); // [A, B, C, D]
console.log(graph.bfsIterative("A")); // [A, B, C, D]

// questions: create a graph class with the following methods:
// 1. addVertex(vertex)
// 2. addEdge(a, b)
// 3. removeEdge(a, b)
// 4. removeVertex(vertex)
// 5. dfs(start)
// 6. bfs(start)
// 7. print()
// 8. isEmpty()
// 9. getSize()
// 10. getNeighbors(vertex)
// 11. getVertices()
// 12. getEdges()
// 13. getDegree(vertex)
// 14. getAdjacentVertices(vertex)
// 15. getPath(start, end)
// 16. getShortestPath(start, end)  