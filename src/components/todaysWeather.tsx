import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "../utils/context"
import { WeatherIcons } from "../utils/types"
import sunrise from "../assets/images/sunrise.png"
import sunset from "../assets/images/sunset.png"
import clear from "../assets/images/clear.png"
import cloudy from "../assets/images/cloudy.png"
import rain from "../assets/images/rain.png"
import snow from "../assets/images/snow.png"
import fog from "../assets/images/fog.png"
import thunder from "../assets/images/thunder.png"
import styles from "../assets/styles/todaysWeater.module.scss"

export const TodaysWeather = () => {
    const {todaysWeather, countryName, unit, getDateTimeInfo} = useContext(WeatherContext)

    const date = getDateTimeInfo(todaysWeather?.dt)
    const weatherCode = todaysWeather?.weather[0].icon as string
    
    const weatherIcons: WeatherIcons = {
        "01n": clear,
        "02n": cloudy,
        "03n": cloudy,
        "04n": cloudy,
        "09n": rain,
        "10n": thunder,
        "11n": thunder,
        "13n": snow,
        "50n": fog,
        "01d": clear,
        "02d": cloudy,
        "03d": cloudy,
        "04d": cloudy,
        "09d": rain,
        "10d": thunder,
        "11d": thunder,
        "13d": snow,
        "50d": fog,
    }

    return (
        <div className={styles.container}>
            <div className={styles.dataDetailContainer}>
                <p className={styles.countryName}>{countryName?.[0].name.common}, {todaysWeather?.name}</p>
                <p className={styles.monthName}>{date?.monthName} {date?.dayOfMonth}</p>
                <p className={styles.dayName}>{date?.dayName}</p>
                <p className={styles.monthName}>{todaysWeather?.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
                <p className={styles.dayName}>{todaysWeather?.weather[0].description}</p>
            </div>
            <div className={styles.weatherIconContainer}>
                <img src={weatherIcons[weatherCode]} alt="weather icon" />
            </div>
            
            <div className={styles.weatherDetailContainer}>
                <p className={styles.weatherDetail}><span>Feels like</span> <span>{todaysWeather?.main.feels_like}{unit === 'metric' ? '°C' : '°F'}</span></p>
                <p className={styles.weatherDetail}><span>Wind</span> <span>{todaysWeather?.wind.speed}m/s</span></p>
                <p className={styles.weatherDetail}><span>Humidity</span> <span>{todaysWeather?.main.humidity}%</span></p>
                <p className={styles.weatherDetail}><span>Pressure</span> <span>{todaysWeather?.main.pressure}hPa</span></p>
            </div>
        </div>
    )
}