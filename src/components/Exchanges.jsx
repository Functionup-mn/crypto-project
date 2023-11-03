import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { BaseUrl } from '../BaseUrl'
import Loader from './Loader'
import OurModel from './OurModel'

const Exchanges = () => {
    const [loadig, setLoading] = useState(true)
    const [exchanges, setExchanges] = useState('')

    useEffect(()=> {
        const getExchagesCoins = async () =>{
            const {data} = await axios.get(`${BaseUrl}/exchanges`)
            // console.log(data);
            setExchanges(data)
            setLoading(false)
        }
        getExchagesCoins()
    },[])
  return (
    <>
      
      <div>
        {
            loadig ? <Loader/> : <>
             <Header/>
             <OurModel/>
             <div className=' mt-20'>
                {
                    exchanges.map((item) => {
                        return(
                            <div key={item.id} className=' flex items-center justify-evenly mt-5'>
                                <div>
                                    <img height={20} src={item.image} alt="/" />
                                </div>
                                <div className=' w-5'>{item.name}</div>
                                <div>{item.trade_volume_24h_btc.toFixed(0)}</div>
                                <div>{item.trust_score_rank}</div>
                            </div>
                        )
                    })
                }
             </div>
            </>
        }
      </div>
    </>
  )
}

export default Exchanges
