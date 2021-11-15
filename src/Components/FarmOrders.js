import React from "react";
import { AddFarmOrder } from "./Farm/AddFarmOrder";

const FarmOrders = (props) => {

    const infoHandler = (id) => {
        console.log('info clicked '+id);
        props.setContent('farmOrder');
        window.history.pushState({'id':id},'MyFarm',`/gospodarstwo/zlecenie/${id}`);
    }

    const addOrderHandler = () => {

    }

    return(<section className='data'>
        <div className='equipment-content'>
            <h3>Zlecenia</h3>
            <div id='garageMenu'>
                <div id='options'>
                <label><input type='checkbox' name='vehicleFilter' checked={true} />Przerwane</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Zakończone</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Przyjęte</label>
                <label><input type='checkbox' name='machineFilter' checked={true} />Wolne</label>
                </div>
                <div className='addButtons'>
                    <span className='addContent' onClick={addOrderHandler}>+Zlecenie</span>
                </div>
            </div>
            <div className='legend' id='ordersLegend'>
                <span>Nazwa</span>
                <span>Przewidywany czas rozpoczęcia</span>
                <span>Status</span>
            </div>
            <div id='orders'>
            <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przerwane</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Przyjęte</span>
                </div>
                <div className='mOrder unit' onClick={() => infoHandler(1)}>
                    <span>Nazwa zlecenia</span>
                    <span>Przewidywany czas rozpoczęcia</span>
                    <span>Zakończone</span>
                </div>
            </div>
            <AddFarmOrder/>
        </div>
    </section>)
}

export default FarmOrders;