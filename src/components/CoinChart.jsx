import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'
import { useParams } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import Loader from './Loader';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const CoinChart = ({currency}) => {
    const [chartData, setChartData] = useState([])
    const [days, setDays] = useState(1)
    const {id} = useParams()

    useEffect(() => {
        const getChartData = async () => {
             try {
                const {data} = await axios.get(`${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
                // console.log(data);
                setChartData(data.prices);
             } catch (error) {
                console.log(error);
             }
        }
        getChartData()
    },[currency, id, days])
        

    // The key of myData object should be like this only
    const MyData = {
        labels: chartData.map((value) => {
            // console.log(value );
            const date = new Date(value[0])
            const time = date.getHours() > 12 
            ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
            : `${date.getHours()} : ${date.getMinutes()} AM`

            return days === 1 ? time : date.toLocaleDateString()
        }),
          datasets: [
            {
                label: `Price in Past Days ${days} in ${currency}`, 
                data: chartData.map((value) => value[1]),
                borderColor: `orange`,
                borderWidth: '0.5'
            }
]
    }

  return (
    <>
      {
        chartData.length === 0 ? (<Loader/>) : (
            <div>
            <Line className=' cursor-pointer' data={MyData} options={{
                elements: {
                    point: {
                        radius: 1
                    }
                }
            }}/>
        
        <div className=' flex items-center gap-5 py-3'>
                <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" 
                        onClick={() => setDays(1)}>24 Hourse</button>
                <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" 
                        onClick={() => setDays(30)}> 1 Month</button>
                <button className=" bg-yellow-600 font-semibold rounded-lg text-black px-4 py-1" 
                        onClick={() => setDays(365)}> 1 Year</button>        
                </div>
        </div>
        )
      }
    </>
  )
}

export default CoinChart
