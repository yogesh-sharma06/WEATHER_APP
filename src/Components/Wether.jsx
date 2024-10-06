import bgimage from '../assets/bg-img2.jpg'
import { CiSearch } from "react-icons/ci";
import climage from '../assets/Weather02-512.webp'
import { MdWaves } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';

const Wether = () => {
  const [data, setData] = useState({})
  const [inputSea, setInputSea] = useState('jaipur')

  const inputSearch = useRef();

  useEffect( () => {
    const getData = async (city)=>{

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ade8cec87d41705743a20eae8eee0e1`)

      const datas = await response.json();

      console.log(datas);
      
      
      setData({
        city: datas.name,
        temp: Math.floor(datas.main.temp - 273.15),
        humidity : datas.main.humidity,
        windSpeed: datas.wind.speed,
      })
    }

    getData(inputSea);
    
  
  }, [inputSea])

  const searchData = ()=>{
    if(inputSearch.current.value){
      setInputSea(inputSearch.current.value);
      inputSearch.current.value = ''
    }
  }
  

  return (
   <>

    <main style={{"background-image":`url(${bgimage})`}}  className='w-full h-screen bg-no-repeat bg-cover p-3 text-white pt-5'>

    <div className='max-w-[400px] md:bg-black/10 md:backdrop-blur m-auto p-7 rounded-lg flex flex-col justify-center items-center gap-6'>
    <div className='flex items-center gap-2'>
        <input type='text' className='py-2 px-3 rounded-3xl outline-none text-gray-600 bg-white/90' placeholder='Enter Your Location' ref={inputSearch} onKeyDown={(e)=>{if(e.key === "Enter"){searchData()}}}/>
          <button className='bg-white/90 p-3 rounded-full' onClick={searchData}>
          <CiSearch className='text-black'/>
          </button>
    </div>
        <div className='py-1 w-16'>
        <img src={climage} className='w-full object-cover' />
        </div>
        <div className='text-center'>
          <span className='block text-6xl'>{data.temp}°c</span>
          <span className='text-2xl'>{data.city}</span>
        </div>
        <div className='w-full flex justify-around pt-3'>
          <div className='flex gap-1'>
          <MdWaves className='text-2xl'/>
          <div className='flex flex-col '>
            <span className='leading-none '>{data.humidity}%</span>
            <span className='text-[11px]'>Humidity</span>
          </div>
          </div>
          <div className='flex gap-1'>
          <FaWind className='text-2xl'/>
          <div className='flex flex-col '>
            <span className='leading-none '>{data.windSpeed} km/h</span>
            <span className='text-[11px]'>Wind Speed</span>
          </div>
          </div>
        </div>
    </div>
    </main>
   </>
  )
}

export default Wether