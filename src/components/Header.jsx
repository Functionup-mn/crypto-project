import React from 'react'
import {FaEthereum} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className=' flex items-center justify-evenly h-14 w-full fixed top-0 bg-slate-900'>
      <div className=' flex items-center gap-2'>
        <p className=' text-2xl font-bold'>CryptoVerse</p>
        <FaEthereum className="text-yellow-500"/>
        </div> 
        <ul className=' flex items-center gap-20'>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/coins'}>Coins</Link></li>
        </ul>
    </div>
  )
}

export default Header
