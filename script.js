const geolocationApi = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_Wus4skikw1OWdylOfBiyBqARjolMZ';
var map = L.map('map').setView([51.505, -0.09], 13);

// HTML Elements
const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const ip_output = document.getElementById("ip_output");
const location_output = document.getElementById("location_output");
const location_code_output = document.getElementById("location_code_output");
const timezone_output = document.getElementById("timezone_output");
const isp_output = document.getElementById("isp_output");

const ip_format = //

// map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function isValidIPv4(ip) {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
}

const geolocationDetails = (input_ip) => {
    const url = `${geolocationApi}&ipAddress=${input_ip}`;


    fetch(url).then(response => response.json())
    .then(data => {
        console.log(data);

        ip_output.textContent = data.ip;
        location_output.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
        location_code_output.textContent = data.location.postalCode;
        timezone_output.textContent = `UTC ${data.location.timezone}`;
        isp_output.textContent = data.isp;
        
        var marker = L.marker([51.5, -0.09]).addTo(map);
        const latitude = data.location.lat;
        const longitude = data.location.lng;
        map.setView([latitude, longitude], 13);
        marker.setLatLng([latitude, longitude]);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ip = input.value.trim();

    if (isValidIPv4(ip)) {
        geolocationDetails(ip);
    } else {
        alert("please enter a valid IPv4 address");
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const ip = input.value.trim();

        if (isValidIPv4(ip)) {
            geolocationDetails(ip);
        } else {
            alert("please enter a valid IPv4 address");
        }
    }
})