import { useTranslation } from "react-i18next";
import { useState } from "react";

import "../CSS/Flex.css";

var grossPay = 6;
var taxCredit = 3400;
var cutOff = 45800;
var lowBand = 0.2;
var highBand = 0.4;
var grossPay = 0;
var netPay = 0;
var paye = 0;
var usc = 0;
var prsi = 0;
var taxPay = 0;
var percentage = 0;

var uscCuttOff = 13000;
var uscFirstBand = 12012;
var uscSecondBand = 21295;
var uscThirdBand = 70044;
var uscFirstTaxRate = 0.005;
var uscSecondTaxRate = 0.02;
var uscThirdTaxRate = 0.045;
var uscFourthTaxRate = 0.08;
var uscFifthTaxRate = 0.11;

var prsiCutOff = 352 * 52;
var prsiTaxRate = 0.04;

export const Taxes = () => {
  const { t } = useTranslation();
  //   const [netPay, setNetPay] = useState(0);
  const getInputValue = (event) => {
    grossPay = event.target.value;
    // console.log(grossPay);
  };
  const calculateTax = () => {
    usc = 0;
    prsi = 0;
    // paye = 0;
    if (grossPay <= cutOff) {
      paye = grossPay * lowBand;
    } else if (grossPay > cutOff) {
      paye = cutOff * lowBand + (grossPay - cutOff) * highBand;
    }
    if (paye <= taxCredit) {
      paye = 0;
    } else {
      paye -= taxCredit;
    }
    if (grossPay > uscCuttOff) {
      usc = uscFirstBand * uscFirstTaxRate;
      if (grossPay > uscSecondBand) {
        usc += (uscSecondBand - uscFirstBand) * uscSecondTaxRate;
      } else {
        usc += (grossPay - uscFirstBand) * uscSecondTaxRate;
      }
      if (grossPay > uscThirdBand) {
        usc += (uscThirdBand - uscSecondBand) * uscThirdTaxRate;
        usc += (grossPay - uscThirdBand) * uscFourthTaxRate;
      } else if (grossPay > uscSecondBand) {
        usc += (grossPay - uscSecondBand) * uscThirdTaxRate;
      }
    }

    if (grossPay > prsiCutOff) {
      prsi = grossPay * prsiTaxRate;
    }
    taxPay = paye + prsi + usc;
    netPay = grossPay - taxPay;
    percentage = (taxPay / grossPay) * 100;

    console.log(
      "Gross Pay: €" +
        grossPay +
        "\nTaxes due: €" +
        taxPay +
        "\n PAYE: €" +
        paye +
        "\n PRSI: €" +
        prsi +
        "\n USC: €" +
        usc +
        "\nPercentage: " +
        percentage + "%" +
        "\nNet pay: €" +
        netPay
    );
  };

  return (
    <div className="flex flex-centre">
      <input type="text" name="userInput" onChange={getInputValue} />
      {/* <input type="submit" value={t("calculate_button")} /> */}
      <br />
      {/* take user input and print it */}
      <button onClick={calculateTax}>{t("calculate_button")}</button>
      {/* <span>{netPay}</span> */}
      {/* <input type={"text"} onChange={getInputValue}/> */}
      {/* <button onClick={getInputValue}>Calculate Taxes newNumber: {newNumber}</button> */}
    </div>
  );
};
