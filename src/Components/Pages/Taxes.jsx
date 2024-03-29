import { useTranslation } from "react-i18next";
import { useState } from "react";

import "../CSS/Flex.css";
import "../CSS/Text.css";
import "../CSS/Main.css";

var userInput = 0;
var tempGrossPay = 0;
var tempPaye = 0;
var tempUsc = 0;
var tempPrsi = 0;

var taxCredit = 3400;
var payeCutOff = 36800;
var lowBand = 0.2;
var highBand = 0.4;

var uscCuttOff = 13000;
var uscFirstBand = 12012;
var uscSecondBand = 21295;
var uscThirdBand = 70044;
var uscFirstTaxRate = 0.005;
var uscSecondTaxRate = 0.02;
var uscThirdTaxRate = 0.045;
var uscFourthTaxRate = 0.08;
// var uscFifthTaxRate = 0.11;

var prsiCutOff = 352 * 52;
var prsiTaxRate = 0.04;

export const Taxes = () => {
  const { t } = useTranslation();
  const [yearlyNetPay, setYearlyNetPay] = useState(0);
  const [yearlyUsc, setYearlyUsc] = useState(0);
  const [yearlyPrsi, setYearlyPrsi] = useState(0);
  const [yearlyPaye, setYearlyPaye] = useState(0);
  const [yearlyTaxPay, setYearlyTaxPay] = useState(0);
  const [yearlyGrossPay, setYearlyGrossPay] = useState(0);

  const [monthlyNetPay, setMonthlyNetPay] = useState(0);
  const [monthlyGrossPay, setMonthlyGrossPay] = useState(0);
  const [monthlyUsc, setMonthlyUsc] = useState(0);
  const [monthlyPrsi, setMonthlyPrsi] = useState(0);
  const [monthlyPaye, setMonthlyPaye] = useState(0);
  const [monthlyTaxPay, setMonthlyTaxPay] = useState(0);

  const [weeklyNetPay, setWeeklyNetPay] = useState(0);
  const [weeklyGrossPay, setWeeklyGrossPay] = useState(0);
  const [weeklyUsc, setWeeklyUsc] = useState(0);
  const [weeklyPrsi, setWeeklyPrsi] = useState(0);
  const [weeklyPaye, setWeeklyPaye] = useState(0);
  const [weeklyTaxPay, setWeeklyTaxPay] = useState(0);

  const [percentage, setPercentage] = useState(0);

  // const getInputValue = (event) => {
  //   userInput = Number(event.target.value);
  //   console.log(userInput);
  // };

  async function calculateTaxYearly() {
    tempGrossPay = Number(document.getElementById("userInput").value);
    calculateTax();
  }
  async function calculateTaxMonthly() {
    // getInputValue();
    tempGrossPay = Number(document.getElementById("userInput").value) * 12;
    calculateTax();
  }

  async function calculateTaxWeekly() {
    tempGrossPay = Number(document.getElementById("userInput").value) * 52;
    calculateTax();
  }
  async function calculateTax() {
    setYearlyGrossPay(tempGrossPay.toFixed(2));
    tempUsc = 0;
    tempPrsi = 0;
    // paye = 0;
    if (tempGrossPay <= payeCutOff) {
      tempPaye = tempGrossPay * lowBand;
    } else if (tempGrossPay > payeCutOff) {
      tempPaye = payeCutOff * lowBand + (tempGrossPay - payeCutOff) * highBand;
    }
    if (tempPaye <= taxCredit) {
      tempPaye = 0;
    } else {
      tempPaye -= taxCredit;
    }
    if (tempGrossPay > uscCuttOff) {
      tempUsc = uscFirstBand * uscFirstTaxRate;
      if (tempGrossPay > uscSecondBand) {
        tempUsc += (uscSecondBand - uscFirstBand) * uscSecondTaxRate;
      } else {
        tempUsc += (tempGrossPay - uscFirstBand) * uscSecondTaxRate;
      }
      if (tempGrossPay > uscThirdBand) {
        tempUsc += (uscThirdBand - uscSecondBand) * uscThirdTaxRate;
        tempUsc += (tempGrossPay - uscThirdBand) * uscFourthTaxRate;
      } else if (tempGrossPay > uscSecondBand) {
        tempUsc += (tempGrossPay - uscSecondBand) * uscThirdTaxRate;
      }
    }

    if (tempGrossPay > prsiCutOff) {
      tempPrsi = tempGrossPay * prsiTaxRate;
    }

    //Yearly
    setYearlyUsc(tempUsc.toFixed(2));
    setYearlyPaye(tempPaye.toFixed(2));
    setYearlyPrsi(tempPrsi.toFixed(2));
    setYearlyTaxPay((tempPaye + tempPrsi + tempUsc).toFixed(2));
    setYearlyNetPay(
      (tempGrossPay - (tempPaye + tempPrsi + tempUsc)).toFixed(2)
    );

    //Monthly
    setMonthlyGrossPay((tempGrossPay / 12).toFixed(2));
    setWeeklyUsc((tempUsc / 52).toFixed(2));
    setWeeklyPaye((tempPaye / 52).toFixed(2));
    setWeeklyPrsi((tempPrsi / 52).toFixed(2));
    setWeeklyTaxPay(((tempPaye + tempPrsi + tempUsc) / 52).toFixed(2));
    setWeeklyNetPay(
      ((tempGrossPay - (tempPaye + tempPrsi + tempUsc)) / 52).toFixed(2)
    );

    //Weekly
    setWeeklyGrossPay((tempGrossPay / 52).toFixed(2));
    setMonthlyUsc((tempUsc / 12).toFixed(2));
    setMonthlyPaye((tempPaye / 12).toFixed(2));
    setMonthlyPrsi((tempPrsi / 12).toFixed(2));
    setMonthlyTaxPay(((tempPaye + tempPrsi + tempUsc) / 12).toFixed(2));
    setMonthlyNetPay(
      ((tempGrossPay - (tempPaye + tempPrsi + tempUsc)) / 12).toFixed(2)
    );

    setPercentage(
      (((tempPaye + tempPrsi + tempUsc) / tempGrossPay) * 100).toFixed(2)
    );
  }

  return (
    <div className="flex flex-center">
      <input type="text" id="userInput"/>
      {/* <br/> */}
      <button
        onClick={() => {
          calculateTaxYearly();
        }}
      >
        {t("yearly_input")}
      </button>
      <button
        onClick={() => {
          calculateTaxMonthly();
        }}
      >
        {t("monthly_input")}
      </button>
      <button
        onClick={() => {
          calculateTaxWeekly();
        }}
      >
        {t("weekly_input")}
      </button>
      <br/>
      <div className="flex flex-equal-spacing">
        <p>
          <span className="block text-center">{t("yearly")}:</span>
          {/* <br /> */}
          &nbsp;{t("gross_income")}: €{yearlyGrossPay}
          <br />
          &nbsp;{t("taxes")}: €{yearlyTaxPay}
          <br />
          &nbsp;&nbsp;Paye: €{yearlyPaye}
          <br />
          &nbsp;&nbsp;PRSI: €{yearlyPrsi}
          <br />
          &nbsp;&nbsp;USC: €{yearlyUsc}
          <br />
          &nbsp;{t("tax_percentage")}: {percentage}%
          <br />
          &nbsp;{t("net_income")}: €{yearlyNetPay}
        </p>
        <p>
          <span className="block text-center">{t("monthly")}:</span>
          {/* <br /> */}
          &nbsp;{t("gross_income")}: €{monthlyGrossPay}
          <br />
          &nbsp;{t("taxes")}: €{monthlyTaxPay}
          <br />
          &nbsp;&nbsp;Paye: €{monthlyPaye}
          <br />
          &nbsp;&nbsp;PRSI: €{monthlyPrsi}
          <br />
          &nbsp;&nbsp;USC: €{monthlyUsc}
          <br />
          &nbsp;{t("tax_percentage")}: {percentage}%
          <br />
          &nbsp;{t("net_income")}: €{monthlyNetPay}
        </p>
        <p>
          <span className="block text-center"> {t("weekly")}: </span>
          {/* <br /> */}
          &nbsp;{t("gross_income")}: €{weeklyGrossPay}
          <br />
          &nbsp;{t("taxes")}: €{weeklyTaxPay}
          <br />
          &nbsp;&nbsp;Paye: €{weeklyPaye}
          <br />
          &nbsp;&nbsp;PRSI: €{weeklyPrsi}
          <br />
          &nbsp;&nbsp;USC: €{weeklyUsc}
          <br />
          &nbsp;{t("tax_percentage")}: {percentage}%
          <br />
          &nbsp;{t("net_income")}: €{weeklyNetPay}
        </p>
      </div>
    </div>
  );
};
