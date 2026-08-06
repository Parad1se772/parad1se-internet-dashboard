async function getIPInfo(){

try{

const res = await fetch("https://ipwho.is/");
const data = await res.json();


document.getElementById("ip").textContent=data.ip;
document.getElementById("country").textContent=data.country;
document.getElementById("city").textContent=data.city;
document.getElementById("isp").textContent=data.connection.isp;


document.getElementById("provider").textContent=data.connection.isp;
document.getElementById("asn").textContent=data.connection.asn;
document.getElementById("type").textContent=data.type || "Unknown";


window.ipData=data;


loadMap(data);



}catch(e){

console.log(e);

}

}





function loadMap(data){


const map=L.map("map").setView(
[
data.latitude,
data.longitude
],
10
);



L.tileLayer(
"https://tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);



L.marker(
[
data.latitude,
data.longitude
]
)
.addTo(map)
.bindPopup(
`
<b>${data.city}</b><br>
${data.country}
`
)
.openPopup();


}





async function speedTest(){


const element=document.getElementById("speed");


element.textContent="Testing...";


const start=performance.now();


try{


await fetch(
"https://speed.cloudflare.com/__down?bytes=10000000"
);


const end=performance.now();


const seconds=(end-start)/1000;


const speed=((10*8)/seconds).toFixed(2);



element.textContent=speed+" Mbps";


}catch{


element.textContent="Error";


}


}






async function getDeviceInfo(){


const ua=navigator.userAgent;


let browser="Unknown";



if(navigator.brave){

const brave=await navigator.brave.isBrave();

if(brave)
browser="Brave Browser";

}



if(browser==="Unknown"){


if(ua.includes("Edg"))
browser="Edge";

else if(ua.includes("Firefox"))
browser="Firefox";

else if(ua.includes("Chrome"))
browser="Chromium Browser";

}



let os="Unknown";


if(ua.includes("Windows"))
os="Windows";

else if(ua.includes("Mac"))
os="macOS";

else if(ua.includes("Android"))
os="Android";

else if(ua.includes("Linux"))
os="Linux";




document.getElementById("browser").textContent=browser;

document.getElementById("os").textContent=os;

document.getElementById("screen").textContent=
screen.width+"x"+screen.height;


document.getElementById("cpu").textContent=
navigator.hardwareConcurrency || "Unknown";


document.getElementById("ram").textContent=
navigator.deviceMemory
?
navigator.deviceMemory+" GB"
:
"Unknown";


document.getElementById("online").textContent=
navigator.onLine
?
"Online 🟢"
:
"Offline 🔴";


document.getElementById("language").textContent=
navigator.language;


document.getElementById("timezone").textContent=
Intl.DateTimeFormat().resolvedOptions().timeZone;


}





function copyIP(){

navigator.clipboard.writeText(
document.getElementById("ip").textContent
);

alert("IP copied!");

}




async function testPing(){

const start=Date.now();


await fetch("https://ipwho.is/");


const end=Date.now();


document.getElementById("ping").textContent=
(end-start)+" ms";


}




getIPInfo();

getDeviceInfo();

function updateClock(){

const now = new Date();


document.getElementById("clock").textContent =
now.toLocaleTimeString("pl-PL");


document.getElementById("date").textContent =
now.toLocaleDateString("pl-PL",{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

});


document.getElementById("clock-zone").textContent =
Intl.DateTimeFormat().resolvedOptions().timeZone;


}


setInterval(updateClock,1000);

updateClock();