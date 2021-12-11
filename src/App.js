import Welcome from "./Components/Welcome";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import User from "./Components/User";
import NotExist from "./Components/NotExist";
import ResetPswdReq from "./Components/ResetPswdReq";
import './css/main.css'

import './img/fontello-1c92c5fc/css/fontello.css'
import Chat from "./Components/Chat";

function App(){

    const [logged,setLogged] = useState(false);
    const [user,setUser] = useState({farm_id:0,job_title:null});
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+"/api/get_user_data",{
            method: 'POST',
            headers: {'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {if(res.message !== 'Unauthenticated.' && res.message !== 'error') 
            if(res.data) {setLogged(true); setUser(res.data);} console.log(res.data); setLoading(false); console.log(res.data) })          
    },[logged])

    return(
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Welcome log={logged} setLog={setLogged}/>}/>
                <Route path="/rejestracja" component={() => <RegisterForm log={logged} setLog={setLogged}/>}/>                    
                <Route path="/logowanie" component={() => <LoginForm log={logged} setLog={setLogged}/>}/>
                <Route path='/resetowanieHasla' component={() => <ResetPswdReq log={logged} setLog={setLogged}/>}/>
                <Route path="/uzytkownik" exact component={() => <User log={logged} setLog={setLogged} content='' load={loading}/>}/>
                <Route path="/uzytkownik/zlecenia" component={() => <User log={logged} setLog={setLogged} content='myorders'/>} load={loading}/>
                <Route path='/uzytkownik/zlecenie/:id' component={() => <User log={logged} setLog={setLogged} content='myorder'/>} load={loading}/>
                <Route path="/uzytkownik/powiadomienia" component={() => <User log={logged} setLog={setLogged} content='note'/>}load={loading}/>
                <Route path='/gospodarstwo' exact component={() => <User log={logged} setLog={setLogged} content='farm' load={loading}/>}load={loading}/>
                <Route path='/kreatorGospodarstwa' component={() => <User log={logged} setLog={setLogged} content='creator'/>}load={loading}/>
                <Route path='/gospodarstwo/garaz' component={() => <User log={logged} setLog={setLogged} content='garage' farmId={user.farm_id}/>}load={loading}/>
                <Route path='/gospodarstwo/pojazd/:id' component={() => <User log={logged} setLog={setLogged} content='vehicle'/>}load={loading}/>
                <Route path='/gospodarstwo/sprzet/:id' component={() => <User log={logged} setLog={setLogged} content='machine'/>}load={loading}/>
                <Route path='/gospodarstwo/plony' component={() => <User log={logged} setLog={setLogged} content='crops'/>}load={loading}/>
                <Route path='/gospodarstwo/plon/:id' component={() => <User log={logged} setLog={setLogged} content='crop'/>}load={loading}/>
                <Route path='/gospodarstwo/srodkiChemiczne' component={() => <User log={logged} setLog={setLogged} content='chemicals'/>}load={loading}/>
                <Route path='/gospodarstwo/srodekChemiczny/:id' component={() => <User log={logged} setLog={setLogged} content='chemical'/>}load={loading}/>
                <Route path='/gospodarstwo/pracownicy' component={() => <User log={logged} setLog={setLogged} content='workers'/>}load={loading}/>
                <Route path='/gospodarstwo/pracownik/:id' component={() => <User log={logged} setLog={setLogged} content='worker'/>}load={loading}/>
                <Route path='/gospodarstwo/dzialki' component={() => <User log={logged} setLog={setLogged} content='plots'/>}load={loading}/>
                <Route path='/gospodarstwo/dzialka/:id' component={() => <User log={logged} setLog={setLogged} content='plot'/>}load={loading}/>
                <Route path='/gospodarstwo/zarzadzanie' component={() => <User log={logged} setLog={setLogged} content='manage'/>}load={loading}/>
                <Route path='/statystyki' component={() => <User log={logged} setLog={setLogged} content='stats'/>}load={loading}/>
                <Route path="/gospodarstwo/zlecenia" component={() => <User log={logged} setLog={setLogged} content='farmOrders'/>}load={loading}/>
                <Route path='/gospodarstwo/zlecenie/:id' component={() => <User log={logged} setLog={setLogged} content='farmOrder'/>}load={loading}/>
                <Route path='/czat' component={() => <Chat log={logged} setLog={setLogged} title={user.job_title} farmId={user.farm_id} 
                    loading={loading} id={user.id}/>}/>
                <Route component={() => <NotExist log={logged} setLog={setLogged}/>}/>
            </Switch>
        </Router>)
}


export default App;
