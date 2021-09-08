function contentLoader() {
    sendApiRequest();
}

async function sendApiRequest() {
    let APIKEY = '93mf2PYM64BpgVTyQjmhXYHWuzSzZBmWm1lM4uzj';
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKEY}`);
    console.log(response);
    let data = await response.json();
    console.log(data);
    useApiData(data);
};

function useApiData(data) {
    document.querySelector("#title").innerHTML += data.title;
    document.querySelector("#content").innerHTML += `<img src="${data.url}" class='main-img' /> <br/>`;
    document.querySelector("#content").innerHTML += data.explanation;

}
