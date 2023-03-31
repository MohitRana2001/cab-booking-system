const pickUpLoc = document.querySelector(".pick-up-loc");
const destLoc = document.querySelector(".dest-loc");
const emailId = document.querySelector(".email");
const calFare = document.querySelector(".cal-price-time");
const output = document.querySelector(".output");
const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, D: 15, E: 20 },
    C: { A: 7, D: 5, E: 35 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { D: 20, E: 10 },
  };

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
function clickHandler(){
    const pickUpVal = pickUpLoc.value.toUpperCase();
    const destLocVal = destLoc.value.toUpperCase();
    const emailVal = emailId.value;
    if(pickUpVal && destLocVal && emailVal){
        if(emailVal.match(emailChecker)){
            if(pickUpVal != destLocVal){
                if(graph.hasOwnProperty(pickUpVal) && graph.hasOwnProperty(destLocVal)){
                    const distances = calShortestDist(graph, pickUpVal, destLocVal);
                    output.innerHTML = distances;
                }else{
                    output.innerHTML = "The source or destination does not exist in our database please try again!";
                }
            }else{
                output.innerHTML = "Source and destination cannot be same";
            }
        }else{
            output.innerHTML = "Please enter correct email ID"
        }
    }else{
        output.innerHTML = "Please enter all values to proceed further";
    }
}

calFare.addEventListener('click', clickHandler);