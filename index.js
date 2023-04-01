const pickUpLoc = document.querySelector(".pick-up-loc");
const destLoc = document.querySelector(".dest-loc");
const emailId = document.querySelector(".email");
const calFare = document.querySelector(".cal-price-time");
const output = document.querySelector(".output");
const displayCabs = document.querySelector(".cab-status");
const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const finalPrices = [];
const estTime = [];
let cabsFare = [];
let sourceLocArray = [];
const url = "http://localhost:3000/cabs";

const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, D: 15, E: 20 },
    C: { A: 7, D: 5, E: 35 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { D: 20, E: 10 },
  };

displayCabs.style.display = "none";

function clickHandler(){
    const pickUpVal = pickUpLoc.value.toUpperCase();
    const destLocVal = destLoc.value.toUpperCase();
    const emailVal = emailId.value;
    function calEstTime(sourceLocArray){
      sourceLocArray.forEach(sourceLoc => {
        estTime.push(window.calShortestDist(graph, pickUpVal, sourceLoc))
      })
      return estTime; 
    }
    function estPrice(dist){
      for(let i = 0; i<5; i++){
          finalPrices.push(cabsFare[i] * dist);
      }
      return finalPrices;
    }

    if(pickUpVal && destLocVal && emailVal){
        if(emailVal.match(emailChecker)){
            if(pickUpVal != destLocVal){
                if(graph.hasOwnProperty(pickUpVal) && graph.hasOwnProperty(destLocVal)){
                    const distances = calShortestDist(graph, pickUpVal, destLocVal);
                    console.log(distances);
                    axios.get(url)
                    .then(({ data: { cabInstances}}) => {
                      sourceLocArray = cabInstances.map(cab => cab.sourceLoc);
                      cabsFare = cabInstances.map(cab => cab.price);
                      console.log(calEstTime(sourceLocArray));
                      console.log(cabsFare);
                      const price = estPrice(distances);
                      console.log(price);
                    });
                    // displayCabs.style.display = "block";
                    // output.innerHTML = price;
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
// console.log(sourceLocArray)
calFare.addEventListener('click', clickHandler);