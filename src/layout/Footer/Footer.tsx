import "./Footer.scss";
import {ReactComponent as VK} from "../../assets/icons/VK.svg";
import {ReactComponent as Telegram} from "../../assets/icons/telegram.svg";
import {ReactComponent as Discord} from "../../assets/icons/Discord.svg";
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__content">
                    <div className="footer__copyright">© 2023 WildCherry</div>
                    <ul className="footer__menu">
                        <li>Помощь</li>
                        <li>Покупателям</li>
                        <Link to="/seller">
                            <li>Продавцам</li>
                        </Link>
                        <li>Конфиденциальность</li>
                    </ul>
                    <div className="footer__social">
                        <VK/>
                        <Telegram/>
                        <Discord/>
                    </div>
                </div>
            </div>
        </div>
    );
};
