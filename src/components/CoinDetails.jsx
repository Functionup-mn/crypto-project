import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import Loader from "./Loader";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import { IoPulseOutline } from "react-icons/io5"
import CoinChart from "./CoinChart";

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('inr');
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const currencySymbol = currency === "inr" ? "₹ " : "$ ";
  const profit = coin.market_data?.price_change_percentage_24h > 0

  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}`);
        // console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoinDetails();
  }, [id]);


  return (
        <>
         {loading ? <Loader/> : <>
             <div className=" w-full m-auto flex flex-col justify-center sm:flex-col md:flex-row md:items-center">
                <div className=" w-[30%] ml-20 my-10 flex flex-col gap-3">
               <div className=' flex items-center gap-5'>
                <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" 
                        onClick={() => setCurrency('inr')}>INR</button>
                <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" 
                        onClick={() => setCurrency('usd')}>USD</button>
               </div>

               <div>{coin.last_updated}</div>

               <div className=" w-24 h-24 my-8">
                  <img src={coin.image.large} alt="/" />
               </div>

               <div className=" font-semibold">{coin.name}</div>
               <div className=" font-semibold">{currencySymbol} {coin.market_data.current_price[currency]}</div>
               <div className=" flex items-center gap-2 text-sm">{profit ? <BiSolidUpArrow className="text-green-500"/> 
                            : <BiSolidDownArrow className=" text-red-500"/>}
                            {coin.market_data.price_change_percentage_24h} %</div>
               <div className=" flex items-center gap-2 font-bold">{<IoPulseOutline size={25} className=" text-yellow-500"/>}#{coin.market_cap_rank}</div>
               <div className=" text-xs">
                <p>{coin.description['en'].split('.')[0]}</p>
               </div>
             </div>

             <div className=" w-full md:w-[60%] mt-5">
             <CoinChart currency = {currency}/>
          </div>
          </div>
         </>}  
        </>
  )
};

export default CoinDetails;
