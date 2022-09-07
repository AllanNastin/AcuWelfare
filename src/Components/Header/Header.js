import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"
import i18next from "i18next";
import cookies from "js-cookie";

import "./Header.css";
import "../CSS/Flex.css";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ua",
    name: "Українська",
    country_code: "ua",
  },
  {
    code: "ru",
    name: "Русский",
    country_code: "ru",
    // dir: "rtl",
  },
];
var update = false;
const Header = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();
  let currentCountryCode;
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].code === currentLanguageCode) {
      currentCountryCode = languages[i].country_code;
    }
  }
  return (
    <div className="flex flex-equal-spacing">
        <Link className="margin-left" to="/">{t("home_button")}</Link>
        <Link className="margin-left" to="/education">{t("education_button")}</Link>
        <Link className="margin-left" to="/work">{t("work_button")}</Link>
        <Link className="margin-left" to="/support">{t("support_button")}</Link>
        <Link className="margin-left" to="/transport">{t("transport_button")}</Link>
        <Link className="margin-left" to="/taxes">{t("taxes_button")}</Link>
      <div className="grid-right">
        <div className="d-flex justify-content-end">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                className={`flag-icon flag-icon-${currentCountryCode} mx-2`}
              ></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button
                    className="dropdown-item"
                    onClick={() => {i18next.changeLanguage(code); update = true}}
                    // console.log(update)
                    // reload page and change language
                    // onClick={() => window.location.reload()}
                    // do two things in one click
                    // onClick={() => {
                    // onClick={}
                    disabled={code === currentLanguageCode}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code} mx-2`}
                    ></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

// method which return state of update variable

const getUpdate = () => {
  return update;
};

// method which sets update variable to the input
const setUpdate = (value) => {
  update = value;
};

export { getUpdate, setUpdate };

// const setUpdate = () => {
//   update = false;
// };