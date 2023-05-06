import Link from 'next/link';
import Head from 'next/head';
import web3 from '../../contractinstances/web3';
import { useState } from 'react';


export default function Menu(){

    const [error, setError] = useState('');
    const [address, setAddress] = useState(null);
    const [partychainInstance, setPartyChainInstance] = useState(null);
    const [eventokenInstance, setEvenTokenInstance] = useState(null);


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
    
    return (
      <>
        <Head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <div className="w-full h-20 bg-main/75 absolute">
          <header className="w-full max-w-screen-2xl h-20 mx-auto px-20 flex items-center text-white">
            <div className="mr-20 text-3xl font-bold">
              <Link href="/">COMARKET</Link>
            </div>
            <div className="w-full flex items-center justify-between">
              <nav>
                <ul className="flex">
                  <li className="mx-6 px-3 py-1 rounded-lg transition hover:bg-amber/50">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="mx-6 px-3 py-1 rounded-lg transition hover:bg-amber/50">
                      <Link href="/market">Market</Link>
                  </li>
                  <li className="mx-6 px-3 py-1 rounded-lg transition hover:bg-amber/50">
                    <Link href="/sell">Sell Commodities</Link>
                  </li>
                  <li className="mx-6 px-3 py-1 rounded-lg transition hover:bg-amber/50">
                    <Link href="/option">Create Options</Link>
                  </li>
                  <li className="mx-6 px-3 py-1 rounded-lg transition hover:bg-amber/50">
                    <Link href="/negociations">Buy Options</Link>
                  </li>
                </ul>
              </nav>
              <div>
                <button
                  onClick={connectWalletHandler} className="w-32 h-10 bg-amber/75 text-dblue rounded-full hover:bg-amber"
                >
                  Connect
                </button>
              </div>
            </div>
          </header>
        </div>
      </>
    );
    
}

