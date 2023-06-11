"use strict";

export function initChangeTheme() {
  let changableItems;

  const colorSchemeSwither = document.querySelector(".color_scheme_changer");
  const color_scheme_changer_span = document.querySelector(
    ".color_scheme_changer_span"
  );

  function switchColor(event) {
    let colorTheme = localStorage.getItem("color_theme");

    if (event === "first") {
      if (colorTheme === "Dark Mode") {
        colorSchemeSwither.children[0].src = "./assets/images/brightness.svg";
        color_scheme_changer_span.textContent = "Light Mode";
      } else {
        colorSchemeSwither.children[0].src =
          "./assets/images/icons8-moon-symbol-50.png";

        color_scheme_changer_span.textContent = "Dark Mode";
      }
      changeColor(colorTheme);
      return;
    }
    if (colorTheme === "Dark Mode") {
      colorSchemeSwither.children[0].src =
        "./assets/images/icons8-moon-symbol-50.png";
      color_scheme_changer_span.textContent = "Dark Mode";
      localStorage.setItem("color_theme", "Light Mode");
    } else {
      colorSchemeSwither.children[0].src = "./assets/images/brightness.svg";

      color_scheme_changer_span.textContent = "Light Mode";
      localStorage.setItem("color_theme", "Dark Mode");
    }

    colorTheme = localStorage.getItem("color_theme");

    changeColor(colorTheme);
  }

  function changeColor(color) {
    changableItems = document.querySelectorAll(".changable");

    changableItems.forEach((item) => {
      if (item.localName === "body") {
        if (color === "Light Mode") {
          item.style.backgroundColor = "var(--LM_background)";
          item.style.color = "var(--LM_text)";
        } else {
          item.style.backgroundColor = "var(--DM_background)";
          item.style.color = "var(--DM_text)";
        }
      } else if (item.localName === "nav") {
        if (color === "Light Mode") {
          item.style.boxShadow = "0 3px 5px 0 var(--LM_boxShadow)";
          item.style.backgroundColor = "var(--LM_elements)";
        } else {
          item.style.boxShadow = "0 3px 5px 0 var(--DM_boxShadow)";
          item.style.backgroundColor = "var(--DM_elements)";
        }
      } else if (item.localName === "span") {
        if (color === "Light Mode") {
          item.style.boxShadow = " 0 0 5px var(--LM_boxShadow)";
          item.style.backgroundColor = "var(--LM_elements)";
          item.style.border = " 1px solid var(--LM_boxShadow)";
          item.style.color = "var(--LM_text)";
        } else {
          item.style.boxShadow = " 0 0 5px var(--DM_boxShadow)";
          item.style.backgroundColor = "var(--DM_elements)";
          item.style.border = " 1px solid var(--DM_boxShadow)";
          item.style.color = "var(--DM_text)";
        }
      } else if (
        item.localName === "div" ||
        item.localName === "ul" ||
        (item.localName === "a" && item.classList.contains("country")) ||
        (item.localName === "a" && item.classList.contains("back_BTN")) ||
        (item.localName === "a" && item.classList.contains("border_countries"))
      ) {
        if (color === "Light Mode") {
          item.style.boxShadow = " 0 0 5px var(--LM_boxShadow)";
          item.style.backgroundColor = "var(--LM_elements)";
          item.style.border = " 1px solid var(--LM_boxShadow)";
          item.style.color = "var(--LM_color)";
        } else {
          item.style.boxShadow = " 0 0 5px var(--DM_boxShadow)";
          item.style.backgroundColor = "var(--DM_elements)";
          item.style.border = " 1px solid var(--DM_boxShadow)";
          item.style.color = "var(--DM_color)";
        }
      } else if (item.localName === "input") {
        if (color === "Light Mode") {
          item.style.boxShadow = " 0 0 5px var(--LM_boxShadow)";
          item.style.backgroundColor = "var(--LM_elements)";
          item.style.border = " 1px solid var(--LM_boxShadow)";
          item.style.color = "var(--LM_color)";
          item.style.backgroundImage = `url("../assets/images/icons8-search-b.svg")`;
          item.classList.remove("placeHolderColorChange");
        } else {
          item.style.boxShadow = " 0 0 5px var(--DM_boxShadow)";
          item.style.backgroundColor = "var(--DM_elements)";
          item.style.border = " 1px solid var(--DM_boxShadow)";
          item.style.color = "var(--DM_color)";
          item.style.backgroundImage = `url("../assets/images/icons8-search-w.svg")`;
          item.classList.add("placeHolderColorChange");
        }
      } else if (item.localName === "a") {
        if (color === "Light Mode ") item.style.color = "var(--LM_color)";
        else item.style.color = "var(--DM_color)";
      } else if (item.localName === "img") {
        if (color === "Light Mode")
          item.style.filter =
            "invert(0%) sepia(4%) saturate(0%) hue-rotate(337deg) brightness(100%) contrast(107%)";
        else
          item.style.filter =
            "invert(100%) sepia(0%) saturate(7479%) hue-rotate(89deg) brightness(117%) contrast(100%)";
      }
    });
  }

  colorSchemeSwither.addEventListener("click", switchColor);
  switchColor("first");
}
