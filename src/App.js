import Welcome from "./Components/Welcome";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import User from "./Components/User";
import Zlecenia from "./Components/Zlecenia";
import NotExist from "./Components/NotExist";
import ResetPswdReq from "./Components/ResetPswdReq";
import Loader from "./Components/Loader";
import './css/main.css'

import './img/fontello-1c92c5fc/css/fontello.css'

function App(){

    const [logged,setLogged] = useState(false);
    const [user,setUser] = useState({farm_id:0});

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER+"/api/get_user_data",{
            method: 'POST',
            headers: {'Content-Type':'application/json',
            'X-Requested-With':'XMLHttpRequest'},
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {if(res.message !== 'Unauthenticated.' && res.message !== 'error') 
            if(res.data) {setLogged(true); setUser(res.data);} })          
    },[])

    return(
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Welcome log={logged} setLog={setLogged}/>}/>
                <Route path="/rejestracja" component={() => <RegisterForm log={logged} setLog={setLogged}/>}/>                    
                <Route path="/logowanie" component={() => <LoginForm log={logged} setLog={setLogged}/>}/>
                <Route path='/resetPassword' component={() => <ResetPswdReq log={logged} setLog={setLogged}/>}/>
                <Route path="/user" exact component={() => <User log={logged} setLog={setLogged} content=''/>}/>
                <Route path="/user/zlecenia" component={() => <User log={logged} setLog={setLogged} content='zlecenia'/>}/>
                <Route path="/user/powiadomienia" component={() => <User log={logged} setLog={setLogged} content='note'/>}/>
                <Route path='/gospodarstwo' exact component={() => <User log={logged} setLog={setLogged} content='farm'/>}/>
                <Route path='/kreatorGospodarstwa' component={() => <User log={logged} setLog={setLogged} content='creator'/>}/>
                <Route path='/gospodarstwo/garaz' component={() => <User log={logged} setLog={setLogged} content='garage' farmId={user.farm_id}/>}/>
                <Route path='/gospodarstwo/pojazd/:id' component={() => <User log={logged} setLog={setLogged} content='vehicle'/>}/>
                <Route path='/gospodarstwo/plony' component={() => <User log={logged} setLog={setLogged} content='crops'/>}/>
                <Route path='/gospodarstwo/srodkiChemiczne' component={() => <User log={logged} setLog={setLogged} content='chemicals'/>}/>
                <Route path='/gospodarstwo/pracownicy' component={() => <User log={logged} setLog={setLogged} content='workers'/>}/>
                <Route path='/gospodarstwo/dzialki' component={() => <User log={logged} setLog={setLogged} content='plot'/>}/>
                <Route path='/gospodarstwo/zarzadzanie' component={() => <User log={logged} setLog={setLogged} content='manage'/>}/>
                <Route path='/statystyki' component={() => <User log={logged} setLog={setLogged} content='stats'/>}/>
                <Route path="/zlecenia" component={() => <Zlecenia log={logged} setLog={setLogged}/>}/>
                <Route component={() => <NotExist log={logged} setLog={setLogged}/>}/>
            </Switch>
        </Router>)
}


export default App;
