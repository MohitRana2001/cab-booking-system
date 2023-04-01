function calShortestDist(graph, sourceDestination, finDestination) {
    const distances = {};
    const visited = {};
    const queue = [];
  
    // Initialize distances and visited hashmaps
    for (let vertex in graph) {
      distances[vertex] = Infinity;
      visited[vertex] = false;
    }
  
    // Set distance from sourceDestination to sourceDestination as 0
    distances[sourceDestination] = 0;
  
    // Add sourceDestination vertex to the queue
    queue.push(sourceDestination);
  
    // Loop until queue is empty
    while (queue.length) {
      // Get the vertex with the minimum distance
      let currentVertex = queue.shift();
  
      // Mark the current vertex as visited
      visited[currentVertex] = true;
  
      // Loop through the neighbors of the current vertex
      for (let neighbor in graph[currentVertex]) {
        // Calculate the distance to the neighbor
        let distance = graph[currentVertex][neighbor];
  
        // Check if the neighbor is not visited and the distance is not 0
        if (!visited[neighbor] && distance !== 0) {
          // Calculate the total distance from sourceDestination to the neighbor
          let totalDistance = distances[currentVertex] + distance;
  
          // Check if the total distance is less than the current distance
          if (totalDistance < distances[neighbor]) {
            // Update the distance of the neighbor
            distances[neighbor] = totalDistance;
  
            // Add the neighbor to the queue
            queue.push(neighbor);
          }
        }
      }
    }
    return distances[finDestination];
  }
window.calShortestDist = calShortestDist;
