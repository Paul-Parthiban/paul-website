const solInput = document.getElementById("sol")
const rover = document.getElementById("rover");
const cam = document.getElementById("camreas");
const camName = document.getElementById("camreaName");
const roverName = document.getElementById("roverName");
const roverLaunchDate = document.getElementById("roverLaunchDate");
const roverLandingDate = document.getElementById("roverLandingDate");
const sol = document.getElementById("sol");
const roverStatus = document.getElementById("roverStatus");

solInput.addEventListener('keypress', setQuery);

function SpritOppy() {
    if (rover.value === "Spirit" || rover.value === "Opportunity") {
        if (cam.value === "MAST" || cam.value === "CHEMCAM" || cam.value === "MAHLI" || cam.value === "MARDI") {
            alert(rover.value + " did not have a " + cam.value + " camera")
        }
    }

    if (rover.value == "Curiosity") {
        if (cam.value === "PANCAM" || cam.value === "MINITES") {
            alert("Curiosity did not have a " + cam.value + " camera")
        }
    }
}

function validator() {
    sendApiRequest();
    SpritOppy();

    async function sendApiRequest() {
        let APIKEY = '93mf2PYM64BpgVTyQjmhXYHWuzSzZBmWm1lM4uzj';
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value}/photos?sol=${solInput.value}&camera=${cam.value}&api_key=${APIKEY}`);
        console.log(response);
        let data = await response.json();
        console.log(data);
        useApiData(data);
    };

    function useApiData(data) {
        const image = document.getElementById("image");

        image.src = data.photos[0].img_src;
        camName.innerText = "Camera Name: " + data.photos[0].camera.full_name;
        roverName.innerText = "Rover Name: " + data.photos[0].rover.name
        roverLaunchDate.innerText = "Rover Launch Date: " + data.photos[0].rover.launch_date;
        roverLandingDate.innerText = "Rover Landing Date: " + data.photos[0].rover.landing_date;
        sol.innerText = "Sol: " + data.photos[0].sol;
        roverStatus.innerText = "Rover Status: " + data.photos[0].rover.status;
        
    }
};

function setQuery(evt) {
    if (evt.keyCode === 13) {
        validator()
    }
}

function back() {
    solInput.value = parseInt(solInput.value) - 1;
    validator()
};

function forward() {
    solInput.value = parseInt(solInput.value) + 1;
    validator()
}


