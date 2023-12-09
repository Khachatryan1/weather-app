import { useContext } from "react"
import { WeatherContext } from "../utils/context"
import styles from "../assets/styles/forecast.module.scss"

export const Forecast = () => {
    const {fiveDayForecast, getDateTimeInfo, setIcon, unit} = useContext(WeatherContext)

    const forecast = fiveDayForecast?.filter(day => day.dt_txt?.split(' ')[1] === '15:00:00')
    
    return (
        <div className={styles.container}>
            {
                forecast?.map((day) => {
                    const date = getDateTimeInfo(day.dt)
                    const weatherCode = day?.weather[0].icon as string;
                    return (
                        <div key={day.dt_txt} className={styles.dayContainer}>
                            <div className={styles.dayOfMonth}>
                                <p>{date?.dayName.substring(0, 3)}</p>
                                <p className={styles.day}>{date?.dayOfMonth}</p>
                            </div>
                            <div className={styles.imageContainer}>
                                <img src={setIcon(weatherCode)} alt="weather icon" />
                            </div>
                            <div className={styles.weather}>
                                <p>{day.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
                                <p className={styles.weatherMain}>{day?.weather[0].main}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}