function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}

document.addEventListener("DOMContentLoaded",async function(){
    const censusTract=await getCensusTract();
    console.log(censusTract);
})

async function getCensusTract(){
    const street=spaceToPlus("4600 Silver Hill Rd");
    const city=spaceToPlus("Washington");
    const state=spaceToPlus("DC");
    const zip=20233;
    const url1=`http://localhost:3500/geocode?street=${street}&city=${city}&state=${state}&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json`;

    let x=await fetch(url1,{headers:{"Accept":"application/json"}});
    let y=await x.json();
    console.log("Received Census Tract");
    return y.result.addressMatches[0].geographies["Census Block Groups"][0].GEOID;
}

function getSunroof(censusTract){
    //fetch('json.json')
    // .then(x=>x.json())
    // .then(y=>{
    //     console.log(y);
    // })
}


function spaceToPlus(str) {
    return str.replace(/ /g, '+');
  }
//AIzaSyDwemvwLqnfbFKGQx_ru7eC7bYkbAuSj5U
//DON'T USE THIS