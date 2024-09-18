"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/Icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function Temperature() {
    const { forecast } = useGlobalContext();

    const { main, timezone, name, weather } = forecast || {};

    // // Debugging: log forecast data
    // React.useEffect(() => {
    //     console.log("Forecast Data:", forecast);
    // }, [forecast]);

    if (!forecast || !weather) {
        return <div>Loading...</div>;
    }

    // Use temperatures directly from API
    const temp = main?.temp || 0;
    const minTemp = main?.temp_min || 0;
    const maxTemp = main?.temp_max || 0;

    //state
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    const { main: weatherMain, description } = weather[0] || {};

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default:
                return clearSky;
        }
    };


    // Live 
    useEffect(() => {
        const interval = setInterval(() => {
           const localMoment = moment().utcOffset(timezone / 60)
           
           const formatedTime = localMoment.format("HH:mm:ss")

           const day = localMoment.format("dddd")

           setLocalTime(formatedTime);
           setCurrentDay(day);
        }, 1000);
    }, [])

    return (
        <div className='pt-5 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <p className='flex justify-between items-center'>
                <span className='font-medium'>{currentDay}</span>
                <span className='font-medium'>{localTime}</span>
            </p>
            <p className='pt-2 font-bold flex gap-1'>
                <span>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className='py-10 text-9xl font-bold self-center'>
                {temp}°
            </p>
            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                </div>
                <p className='flex items-center gap-2'>
                    <span>Low: {minTemp}°</span>
                    <span>High: {maxTemp}°</span>
                </p>
            </div>
        </div>
    );
}

export default Temperature;
