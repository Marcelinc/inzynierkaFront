import React, { useEffect, useState } from 'react';

const WorkerChangeJob = (props) => {
    const [worker_id,setId] = useState(props.id);
    const [farm_id,setFarm] = useState(props.farm);
    const [job_title_id,setTitle] = useState(1);

    const [loading,setLoading] = useState(true);
    const [titles,setTitles] = useState([]);
    const [titleName,setName] = useState('');

    const [actualTitle,setActual] = useState(props.actualTitle);

    useEffect(() => {
        getTitles();
    },[])

    const getTitles = () => {
        fetch(process.env.REACT_APP_SERVER+'/api/lookup-table/getJobTitle',{
            headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
            credentials:'include'
        })
        .then(response => response.json())
        .then(res => {console.log(res); 
            if(res.message === 'Success'){
                setLoading(false)
                setTitles(res.data)
            }})
        .catch(err => console.log(err))
    }

    const changeTitle = () => {
        let name = titles.filter(t => t.id === parseInt(job_title_id));
        if(name[0].title != actualTitle){
            document.querySelector('#changeTitleInfo').innerHTML='Przetwarzanie...'
            fetch(process.env.REACT_APP_SERVER+'/api/farm/set-worker-job-title',{
                method:'POST',
                headers: {'Content-Type':'application/json',
                    'Accept':'application/json'},
                body:JSON.stringify({worker_id,farm_id,job_title_id}),
                credentials:'include'
            })
            .then(response => response.json())
            .then(res => {console.log(res); 
                if(res.message === 'Success'){
                    let worker = props.worker;
                    worker.job_title=name[0].title;
                    props.setWorker(worker);
                    props.setMode(); 
                }})
            .catch(err => {console.log(err); document.querySelector('#changeTitleInfo').innerHTML='Błąd podczas wproowadzania zmian!'});
        } else document.querySelector('#changeTitleInfo').innerHTML='Pracownik jest już na wybranym stanowisku'
        
    }

    return(<div className='popup'>
        <div className='popupGarageEdit'>
            {loading ? <p>Ładowanie...</p> : <div>
                <p>Wybierz stanowisko:</p>       
                <section className='popupForm2'>
                    <form className='changeForm'>
                        <select onChange={e => setTitle(e.target.value)}>
                            {titles.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                    </form>
                    <section className='vehicle-actions'>
                        <button onClick={changeTitle}>Zapisz</button>
                        <button onClick={() => props.setMode(false)}>Anuluj</button>
                        <h3 className='info' id='changeTitleInfo'></h3>
                    </section>
                </section>
            </div>}
        </div>
    </div>)
}

export default WorkerChangeJob;