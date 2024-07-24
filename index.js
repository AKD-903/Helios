function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}

try {
    const submitButton = document.getElementById("submit");
    if (!submitButton) {}

    submitButton.addEventListener("click", async function() {
        try {
            const censusTract = await getCensusTract();
            console.log(censusTract);
            const sunroofObj = await getSunroof(censusTract);
            console.log(sunroofObj);

            document.getElementById("censusTractP").innerHTML = censusTract;
            document.getElementById("medPanelsP").innerHTML = sunroofObj.number_of_panels_median;
            document.getElementById("medKWP").innerHTML = sunroofObj.kw_median;
        } catch (error) {
            console.error('An error occurred while processing the click event:', error);
        }
    });
} catch (error) {}

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


function openPopup(){
    document.getElementsByClassName("popup")[0].style.display="block";
}
function closePopup(){
    document.getElementsByClassName("popup")[0].style.display="none";
}

async function submitPopup(){
    let popupEmail=document.getElementById("popupEmail").value;
    let popupBorough=document.getElementById("popupBorough").value;
    
    const response = await fetch('http://localhost:3500/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: popupEmail, borough: popupBorough })
    });

    const result = await response.text();
    fetchUsers();
    closePopup();
}

async function fetchUsers() {
    const response = await fetch('http://localhost:3500/users');
    const users = await response.json();
    users.forEach(user => {
      console.log(`ID: ${user.id}, Email: ${user.email}, Borough: ${user.borough}`);
    });
}