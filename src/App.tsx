import { useContext, useEffect } from "react"
import { Search } from "./components/search"
import { WeatherContext } from "./utils/context"
import { TodaysWeather } from "./components/todaysWeather"
import { ModalWindow } from "./components/modalWindow"
import { Forecast } from "./components/forecast"
import { BarChart } from "./components/barChart"
import styles from "./assets/styles/app.module.scss"

function App() {
    const { showModal, getTodaysWeather, 
            getFiveDayWeatherForecast, getWeatherByCoordinates, 
            location, setUnit } = useContext(WeatherContext)

    useEffect(() => {
        const storedCityName = localStorage.getItem("cityName")
        const storedUnit = localStorage.getItem("unit")
        
        if (location?.latitude !== undefined && location?.longitude !== undefined) {
            setUnit('metric')
            getWeatherByCoordinates(location, 'metric')
            getFiveDayWeatherForecast(storedCityName as string, 'metric')
        } else if (storedCityName && storedUnit) {
            setUnit(storedUnit)
            getTodaysWeather(storedCityName, storedUnit)
            getFiveDayWeatherForecast(storedCityName, storedUnit)
        } else {
            setUnit('metric')
            getTodaysWeather('Tokyo', 'metric')
            getFiveDayWeatherForecast('Tokyo', 'metric')
        }
    }, [location])

    return (
        <>
            {
                showModal ? <ModalWindow/> : 
                <div className={styles.wrapper}>
                    <Search/>
                    <TodaysWeather/>
                    <Forecast/>
                    <BarChart/>
                </div>
            }
        </>
    );
}

export default App;