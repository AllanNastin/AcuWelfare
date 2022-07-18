import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { useTranslation } from "react-i18next";
import 'flag-icons';

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
  },
];

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const { t } = useTranslation();

  const releaseDate = new Date("2022-7-15");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className="contrainer">
      <div className="d-flex justify-content-end">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Language
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <button className="dropdown-item">
                  <span className={`flag-icon flag-icon-${country_code} mx-2`} >
                  </span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t("welcome_to_react")}</h1>
        <p>{t("days", { number_of_days })}</p>
      </div>
    </div>
  );
}

export default App;
