function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}
let censusTract;

function getCensusTract(){
    const street=spaceToPlus("111-24 199th Street");
    const city=spaceToPlus("St. Albans");
    const state=spaceToPlus("New York");
    const zip=11412;
    const url1=`http://localhost:4000/geocode?street=${street}&city=${city}&state=${state}&zip=${zip}`;

    fetch(url1)
    .then(x=>x.json())
    .then(y=>{
        censusTract= y.result.addressMatches[0].geographies["Census Tracts"][0].GEOID;
        console.log(censusTract);
    });
}

function spaceToPlus(str){
    let x="";
    for(let i=0;i<str.length;i++){
        if(str[i]==" "){
            x+="+";
        } else {
            x+=str[i];
        }
    }
    return x;
}
//AIzaSyDwemvwLqnfbFKGQx_ru7eC7bYkbAuSj5U
//DON'T USE THIS