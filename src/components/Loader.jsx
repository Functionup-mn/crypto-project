import React from 'react'
import {ThreeCircles} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className=' flex items-center justify-center h-screen'>
      <ThreeCircles
  height="100"
  width="100"
  color="yellow"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
    </div>
  )
}

export default Loader
