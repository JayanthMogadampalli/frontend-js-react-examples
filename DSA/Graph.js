class Graph {
   constructor(v){
     this.V = v;
        this.adj = Array.from({length: v}, () => []);
   }

    // Function to add an edge into the graph
    addEdge(v, w) {
        this.adj[v].push(w);
       this.adj[w].push(v); 
    }


    BFS(){
      let visited = new Array(this.V).fill(false);
       
      for(let i=0; i<this.V.length; i++){
        if(!visited[i]){
           let queue = [];
            queue.push(i);
            visited[i] = true;
            
            while(queue.length > 0){
                let node = queue.shift();
                
                for(let j=0; j<this.adj[node].length; j++){
                    if(!visited[this.adj[node][j]]){
                        queue.push(this.adj[node][j]);
                        visited[this.adj[node][j]] = true;
                    }
                }
            }
        }
      }
   }


   #dfsUtil(v, visited) {
    visited[v] = true;
    console.log(v);

    for (let neighbor of this.adj[v]) {
      if (!visited[neighbor]) {
        this.#dfsUtil(neighbor, visited);
      }
    }
  }

  // Public DFS call
  DFS(start) {
    const visited = Array(this.V).fill(false);
    this.#dfsUtil(start, visited);
  }


  isCyclicUtil(v, visited, parent) {
    visited[v] = true;
    for(let neighbor of this.adj[v]){
      if(!visited[neighbor]) {
        if(this.isCyclicUtil(neighbor, visited, v)){
            return true;
        }
      }
      else if(neighbor !== parent){
        return true;
      }
    }
  }

  isCyclic(){
    let visited = new Array(this.V).fill(false);
    for(let i=0; i<this.V; i++){
        if(!visited[i]){
            if(this.isCyclicUtil(i, visited, -1)){
                return true;
            }
        }
    }

    return false;
  }
}

let g = new Graph(5);

g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(3, 4);


class DirectedGraph {
    constructor(V) {
      this.V = V;
      this.adj = Array.from({ length: V }, () => []);
    }
  
    // Add a directed edge from v to w
    addEdge(v, w) {
      this.adj[v].push(w);
    }
  
    // Helper function to detect cycle using DFS
    #isCyclicUtil(v, visited, recStack) {
       visited[v] = true;
       recStack[v] = true;

       for(let neighbor of this.adj[v]) {
        if (!visited[neighbor]) {
            if (this.#isCyclicUtil(neighbor, visited, recStack)) {
                return true;
            }
        } else if (recStack[neighbor]) {
            return true;
        }
       } 

    recStack[v] = false;
    return false;
    }
  
    // Main function to check if the graph contains a cycle
    isCyclic() {
       const visited = new Array(this.V).fill(false);
       const recStack = new Array(this.V).fill(false);  

        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) {
            if (this.#isCyclicUtil(i, visited, recStack)) {
                return true;
            }
            }
        }

        return false;
    }


    numOfIslands(params) {
        if(!grid || grid.length === 0) return 0;
        const rows = grid.length;
        const cols = grid[0].length;
        let isLandCount = 0;


        function dfs(r,c) {
            if(r< 0 || c< 0 || c> cols || r > rows || grid[r][c] === '0') return;
            grid[r][c] = '0';
            dfs(r+1,c);
            dfs(r-1,c);
            dfs(r,c+1);
            dfs(r,c-1);     
        }

        const directions = [
            [1, 0],  // down
            [-1, 0], // up
            [0, 1],  // right
            [0, -1]  // left
        ];        

        function bfs(r,c) {
        let queue = [];
        queue.push([r,c]);
        grid[r][c] = '0';

        while(queue.length) {
            let [row,col] = queue.shift();
            
            for(let [dr,dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;

                if(newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === '1') {
                    grid[newRow][newCol] = '0';
                    queue.push([newRow,newCol]);
                }
            }
        }
        }


        for(let i = 0; i< rows.length; i++) {
            for (let j = 0; j< cols.length; j++) {
                if(grid[i][j] === '1') {
                    isLandCount++;
                    dfs(i,j);
                }
            }
        }
       
       return isLandCount; 
    }

    rottenOranges (grid) {
        const rows = grid.length;
        const cols = grid[0].length;


        const queue = [];
        let freshCount = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (grid[r][c] === 2) {
                queue.push([r, c]);
              } else if (grid[r][c] === 1) {
                freshCount++;
              }
            }
        }

        if (freshCount === 0) return 0;

        let minutes = 0;
        const directions = [
            [1, 0],  // down
            [-1, 0], // up
            [0, 1],  // right
            [0, -1]  // left
        ];

        while(queue.length){
            const size = queue.length;
            let hasRotten = false;

            for(let i = 0; i< size; i++) {
                const [r,c ] = queue.shift();

                for(let [dr, dc] of directions) {
                    const newRow = r + dr;
                    const newCol = c + dc;

                    if(newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 1) {
                        grid[newRow][newCol] = 2;
                        queue.push([newRow,newCol]);
                        freshCount--;
                        hasRotten = true;
                    }
                }
            }

            if(hasRotten) {
                minutes++;
            }
        }

        return freshCount === 0 ? minutes : -1;

    }
}

function canFinishCourses(numCourses, prerequisites) {
    const graph = new DirectedGraph(numCourses);
    
    for (const [course, prereq] of prerequisites) {
            graph.addEdge(prereq, course);
    }

   if(graph.isCyclic()) {
        return false;
    } else {
        return true;
    }
}

function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1);

    for(let i = 0; i<n; i++) {
        if(color[i] === -1) {
            const queue = [i];
            color[i] = 0;

            while(queue.length) {
                const node = queue.shift();

                for(let neighbor of graph[node]) {
                   if(color[neighbor] === -1) {
                     color[neighbor] = 1 - color[node];
                     queue.push(neighbor);
                   }
                   else if(color[neighbor] === color[node]) {
                     return false;
                   }
                }
            }
        }
    }
  
    return true;

}