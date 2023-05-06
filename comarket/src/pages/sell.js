import Menu from "../components/menu"
import React, { useState } from "react";
import web3 from '../../contractinstances/web3';
//import cotoken from '../../contracts/cotoken';


export default function party () {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(''); 
    
    
    const createEventHandller = async () => {
        
        //const instance = partyChainContract(web3);
        const address = await web3.eth.getAccounts()
        
        await instance.methods.createEvent(name, description, location, date, price).send({
            from: address[0]
        });
    }


    return(
        <>
            <Menu/>
            <section className="w-full h-screen bg-white flex justify-center items-center text-amber">
                <div className="w-1/2 h-2/3 bg-main/50 flex flex-col items-center rounded-xl shadow-2xl">
                    <h1 className="m-3">COMMODITIE</h1>
                    <fieldset id="form" className="flex  flex-col w-5/6">
                        <div className="flex flex-col m-2">
                            <label htmlFor="name">Name</label>
                            <input onChange={(e) => setName(e.target.value)} placeholder="ex: gold, rice, wheat..." id="name" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="location">Type</label>
                            <input onChange={(e) => setLocation(e.target.value)} placeholder="ex: ore, agrigultural, energy..." id="location" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="date">Unity</label>
                            <input onChange={(e) => setDate(e.target.value)} placeholder="ex: kilogram, killowatts, ounce..." id="date" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-row flex-wrap justify-between m-2">
                            <div className="flex flex-col w-3/6">
                                <label htmlFor="price">Number of units</label>
                                <input onChange={(e) => setPrice(e.target.value)} placeholder="n*unity" id="price" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                            </div>
                            <div className="flex flex-col w-2/6">
                                <label htmlFor="price">Price(BTGdol)</label>
                                <input onChange={(e) => setPrice(e.target.value)} placeholder="Price" id="price" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col m-2">
                            <label htmlFor="description">Company</label>
                            <input onChange={(e) => setDescription(e.target.value)} placeholder="Company Name" id="price" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col items-center m-2">
                            <button onClick={createEventHandller} className="bg-main/50 text-dblue w-1/3 rounded hover:bg-main/75 active:bg-main/50">Create</button>
                        </div>
                        
                    
                    </fieldset>
                </div>

            </section>
        </>
    )
}
