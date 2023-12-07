import { useContext } from "react"
import { WeatherContext } from "../utils/context"
import { WeatherIcons } from "../utils/types"
import clear from "../assets/images/clear.png"
import cloudy from "../assets/images/cloudy.png"
import rain from "../assets/images/rain.png"
import snow from "../assets/images/snow.png"
import fog from "../assets/images/fog.png"
import thunder from "../assets/images/thunder.png"
import styles from "../assets/styles/forecast.module.scss"

export const Forecast = () => {
    const {fiveDayForecast, getDateTimeInfo, unit} = useContext(WeatherContext)

    const forecast = fiveDayForecast?.filter(day => day.dt_txt?.split(' ')[1] === '15:00:00')

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
            {
                forecast?.map((day) => {
                    const date = getDateTimeInfo(day.dt)
                    const weatherCode = day?.weather[0].icon as string;
                    return (
                        <div key={day.dt_txt} className={styles.dayContainer}>
                            <div className={styles.day}>
                                <p>{date?.dayName.substring(0, 3)}</p>
                                <p>{date?.dayOfMonth}</p>
                            </div>
                            <div className={styles.imageContainer}>
                                <img src={weatherIcons[weatherCode]} alt="weather icon" />
                            </div>
                            <div className={styles.weather}>
                                <p>{day.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
                                <p>{day?.weather[0].main}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}