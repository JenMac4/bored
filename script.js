const textArea = document.querySelector('.text')
// const button = document.querySelector('.button')
const button = document.getElementById("button")
const dropdown1 = document.getElementById("dropdown1")
const dropdown2 = document.getElementById("dropdown2")
const dugtrio = document.querySelector(".dugtrio")
const pokemon = document.querySelector(".pokemon-bottom")
const container = document.querySelector(".container")
const form = document.getElementById("form")

const apiURL = "https://www.boredapi.com/api/activity/"
let queryParam = "";
let apiEndPoint = "";

const changePhoto = (dropdown) => {
    let value = dropdown.options[dropdown.selectedIndex].value
    
    if(value === "2"){
        console.log("trigger")
        dugtrio.style.backgroundImage = "url('51.png')";
    }
    else if (value === "1") {
        dugtrio.style.backgroundImage = "url('50.png')";

    }
}

const changeBottomPhoto = (dropdown) => {
    let value = dropdown.options[dropdown.selectedIndex].value
    
    //double check about these being wrapped as strings
    switch(value) {
        case "social":
            pokemon.style.backgroundImage = "url('25.png')"
          break;
          case "relaxing":
              
              pokemon.style.backgroundImage = "url('143.png')"
          break;
            case "recreational":
            pokemon.style.backgroundImage = "url('199.png')"
            break;
            case "busywork":
            pokemon.style.backgroundImage = "url('235.png')"
            break;
        case "music":
            pokemon.style.backgroundImage = "url('39.png')"
            break;
        default:
            pokemon.style.backgroundImage = "url('25.png')"
        }
      
}

//USE EVENT DELEGATION INSTEAD OF THIS KEYWORD

if(dropdown1){

    dropdown1.addEventListener('change', (e) => {
        changePhoto(e.target);
    })
}

if(dropdown2){
    dropdown2.addEventListener('change', (e) => {
        changeBottomPhoto(e.target);
    })

}

if(form){

    form.addEventListener('submit', (e) => {
    
        e.preventDefault();//why do we need this line
        let typeVal = dropdown2.options[dropdown2.selectedIndex].value
        let participants = dropdown1.options[dropdown1.selectedIndex].value
        queryParam = `?type=${typeVal}&participants=${participants}`
        apiEndPoint = apiURL + queryParam;
        window.location.href = "activity.html" + queryParam;
        console.log(apiEndPoint)
    })
}



//ADD CODE HERE
const fetchBored = async () => {
    
    try {
        const params = new URLSearchParams(window.location.search);
        const typeValue = params.get('type');
        const participantsValue = params.get('participants');
        console.log(apiEndPoint);

        //it makes my blood boil that apiEndPoint is an empty string
        const data = await fetch(apiURL + queryParam);

        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }

        const contentType = data.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }

        

        const activity = await data.json();
        console.log(activity);

        return activity.activity;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const setActivity = async () => {
    const activity = await fetchBored();
    console.log(activity); // Add this line to log the fetched activity
    textArea.innerHTML = activity;
}



document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname.includes("activity.html")){
        await setActivity();
    }
})
