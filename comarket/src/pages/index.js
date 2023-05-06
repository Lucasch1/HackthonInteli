import web3 from '../../contractinstances/web3';
import Head from 'next/head';
import { Inter } from 'next/font/google'
import Menu from '../components/menu'
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [error, setError] = useState('');
  const [parties, setParties] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState(null);
  const [partychainInstance, setPartyChainInstance] = useState(null);
  const [eventokenInstance, setEvenTokenInstance] = useState(null);
  const [partyId, setPartyId] = useState('');
  const [amount, setAmount] = useState('');
  const [partyChainAdress, setPartyChainAdress] = useState('');
  const [iAmIn, setiAmIn] = useState(null);
  const [partyIdd, setPartyIdd] = useState(0);

  useEffect(() => {
    if (partychainInstance) getPartiesHanddler()
  }, [partychainInstance]);

  const connectWalletHandler = async () => {  
    /* verificar se a metamask esta disponivel */
    try {
      /* pedir o wallet connect */
      await window.ethereum.request({ method: "eth_requestAccounts" })
      /* pegar a lista de contas */
      const accounts = await web3.eth.getAccounts()
      console.log(accounts);
      setAddress(accounts[0]);

      /* criar uma copia local dos contratos */
      const pc = partyChainContract(web3);
      const evnt = evenTokenContract(web3);
      setEvenTokenInstance(evnt);
      setPartyChainInstance(pc);
    } 
    catch(err) {
      setError(err.message);
    }
  }

  

  const getPartiesHanddler = async () => {
    const party = await partychainInstance.methods.getParties().call()
    setParties(party)
  }
  
  
  const createEventHandler = async () => {
    await partychainInstance.methods.createEvent(name, description, location, date, price).send({
      from: address
    });
  }

  
  const setPartyChainAdressHandler = async () => {
    await eventokenInstance.methods.setContractaddress(partyChainAdress).send({
      from: address
    });
  }
  
  const attendPartyHandler = async () => {
    await partychainInstance.methods.attendParty(partyId).send({
      from: address
    });
  }

  const approvePartyChainHandler = async () => {
    await eventokenInstance.methods.aprovePartyChain(amount).send({
      from:address
    });
  }

  const amiinthePartyHandler = async () => {
    const In = await partychainInstance.methods.amIntheParty(partyIdd).call({
      from: address
    });
    setiAmIn(In);
  };

  return (
    <>
      <Menu/>
      <section className="h-screen w-full bg-white">
        <div>
          <h1>PartyChain Test Page</h1>
        </div>
        <div className='my-2'>
          <h3>Here are some simple buttons that can call some functions of the contracts</h3>
        </div>
        <button onClick={connectWalletHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Connect</button>
        <section className='w '>
          <p className='text-yellow-300  '>
            Those are all the events created: {parties}
          </p>
        </section>
        <section>
          <div>
            <label>Create Event</label>
            <div>
              <input onChange={(e) => setName(e.target.value)} placeholder='Enter the name' className='text-black'/> 
              <input onChange={(e) => setDescription(e.target.value)} placeholder='Enter the description' className='text-black'/>
              <input onChange={(e) => setLocation(e.target.value)} placeholder='Enter the location' className='text-black'/>
              <input onChange={(e) => setDate(e.target.value)} placeholder='Enter the date' className='text-black'/>
              <input onChange={(e) => setPrice(e.target.value)} placeholder='Enter the price' className='text-black'/>
            </div>
          </div>

          <button onClick={createEventHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Create Event</button>
        </section>

        <section>
          <div>
            <label>Set PartyChain address on EvenToken (Only Owner)</label>
            <div>
              <input onChange={(e) => setPartyChainAdress(e.target.value)} placeholder='Enter the PartyChain adress' className='text-black'/> 
            </div>
          </div>

          <button onClick={setPartyChainAdressHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Set PartyChain Address</button>
        </section>



        <section>
          <div>
            <label>Aprove PartyChain</label>
            <div>
              <input onChange={(e) => setAmount(e.target.value)} placeholder='Enter the amount (EVNT)' className='text-black' /> 
            </div>
          </div>

          <button onClick={approvePartyChainHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Aprove PartyChain</button>
        </section>

        <section>
          <div>
            <label>Attend Party</label>
            <div>
              <input onChange={(e) => setPartyId(e.target.value)} placeholder='Enter the party ID' className='text-black' /> 
            </div>
          </div>

          <button onClick={attendPartyHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Attend Party</button>
        </section>


        <section>
          <div>
            <label>Am i in the Party?</label>
            <div>
              <input onChange={(e) => setPartyIdd(e.target.value)} placeholder='Enter the party ID' className='text-black'/> 
            </div>
          </div>

          <button onClick={amiinthePartyHandler} className='bg-green-500 border-solid border-gray-500 border my-1 px-1 py-1 text-center rounded hover:bg-gray-400  '>Am i in?</button>
          <section>
            {iAmIn ? (
              <p>At the party: {partyIdd}!</p>
            ) : (
              <p>Sorry, you're not at the party.</p>
            )}
          </section>
        </section>
        
        <section>
          <p>{error}</p>
        </section>
      </section>
    </>
   
  )
}
