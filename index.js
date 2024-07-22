function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}

document.addEventListener("DOMContentLoaded",async function(){
    const censusTract=await getCensusTract();
    console.log(censusTract);
    const sunroofObj=await getSunroof(censusTract);
    console.log(sunroofObj);
})

async function getCensusTract(){
    const street=spaceToPlus("75 9th Ave");
    const city=spaceToPlus("New York");
    const state=spaceToPlus("NY");
    const zip=10011;
    const url1=`http://localhost:3500/geocode?street=${street}&city=${city}&state=${state}&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json`;

    let x=await fetch(url1,{headers:{"Accept":"application/json"}});
    let y=await x.json();
    console.log("Received Census Tract");
    let z=await y.result.addressMatches[0].geographies["Census Block Groups"][0].GEOID;
    z=z.toString();
    return z.substring(0,11);
}

async function getSunroof(censusTract){
    let a=await fetch('json.json');
    let b=await a.json();
    let c=await b.find((e)=>e.region_name==censusTract);
    console.log("Found object in JSON file");
    return c;
}

function spaceToPlus(str){
    return str.replace(/ /g, '+');
}