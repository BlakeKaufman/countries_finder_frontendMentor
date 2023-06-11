"use strict";
import { initChangeTheme } from "./change_theme.js";
const info_container = document.querySelector(".informatoin_container");
const Selectedcountry = decodeURI(location.search.split("=")[1]);
const country_list = document.querySelector(".country_list");

function loadInfo() {
  fetch("./data.json").then((response) => {
    response.json().then((data) => {
      const foundCountry = data.find(
        (country) =>
          country.name.toLowerCase() === Selectedcountry.toLowerCase()
      );
      let html;

      if (foundCountry) {
        html = `
        <div class="flag_img"><img src="${foundCountry.flag}" alt="${
          foundCountry.name
        }s flag"></div>
        <div class="text_container">
          <span class="country_title">${foundCountry.name}</span>
          <div class="stats_container">
            <div class="stats">
              <span><b>Native Name</b>: ${foundCountry.nativeName}</span>
              <span><b>Populatoin</b>: ${new Intl.NumberFormat().format(
                foundCountry.population
              )}</span>
              <span><b>Region</b>: ${foundCountry.region}</span>
              <span><b>Sub Region</b>: ${foundCountry.subregion}</span>
              <span><b>Capital</b>: ${foundCountry.capital}</span>
            </div>
            <div class="stats">
              <span><b>Top Level Domain</b>: ${[
                foundCountry.topLevelDomain,
              ]}</span>
              <span><b>Currencies</b>: ${foundCountry.currencies[0].name}</span>
              <span><b>Languages</b>: ${foundCountry.languages[0].name}</span>
            </div>
          </div>
          <div class="bordering_countries">
            <span>Bourder Countries:</span>
            <div class="country_list">
            `;
        // let counter = 0;
        if (foundCountry.borders) {
          console.log(foundCountry);
          foundCountry.borders.forEach((border) => {
            const borderCountry = data.find(
              (country) =>
                country.alpha3Code.toLowerCase() === border.toLowerCase()
            );

            // if (counter++ > 2) return;
            html += `
            <a class="changable border_countries" href="./fullScreen.html?country=${borderCountry.name}">${border}</a>`;
          });
        } else {
          html += ` <span class="changable">None</span>`;
        }

        html += `
            
            </div>
          </div>
        </div>
       
        `;
      } else {
        html = ` <span class="errorMessage">Country Does Not exist...</span>`;
      }

      // info_container.innerHTML = "";
      // country_list.innerHTML = "";

      info_container.insertAdjacentHTML("beforeend", html);
      initChangeTheme();
    });
  });
}

loadInfo();
