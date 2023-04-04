const pickUpLoc = document.querySelector(".pick-up-loc");
const destLoc = document.querySelector(".dest-loc");
const emailId = document.querySelector(".email");
const calFare = document.querySelector(".cal-price-time");
const output = document.querySelector(".output");
const displayCabs = document.querySelector(".display-cabs");
const thankYouMsg = document.querySelector(".ty-msg");
const cabsPrice = document.querySelectorAll(".cab-pricing");
const cabSourceLoc = document.querySelectorAll(".cab-sourceLoc");
const cabId = document.querySelectorAll(".cab-id");
const cabETA = document.querySelectorAll(".cab-eta");
const cabStatus = document.querySelectorAll(".cab-status");
const bookNow = document.querySelectorAll(".book-now");
const cabTable = document.querySelector(".cabs");

const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const finalPrices = [];
const estTime = [];
let cabsFare = [];
let sourceLocArray = [];
const urlGetCabs = "http://localhost:3000/cabs";
const urlCreateUser = "http://localhost:3000/bookCab";
const urlUpdateCab = "http://localhost:3000/updateCab";

const graph = {
    A: { B: 5, C: 7 },
    B: { A: 5, D: 15, E: 20 },
    C: { A: 7, D: 5, E: 35 },
    D: { B: 15, C: 5, F: 20 },
    E: { B: 20, C: 35, F: 10 },
    F: { D: 20, E: 10 },
  };

displayCabs.style.display = "none";
let price = [];
let minTime = 0;
function bookNowHandler(event){
  const pickUpVal = pickUpLoc.value.toUpperCase();
  const destLocVal = destLoc.value.toUpperCase();
  const emailVal = emailId.value;
  const newCabId = event.target.parentNode.previousElementSibling.innerHTML;
  const cabData = { newCabId, destLocVal, cabStatus: true}
  const cabPrice = price[newCabId-1];
  axios.put(urlUpdateCab, cabData)
  .then(res => console.log(res));
  const userData = { emailVal, pickUpVal, destLocVal, minTime, cabPrice };
  axios.post(urlCreateUser, userData)
  .then(res => console.log(res));
  thankYouMsg.innerHTML = "Thank you for using our services! Enjoy your journey"
}

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
                    minTime = calShortestDist(graph, pickUpVal, destLocVal);
                    output.innerHTML = "Minimum time to reach your destination is " + minTime + " mins";
                    axios.get(urlGetCabs)
                    .then(({ data: { cabInstances }}) => {
                      sourceLocArray = cabInstances.map(cab => cab.sourceLoc);
                      cabsFare = cabInstances.map(cab => cab.price);
                      const estTimeArr = calEstTime(sourceLocArray);
                      price = estPrice(minTime);
                      cabsPrice.forEach((item,index) => {
                        item.innerHTML = price[index];
                      })
                      cabSourceLoc.forEach((item,index) => {
                        item.innerHTML = sourceLocArray[index];
                      })
                      cabETA.forEach((item,index) => {
                        item.innerHTML = estTimeArr[index];
                      })
                      cabId.forEach((item,index) => {
                        item.innerHTML = cabInstances[index].cabId;
                      })
                      cabStatus.forEach((item,index)=>{
                        if(!cabInstances[index].cabStatus){
                          item.innerHTML = "Unbooked";
                        }else{
                          item.innerHTML = "Booked";
                        }
                      })
                      displayCabs.style.display = "flex";
                    });
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
cabTable.addEventListener('click',bookNowHandler);