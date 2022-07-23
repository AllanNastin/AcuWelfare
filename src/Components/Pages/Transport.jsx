import { useTranslation } from "react-i18next"

export const Transport = () => { 
    const { t } = useTranslation()

    return (
        <div className="contrainer">
            <div className="header">
            </div>
            <div className="d-flex flex-column align-items-start margin-left">
                <h1 className="font-weight-normal mb-3">{t("transport_button")}</h1>
                <p> {t("transport_button")}</p>
                {/* <p>{t("days", { number_of_days })}</p> */}
            </div>
        </div>
    );
}