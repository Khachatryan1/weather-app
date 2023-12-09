import { useContext } from "react"
import { WeatherContext } from "../utils/context"
import styles from "../assets/styles/todaysWeater.module.scss"

export const TodaysWeather = () => {
    const {todaysWeather, countryName, setIcon, unit, getDateTimeInfo} = useContext(WeatherContext)

    const date = getDateTimeInfo(todaysWeather?.dt)
    const weatherCode = todaysWeather?.weather[0].icon as string


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
                <img src={setIcon(weatherCode)} alt="weather icon" />
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