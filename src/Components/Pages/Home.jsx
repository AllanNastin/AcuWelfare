import "../../App.css"
import { useTranslation } from "react-i18next"
import '../CSS/Text.css'

export const Home = () => {
    const { t } = useTranslation()

  return (
    <div className="contrainer">
      <div className="header">
      </div>
      <div className="d-flex flex-column align-items-start margin-left">
        <h1 className="font-weight-normal mb-3">{t("welcome")}</h1>
        <p> {t("opening_paragraph")}</p>
        {/* <p>{t("days", { number_of_days })}</p> */}
      </div>
    </div>
  );
}
