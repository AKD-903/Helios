function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}

document.getElementById("submit").addEventListener("click",async function(){
    const censusTract=await getCensusTract();
    console.log(censusTract);
    const sunroofObj=await getSunroof(censusTract);
    console.log(sunroofObj);

    document.getElementById("censusTractP").innerHTML=censusTract;
    document.getElementById("medPanelsP").innerHTML=sunroofObj.number_of_panels_median;
    document.getElementById("medKWP").innerHTML=sunroofObj.kw_median;
})

async function getCensusTract(){
    const street=spaceToPlus(document.getElementById("streetName").value);
    const city=spaceToPlus(document.getElementById("cityName").value);
    const zip=document.getElementById("zipCode").value;
    const url1=`http://localhost:3500/geocode?street=${street}&city=${city}&state=NY&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&layers=10&format=json`;

    let x=await fetch(url1,{headers:{"Accept":"application/json"}});
    let y=await x.json();
    let z=await y.result.addressMatches[0].geographies["Census Block Groups"][0].GEOID;
    z=z.toString();
    return z.substring(0,11);
}

async function getSunroof(censusTract){
    let a=await fetch('json.json');
    let b=await a.json();
    let c=await b.find((e)=>e.region_name==censusTract);
    return c;
}

function spaceToPlus(str){
    return str.replace(/ /g, '+');
}