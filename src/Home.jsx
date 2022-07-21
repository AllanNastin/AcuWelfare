// import React, { useEffect } from "react"
// import logo from './logo.svg';
import "./App.css"
import { useTranslation } from "react-i18next"
import './Text.css'
import Header from './Components/Header/Header'
// import Header from './Components/Header/Header.js'
// import "flag-icons";


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

export const Home = () => {
    const { t } = useTranslation()

  // const releaseDate = new Date("2022-7-15");
  // const timeDifference = new Date() - releaseDate;
  // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // useEffect(() => {
  //   // document.body.dir = currentLanguage.dir || 'ltr'
  // }, [currentLanguage]);

  return (
    <div className="contrainer">
        {/* hi */}
      <div className="header">
        <Header/>
      </div>
      <div className="d-flex flex-column align-items-start margin-left">
        <h1 className="font-weight-normal mb-3">{t("welcome")}</h1>
        <p> {t("opening_paragraph")}</p>
        {/* <p>{t("days", { number_of_days })}</p> */}
      </div>
    </div>
  );
}

// export default App;
