import Menu from "@/components/menu";
import Head from "next/head";
import { useState } from 'react';
//import partyChainContract from "../../contractInstances/partychain";
import web3 from "../../contractinstances/web3";

const Events = ({ eventos }) => {
  //const items = eventos.map((item, index) => {
  //  return (
  //    <div
  //      key={index}
  //      className="p-3 bg-sky-800 rounded-lg flex flex-col items-center"
  //    >
  //      <h1>{item[1]}</h1>
  //      <p>Id: {item[0]}</p>
  //      <p>Description: {item[3]}</p>
  //      <p>Location: {item[4]}</p>
  //      <p>Date: {item[5]}</p>
  //      <p>Price: {item[6]}</p>
  //      <p>Attendees: {item[8]}</p>
  //    </div>
  //  );
  //});

  //const toggleMenu = () => {
  //  var menu = document.getElementById("filter-menu");
  //  if (menu.style.display === "block") {
  //    menu.style.display = "none";
  //  } else {
  //    menu.style.display = "block";
  //  }
  //};

  
    const [selected, setSelected] = useState(null);
  
    const handleClick = (index) => {
      setSelected(index);
    };
  
    const handleClose = (event) => {
      setSelected(null);
      console.log('gg');
      event.stopPropagation();
    };  





  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="PartyChain" content="width=device-width, initial-scale=1" />
        <title>PartyChain | Events</title>
      </Head>
      <Menu />
      <section className="h-screen py-20 bg-white">
        <div className="w-full max-w-screen-2xl h-20 mx-auto px-20 flex items-center justify-between text-amber">
          <div className="m-2 p-2 w-20 rounded-full bg-amber text-white flex justify-center">
            Filter
          </div>
          <div className="flex justify-center">
            <input className="px-4 h-10 rounded-l-full bg-amber/25 focus:border-amber focus:border-2 focus:outline-none"></input>
            <button className="bg-amber text-white p-2 h-10 rounded-r-full hover:bg-fuchsia-900 active:bg-fuchsia-900/75">
              Search
            </button>
          </div>
            
        </div>

        <div className="py-10 text-white">
            <div className="flex justify-center py-6 text-fuchsia-900/75 text-3xl font-bold">Commodities Market</div>
                <div>
                    <div className="w-full mx-auto px-20 max-w-screen-2xl grid grid-cols-3 gap-5">
                    {[...Array(8)].map((_, index) => (
                        <div
                        key={index}
                        className={`p-3 h-20 bg-fuchsia-900/75 rounded-lg flex flex-row items-center ${
                            selected === index ? 'fixed w-full left-0 h-96 z-10 bg-fuchsia-900 flex justify-center' : ''
                        }`}
                        onClick={() => handleClick(index)}
                        >
                        {selected === index && (
                            <>
                                <div className="h-96 w-96 mr-6 bg-black/25 ">
                                    <div>Properties</div>
                                    
                                </div>
                                <div className="h-96 mx-6 py-6 flex flex-col justify-between">
                                    <button onClick={handleClose} className="bg-black/25 p-3 rounded-full">Close</button>
                                    <button className="bg-black/25 p-3 rounded-full">Interact</button>
                                </div>
                                
                            </>
                        )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

//export const getServerSideProps = async () => {
//  const instance = partyChainContract(web3);
//  const eventos = await instance.methods.getParties().call();
//
//  return { props: { eventos } };
//};

export default Events;