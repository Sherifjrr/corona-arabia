// Dom Elements
let sideBar = document.getElementById("side-bar");
let burgerMenu = document.getElementById("burger-menu");
let countryButton = document.querySelectorAll("#country");
let countryNames = document.querySelectorAll("#countryName");
let countrySelected = document.getElementById("selectedCountry");
let countryFlag = document.getElementById("countryFlag");
let countriesFlag = document.querySelectorAll("#countriesFlag");
let loadingScreen = document.getElementById("loading-screen");
let updatedStatus = document.getElementById("updated");
let newCases = document.getElementById("newCases");
let newDeaths = document.getElementById("newDeaths");
let newRecovered = document.getElementById("newRecovered");
let activeCases = document.getElementById("activeCases");
let recovered = document.getElementById("recovered");
let deaths = document.getElementById("deaths");
let cases = document.getElementById("cases");
let deathRatio = document.getElementById("deathRatio");
let recoveryRatio = document.getElementById("recoveryRatio");
let activeRatio = document.getElementById("activeRatio");
let date = document.querySelectorAll("#date");
let API = "https://covid-api.com/api/reports?iso=";

// Make eg data onload
window.onload = () => {
  document.querySelector(".default").click();
};
// sideBar toggle
burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  if (window.matchMedia("(min-width: 769px)").matches) {
    if (sideBar.style.width == "0px") {
      sideBar.style.width = "50%";
      sideBar.style.padding = "1rem";
    } else {
      sideBar.style.width = "0px";
      sideBar.style.padding = "0";
    }
  }
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (sideBar.style.width == "0px") {
      sideBar.style.width = "100%";
      sideBar.style.padding = "1rem";
    } else {
      sideBar.style.width = "0px";
      sideBar.style.padding = "0";
    }
  }
});
// fetching data and update the UI
countryButton.forEach(function (button, value) {
  button.addEventListener("click", () => {
    countryFlag.src = `${countriesFlag[value].src}`;
    countrySelected.innerHTML = `${countryNames[value].innerHTML}`;
    burgerMenu.classList.remove("active");
    sideBar.style.width = "0px";
    sideBar.style.padding = "0";
    async function coronaData() {
      loadingScreen.style.visibility = "visible";
      loadingScreen.style.opacity = "100";
      let response = await fetch(`${API}${countryButton[value].value}`);
      try {
        let result = await response.json();
        loadingScreen.style.visibility = "hidden";
        loadingScreen.style.opacity = "0";

        let time = new Date(result.data[0].last_update);
        let deathRatioCalc =
          (result.data[0].deaths / result.data[0].confirmed) * 100;
        let recoveryRatioCalc =
          (result.data[0].recovered / result.data[0].confirmed) * 100;
        let activeRatioCalc =
          (result.data[0].active / result.data[0].confirmed) * 100;

        updatedStatus.innerHTML = ` اخر التحديث عند \u00A0: \u00A0 ${time.toLocaleTimeString(
          "ar-EG",
          { hour: "2-digit", minute: "2-digit" }
        )} \u00A0-\u00A0 ${time.toLocaleDateString("ar-EG")}`;
        newCases.innerHTML = `${result.data[0].confirmed_diff}`;
        newDeaths.innerHTML = `${result.data[0].deaths_diff}`;
        newRecovered.innerHTML = `${result.data[0].recovered_diff}`;
        activeCases.innerHTML = `${result.data[0].active}`;
        recovered.innerHTML = `${result.data[0].recovered}`;
        deaths.innerHTML = `${result.data[0].deaths}`;
        cases.innerHTML = `${result.data[0].confirmed}`;
        deathRatio.innerHTML = `${deathRatioCalc.toFixed(2)} %`;
        recoveryRatio.innerHTML = `${recoveryRatioCalc.toFixed(2)} %`;
        activeRatio.innerHTML = `${activeRatioCalc.toFixed(2)} %`;
      } catch (error) {
        console.log("error", error);
      }
    }
    coronaData();
  });
});
