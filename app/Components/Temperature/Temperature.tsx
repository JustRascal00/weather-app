"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, rain, snow } from '@/app/utils/Icons';
import { KelvinToCelsius } from '@/app/utils/misc';
import React, { useState } from 'react'

function Temperature() {
    const { forecast } = useGlobalContext();
    
    const { main, timezone, name, weather } = forecast;

    
    if (!forecast || !weather) {
        return <div>Loading...</div>
    }

    const temp = KelvinToCelsius(main?.temp)
    const minTemp = KelvinToCelsius(main?.temp_min);
    const maxTemp = KelvinToCelsius(main?.temp_max);

    //State

    const [localTime, setLocalTime ] = useState<string>("");
    const [currentDay, setCurrentDay ] = useState<string>("");

    const {main: weatherMain, description} = (weather[0])

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default :
            return clearSky;
        }
    };

  return (
    <div className='pt-5 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
        <p className='flex justify-between items-center'>
            <span className='font-medium'>{currentDay}</span>
            <span className='font-medium'>{localTime}</span>
        </p>
    </div>
  )
}

export default Temperature