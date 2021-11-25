import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import LogoImage from './../img/MyFarm.png';

const Navigation = (props) => {

    useEffect(()=>{
        slide();
    },[])

    let navElem;

    if(props.log === false)
        navElem = (<div className="links">
            <Link className='link' to='/rejestracja'>Rejestracja</Link>
            <Link className='link' to='/logowanie'>Logowanie</Link>
        </div>)
    else
        navElem = (<div className="links">
            {props.title !== null && props.title !== undefined && props.title !== 'Niezatrudniony' &&
                <span className='link' onClick={props.setContent && (() => {props.setContent('farmOrders');  
                    window.history.pushState(null,'MyFarm',`/gospodarstwo/zlecenia`);})}>
                    Zlecenia
                </span>}
                {props.title !== null && props.title !== undefined && props.title !== 'Niezatrudniony' ? 
                    <Link className='link' to='/czat'>Czat</Link> : <span className='link' onClick={props.setContent && (() => {
                    props.setContent('creator'); window.history.pushState(null,'MyFarm',`/kreatorGospodarstwa`);
                })}>
                    Kreator
                </span>
            }
            {props.title == null && props.title !== undefined }
            {/*<Link className='link' to='/user'>Profil</Link>*/}
        </div>)

//animations
    const slide = () => {
        //navigation animation
        const menu = document.querySelector('.menu');
        const links = document.querySelector('.links');
        const link = document.querySelectorAll('.link');

        menu.addEventListener('click', ()=>{
            links.classList.toggle('nav-active');
            link.forEach((l,index) => {
                if(!l.style.animation)
                    l.style.animation = `linksFade 0.5s ease forwards ${index/7 + 0.5}s`;
                else l.style.animation=''; 
            })
            menu.classList.toggle('active');
            if(dashmenu && dash){
                dash.classList.remove('dash-active');
                dashLinks.forEach(l => l.removeAttribute('style'));
                dashmenu.classList.remove('dashmenu-active');
            }
        })
        link.forEach(l => l.addEventListener('click',() =>{
            links.classList.remove('nav-active');
            menu.classList.remove('active');
            link.forEach(link => link.style.animation='');
        }));
        //dashboard animation
        const dashmenu = document.querySelector('.dashmenu');
        const dash = document.querySelector('.dash');
        const dashLinks = document.querySelectorAll('.dashLink');
        if(dash && dashmenu){
            dashmenu.addEventListener('click', () =>{
                dash.classList.toggle('dash-active');
                dashLinks.forEach((dL,index) =>{
                    if(!dL.style.animation)
                        dL.style.animation = `dashLinksFade 0.5s ease forwards ${index/7 + 0.5}s`;
                    else dL.style.animation=''; 
                })
                dashmenu.classList.toggle('dashmenu-active');
                links.classList.remove('nav-active');
                link.forEach(l => l.removeAttribute('style'));
                menu.classList.remove('active');
            })
            dashLinks.forEach(l => l.addEventListener('click',()=>{
                if(dashmenu && dash){
                    dashmenu.classList.remove('dashmenu-active');
                    dash.classList.remove('dash-active');
                    dashLinks.forEach(link => link.style.animation='');
                }
            }))
        }
        if(!dash && dashmenu)
            dashmenu.style.display='none';
    }

//return
    return(<nav>
        {props.log && <div className='dashmenu'>
            <div className='row1'></div>
            <div className='row2'></div>
            <div className='row3'></div>
        </div>}
        <div className="logo"><Link to="/uzytkownik"><img id='logo' src={LogoImage} alt='Logo'></img></Link></div>
        {navElem}
        <div className='menu'>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
        </div>
    </nav>)
}

export default Navigation;
