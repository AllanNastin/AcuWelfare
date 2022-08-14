import { useTranslation } from "react-i18next";
import { useState } from "react";

import "../CSS/Flex.css";
import "../CSS/Text.css";

// var grossPay = 6;
var taxCredit = 3400;
var cutOff = 45800;
var lowBand = 0.2;
var highBand = 0.4;
var tempGrossPay = 0;
// var tempNetPay = 0;
var tempPaye = 0;
var tempUsc = 0;
var tempPrsi = 0;
// var tempTaxPay = 0;
// var tempPercentage = 0;

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
  const [netPay, setNetPay] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [usc, setUsc] = useState(0);
  const [prsi, setPrsi] = useState(0);
  const [paye, setPaye] = useState(0);
  const [taxPay, setTaxPay] = useState(0);
  // const [grossPay, setGrossPay] = useState(0)
  //   const [netPay, setNetPay] = useState(0);
  const getInputValue = (event) => {
    tempGrossPay = Number(event.target.value);
    // console.log(grossPay);
  };
  const calculateTax = () => {
    setGrossPay((tempGrossPay).toFixed(2));
    tempUsc = 0;
    tempPrsi = 0;
    // paye = 0;
    if (tempGrossPay <= cutOff) {
      tempPaye = tempGrossPay * lowBand;
    } else if (tempGrossPay > cutOff) {
      tempPaye = cutOff * lowBand + (tempGrossPay - cutOff) * highBand;
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
        tempUsc += (grossPay - uscFirstBand) * uscSecondTaxRate;
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
    setPrsi(tempPrsi.toFixed(2));
    setUsc(tempUsc.toFixed(2));
    setPaye(tempPaye.toFixed(2));
    setTaxPay((tempPaye + tempPrsi + tempUsc).toFixed(2));
    setNetPay((tempGrossPay - tempPaye + tempPrsi + tempUsc).toFixed(2));
    setPercentage((((tempPaye + tempPrsi + tempUsc) / tempGrossPay) * 100).toFixed(2));

    // console.log(
    //   "Gross Pay: €" +
    //     grossPay +
    //     "\nTaxes due: €" +
    //     taxPay +
    //     "\n PAYE: €" +
    //     paye +
    //     "\n PRSI: €" +
    //     prsi +
    //     "\n USC: €" +
    //     usc +
    //     "\nPercentage: " +
    //     percentage +
    //     "%" +
    //     "\nNet pay: €" +
    //     netPay
    // );

    // <console className="logf">"Gross Pay: €" +
    // grossPay +
    // "\nTaxes due: €" +
    // taxPay +
    // "\n PAYE: €" +
    // paye +
    // "\n PRSI: €" +
    // prsi +
    // "\n USC: €" +
    // usc +
    // "\nPercentage: " +
    // percentage + "%" +
    // "\nNet pay: €" +
    // netPay</console>
    // (
    //   "Gross Pay: €" +
    //     grossPay +
    //     "\nTaxes due: €" +
    //     taxPay +
    //     "\n PAYE: €" +
    //     paye +
    //     "\n PRSI: €" +
    //     prsi +
    //     "\n USC: €" +
    //     usc +
    //     "\nPercentage: " +
    //     percentage + "%" +
    //     "\nNet pay: €" +
    //     netPay
    // );
  };

  return (
    <div className="flex flex-centre">
      <input type="text" name="userInput" onChange={getInputValue} />
      {/* <input type="submit" value={t("calculate_button")} /> */}
      <br />
      {/* take user input and print it */}
      <button
        onClick={() => {
          calculateTax();
        }}
      >
        {t("calculate_button")}
      </button>
      <p>
        {t("gross_income")}: €{grossPay}
        <br />
        {t("taxes")}: €{taxPay}
        <br />
        {"\t"}Paye: €{paye}
        <br />
        PRSI: €{prsi}
        <br />
        USC: €{usc}
        <br />
        {t("tax_percentage")}: {percentage}%
        <br />
        {t("net_income")}: €{netPay}
      </p>
    </div>
  );
};
