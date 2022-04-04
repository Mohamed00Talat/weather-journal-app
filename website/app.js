/* Global variables */
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=f2633e08916a38074d6490cde4666b6a&units=metric";

const zipCode = document.getElementById("zipCode");

const generateButton = document.getElementById("generate");

const error = document.getElementById("error");

// create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

// call back click event function
generateButton.addEventListener("click", () => {
  const feelings = document.getElementById("feelings").value;

  // showing message if the zipCode or city not found to user
  if (zipCode.value.trim("") === "") {
    error.innerHTML = "please enter a valid code";
    setTimeout(() => (error.innerHTML = ""), 2000);
  } else {
    getWeatherData(apiURL, zipCode.value, apiKey)
      .then((data) => {
        sendData({
          temp: data.main.temp,
          feelings: feelings,
        });
        console.log(data);
      })
      .then(() => {
        updatingUI();
        document.getElementById("entry").style.opacity = 1;
      });
  }
});

// function to get wep api data
async function getWeatherData(baseURL, zipCode, apiKey) {
  const fetchingData = await fetch(baseURL + zipCode + apiKey);
  try {
    const res = await fetchingData.json();
    return res;
  } catch (error) {
    throw error;
  }
}

// Send post request and post data
async function sendData(data) {
  const req = await fetch("/sendData", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const res = await req.json();
    return res;
  } catch (error) {
    throw error;
  }
}

// update UI function
const updatingUI = async () => {
  const req = await fetch("/getData");
  try {
    const res = await req.json();
    document.getElementById("date").innerHTML = newDate;

    //"&degC" this adding O to the temperature
    document.getElementById("temp").innerHTML = Math.round(res.temp) + "&degC";
    document.getElementById("content").innerHTML = res.feelings;
  } catch (error) {
    throw error;
  }
};
