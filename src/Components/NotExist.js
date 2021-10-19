import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

const NotExist = (props) => {
    return(
    <div className='content'>
        <Navigation log={props.log} setLog={props.setLog}/>
        <main><p>Strona nie istnieje</p></main>
        <Footer/>
    </div>)
}

export default NotExist;