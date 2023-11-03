import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'
import Loader from './Loader'
import Header from './Header'
import { Link } from 'react-router-dom'
import { TfiSearch } from 'react-icons/tfi'

const Coins = () => {
    const [loading, setLoading] = useState(true)
    const [coins, setCoins] = useState('')
    const [currency, setCurrency] = useState('inr')
    const [search, setSearch] = useState('')

    const currencySymbol = currency === 'inr' ? '₹' : '$'
     

    useEffect(() => {
        const getCoinsData = async () => {
            const {data} = await axios.get(`${BaseUrl}/coins/markets?vs_currency=${currency}`)
            // console.log(data);
            setCoins(data)
            setLoading(false)
        }
        getCoinsData()
    },[])
  return (
    <>
      {
        loading ? Loader : <>
           <Header/>

           <div className=' w-60 h-8 fixed top-[6%] lg:top-[2.5%] left-[20%] md:left-[40%] flex justify-center items-center rounded-md gap-4 bg-gray-400 text-black'>
            <TfiSearch/>
            <input className=' outline-none bg-transparent placeholder:text-black' type="text" placeholder='Search your coin' 
               onChange={(e) => setSearch(e.target.value)}/>
           </div>

        <div className=' my-28'>
          <div className=" ml-52">
           <div className=' flex items-center gap-5'>
            <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" onClick={() => setCurrency('inr')}>INR</button>
            <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" onClick={() => setCurrency('usd')}>USD</button>
           </div>
            </div>
            {
                coins.filter((data) => {
                    if(data === ''){
                      return data
                    }else if(data.name.toLowerCase().includes(search.toLowerCase())){
                      return data
                    }
                }).map((item) => {
                    return(
                       <Link key={item.id} to={`/coins/${item.id}`}>
                        <div className=' flex items-center justify-evenly mt-5'>
                            <div className='w-12'>
                                <img  src={item.image} alt="/" />
                            </div>
                            <div className='w-12'>{item.name}</div>
                            <div className='w-12'>{currencySymbol}{item.current_price.toFixed(0)}</div>
                            <div className={`w-12 ${item.price_change_percentage_24h > 0 ? `text-green-500` : `text-red-500`}`}>
                              {item.price_change_percentage_24h > 0 
                              ? `+${item.price_change_percentage_24h.toFixed(2)}` 
                              : item.price_change_percentage_24h.toFixed(2)}
                            </div>
                        </div>
                       </Link>
                    )
                })
            }
           </div>
        </>
      }
    </>
  )
}

export default Coins
