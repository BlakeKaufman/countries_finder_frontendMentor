"use stricts";
const country_select = document.querySelector(".country_select");
const country_optinos = document.querySelector(".country_options");
const country_optinos_list = document.querySelector(".country_options_list");
const countriesContainer = document.querySelector(".countrys_container");
const country_search = document.querySelector(".control_bar");
import { initChangeTheme } from "./change_theme.js";
let displayed = false;

function displayOptions(event) {
  let targetEvent;
  if (event.srcElement.localName === "span")
    targetEvent = event.target.parentElement;
  else if (event.srcElement.localName === "img")
    targetEvent = event.target.parentElement.parentElement;
  else targetEvent = event.target;
  //   const targetEvent =
  //     event.srcElement.localName === "span"
  //       ? event.target.parentElement
  //       : event.target;

  if (!targetEvent.classList.contains("country_select")) return;

  // const country_optinos_list_height =
  //   country_optinos_list.getBoundingClientRect().height;

  //   console.log(country_optinos_list.getBoundingClientRect().height);

  if (!displayed) {
    country_optinos.style.transition = "height 0.3s, opacity 0.1s";
    country_optinos.style.height = `95px`;

    country_optinos.style.opacity = "1";
    country_select.children[0].children[0].src =
      "../assets/images/angle-small-down.svg";
  } else {
    country_optinos.style.transition =
      "height 0.3s, opacity 0.2s cubic-bezier(1, 0.08, 1, 0.05)";
    country_optinos.style.height = "0";

    country_optinos.style.opacity = "0";
    country_select.children[0].children[0].src =
      "../assets/images/angle-small-up.svg";
  }

  displayed = !displayed;
}

function loadHomepage() {
  const homePageCountries = [
    "germany",
    "united states of america",
    "brazil",
    "iceland",
    "afghanistan",
    "france",
    "albania",
    "algeria",
  ];

  fetch("./data.json").then((response) => {
    response.json().then((data) => {
      countriesContainer.innerHTML = "";
      country_optinos_list.innerHTML = "";

      let homePage = [];

      data.forEach((country) => {
        if (homePageCountries.includes(country.name.toLowerCase()))
          homePage.push(country);

        let html = `<li><a class="changable" href="./fullScreen.html?country=${country.name}">${country.name}</a></li>`;

        country_optinos_list.insertAdjacentHTML("beforeend", html);
      });

      //   const homePage = data.filter((country) =>
      //     homePageCountries.includes(country.name.toLowerCase())
      //   );

      homePage.forEach((element) => {
        let html = `
        <a href="/fullScreen.html?country=${
          element.name
        }" class="country changable">
            <div class="flag_img"><img src="${element.flag}" alt="${
          element.name
        }'s flag"></div>
            <div class="info_container">
            <span class="country_title">${element.name}</span>

            <span class="population country_sub_info"
                ><b>Populatoin</b>: ${new Intl.NumberFormat().format(
                  element.population
                )}</span
            >
            <span class="region country_sub_info"> <b>Region</b>: ${
              element.region
            } </span>
            <span class="capital country_sub_info"
                ><b>Capital</b>: ${element.capital}</span
            >
            </div>
        </a>
       
        `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
      });
      initChangeTheme();
    });
  });
}

function search(event) {
  event.preventDefault();
  const text = event.srcElement.children[0].value;

  window.open(`./fullscreen.html?country=${text}`, "_self");
}

country_search.addEventListener("submit", search);

loadHomepage();
country_select.addEventListener("click", displayOptions);
