// Dom Elements
let sideBar = document.getElementById('side-bar');
let burgerMenu = document.getElementById('burger-menu');
let countryButton = document.querySelectorAll('#country');
let countryNames = document.querySelectorAll('#countryName');
let countrySelected = document.getElementById('selectedCountry');
let countryFlag = document.getElementById('countryFlag');
let countriesFlag = document.querySelectorAll('#countriesFlag');
let loadingScreen = document.getElementById('loading-screen');
let updatedStatus = document.getElementById('updated');
let newCases = document.getElementById('newCases');
let newDeaths = document.getElementById('newDeaths');
let newRecovered = document.getElementById('newRecovered');
let activeCases = document.getElementById('activeCases');
let recovered = document.getElementById('recovered');
let deaths = document.getElementById('deaths');
let cases = document.getElementById('cases');
let deathRatio = document.getElementById('deathRatio');
let recoveryRatio = document.getElementById('recoveryRatio');
let activeRatio = document.getElementById('activeRatio');
let recordedCases = document.querySelectorAll('#recordedCases');
let recordedDeath = document.querySelectorAll('#recordedDeath');
let recordedTotalCases = document.querySelectorAll('#recordedTotalCases');
let recordedTotalDeaths = document.querySelectorAll('#recordedTotalDeaths');
let recordedTotalCured = document.querySelectorAll('#recordedTotalCured');
let date = document.querySelectorAll('#date')
let API = "https://corona-status2021.herokuapp.com/http://corona-api.com/countries/";


// Make eg data onload
window.onload = () => {
    document.querySelector('.default').click();
    
}
// loading screen
    loadingScreen.style.visibility = 'visible'
    loadingScreen.style.opacity = '100'

// sideBar toggle
burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    if (window.matchMedia("(min-width: 769px)").matches){
        if (sideBar.style.width == '0px'){
                sideBar.style.width = '50%'
                sideBar.style.padding = '1rem'
            } else {
                sideBar.style.width = '0px'
                sideBar.style.padding = '0'
            }
    }
    if (window.matchMedia("(max-width: 768px)").matches) {
        if (sideBar.style.width == '0px') {
            sideBar.style.width = '100%'
            sideBar.style.padding = '1rem'
        }
        else {
            sideBar.style.width = '0px'
            sideBar.style.padding = '0'
        }
    }
})

// fetching data and update the UI
countryButton.forEach(function (button , value) {
    button.addEventListener("click", () => {
        countryFlag.src = `${countriesFlag[value].src}`
        countrySelected.innerHTML = `${countryNames[value].innerHTML}`
        burgerMenu.classList.remove("active");
        sideBar.style.width = '0px';
        sideBar.style.padding = '0';
        async function coronaData() {
            loadingScreen.style.visibility = 'visible'
            loadingScreen.style.opacity = '100'
            let response = await fetch(`${API}${countryButton[value].value}`);
            try {
                let result = await response.json();
                console.log(result);
                let time = new Date(result.data.timeline[0].updated_at) ;
                let deathRatioCalc =  result.data.timeline[0].deaths / result.data.timeline[0].confirmed * 100 ;
                let recoveryRatioCalc = result.data.timeline[0].recovered / result.data.timeline[0].confirmed * 100 ;
                let activeRatioCalc = result.data.timeline[0].active / result.data.timeline[0].confirmed * 100 ;

                updatedStatus.innerHTML=` اخر التحديث عند \u00A0: \u00A0 ${time.toLocaleTimeString('ar-EG' , {hour: '2-digit', minute:'2-digit'})} \u00A0-\u00A0 ${time.toLocaleDateString('ar-EG')}`
                newCases.innerHTML = `${result.data.timeline[0].new_confirmed}`
                newDeaths.innerHTML = `${result.data.timeline[0].new_deaths}`
                newRecovered.innerHTML = `${result.data.timeline[0].new_recovered}`
                activeCases.innerHTML = `${result.data.timeline[0].active}`
                recovered.innerHTML = `${result.data.timeline[0].recovered}`
                deaths.innerHTML = `${result.data.timeline[0].deaths}`
                cases.innerHTML = `${result.data.timeline[0].confirmed}`
                deathRatio.innerHTML = `${deathRatioCalc.toFixed(2)} %`
                recoveryRatio.innerHTML = `${recoveryRatioCalc.toFixed(2)} %`
                activeRatio.innerHTML = `${activeRatioCalc.toFixed(2)} %`

                for(i = 0; i < recordedCases.length; i++) {
                    recordedCases[i].innerHTML = `${result.data.timeline[i+1].new_confirmed}`
                    recordedDeath[i].innerHTML = `${result.data.timeline[i+1].new_deaths}`
                    recordedTotalCases[i].innerHTML = `${result.data.timeline[i+1].confirmed}`
                    recordedTotalDeaths[i].innerHTML = `${result.data.timeline[i+1].deaths}`
                    recordedTotalCured[i].innerHTML = `${result.data.timeline[i+1].recovered}`
                    date[i].innerHTML = `${result.data.timeline[i+1].date}`
                }
                loadingScreen.style.opacity = '0'
            }
            catch (error) {
                console.log('error',error);
            }
        }
        coronaData();
    })
});
