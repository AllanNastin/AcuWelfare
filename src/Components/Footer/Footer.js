import React from 'react'
import './Footer.css'
import '../../Text.css'

const Footer = () => (
    <div className="footer">
        <div className="mainFooter">
            <p className="version">
                Version: 0.66
            </p>
            <div className="social">
                <p className="pSocial">
                    Socials and Contacts
                </p>
                <div className="socialGrid">
                    <a
                        className='socialLeft'
                        href="https://www.instagram.com/acu_bus/">
                        <img src='images/icons/instagram.png'
                            className="icon"
                            alt="Instagram" />
                    </a>
                    <a
                        className='Right'
                        href="https://discord.gg/8KmP8K759K">
                        <img src='images/icons/Discord.svg'
                            className="icon"
                            alt="Discord" />
                    </a>
                </div>
            </div>

        </div>
    </div>
)
export default Footer;