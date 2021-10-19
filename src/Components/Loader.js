import React from 'react';
import '../css/load.css';
import Navigation from './Navigation';


const Loader = (props) => {
    return(
    <div className='content'>
        <Navigation log={props.log} setLog={props.setLog} title={props.title}/>
        <main style={{height:'90%'}}>
            <div className="loading">
                <div className="bounceball">
                    <div className='ball'></div>
                </div>
                <div className="text">LOADING</div>
            </div>
        </main>
    </div>)
}

export default Loader;