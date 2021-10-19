import React from "react";


function Footer(){
    return(<footer>
        <h3 className='footerHeader'>Odwiedź nas też na:</h3>
        <div className='footerLinks'>
            <i className=" icon-facebook-rect" onClick={() => window.location='https://www.facebook.com/'}></i>
            <i className="icon-twitter-bird" onClick={() => window.location='https://twitter.com/'}></i>
            <i className="icon-instagram" onClick={() => window.location='https://www.instagram.com/'}></i>
        </div>
    </footer>)
}

export default Footer;