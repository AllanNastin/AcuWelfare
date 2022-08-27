import { useTranslation } from "react-i18next";
import { useState } from "react";

import "../CSS/Flex.css";
import "../CSS/Text.css";
import "../CSS/Grid.css";
import "../CSS/Main.css";

var userInput = 0;
var dayOne = 0;
var dayTwo = 0;
var dayThree = 0;
var earnings = [0,0,0,0,0,0,0]
var daysOfEarnings = 0;
var allowanceQualification;

export const Allowance = () => {
  const { t } = useTranslation();
  const [qualificationMessage, setQualificationMessage] = useState(t("allowance_test"));
  const calculateAllowance = () => {
    earnings[0] = Number(document.getElementById("wednesday").value)
    earnings[1] = Number(document.getElementById("thursday").value)
    earnings[2] = Number(document.getElementById("friday").value)
    earnings[3] = Number(document.getElementById("saturday").value)
    earnings[4] = Number(document.getElementById("sunday").value)
    earnings[5] = Number(document.getElementById("monday").value)
    earnings[6] = Number(document.getElementById("tuesday").value)
    allowanceQualification = true;
    daysOfEarnings = 0;
    for(var i = 0; i <= 7; i++){
      if(earnings[i] > 0){
        daysOfEarnings++;
      }
    }
    if (daysOfEarnings > 3){
      allowanceQualification = false;
    }
    if (allowanceQualification){
      setQualificationMessage(t("allowance_true"));
    }
    else {
      setQualificationMessage(t("allowance_false"));
    }
    console.log(daysOfEarnings)
  };

  return (
    <div className="flex flex-center">
      <div className="grid-days grid-gap-days">
        <div className="row-one full-width text-center">
          <p className="one">{t("wednesday")}</p>
          <p className="two">{t("thursday")}</p>
          <p className="three">{t("friday")}</p>
          <p className="four">{t("saturday")}</p>
          <p className="five">{t("sunday")}</p>
          <p className="six">{t("monday")}</p>
          <p className="seven">{t("tuesday")}</p>
        </div>
        <div className="row-two custom-width grid-center">
          <input
            className="one"
            type="text"
            id="wednesday"
          />
          <input
            className="two"
            type="text"
            id="thursday"
          />
          <input
            className="three"
            type="text"
            id="friday"
          />
          <input
            className="four"
            type="text"
            id="saturday"
          />
          <input
            className="five"
            type="text"
            id="sunday"
          />
          <input
            className="six"
            type="text"
            id="monday"
          />
          <input
            className="seven"
            type="text"
            id="tuesday"
          />
        </div>
      </div>
      <button
        onClick={() => {
          calculateAllowance();
        }}
      >
        {t("calculate_button")}
      </button>
        <p> {qualificationMessage} </p>
    </div>
  );
};
