function toggleMenu() {
    const navContainer = document.querySelector('.navContainer');
    navContainer.classList.toggle('open');
    document.getElementById("userProfile").innerHTML="User Profile";
}

document.getElementById("calculate").addEventListener("click",function(e){
    e.preventDefault();

    const street=spaceToPlus("111-24 199th St");
    const city=spaceToPlus("St. Albans");
    const state=spaceToPlus("New York");
    const zip=11412;
    const url1=`https://geocoding.geo.census.gov/geocoder/geographies/address?street=${street}&city=${city}&state=${state}&zip=${zip}&benchmark=Public_AR_Current&vintage=Current_Current&format=json`;
    
    fetch(url1,{headers:{"Accept":"application/json"}})
    .then(x=>x.json())
    .then(y=>{console.log(y)});
});

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