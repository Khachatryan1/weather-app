import { useContext, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { WeatherContext } from "../utils/context"
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import styles from "../assets/styles/search.module.scss"

export const Search = () => {
    const { cityName, setCityName, 
            setUnit, getFiveDayWeatherForecast,
            getTodaysWeather, errorMassage, setErrorMassage} = useContext(WeatherContext)

    const [isButtonClickable, setIsButtonClickable] = useState(false)
    
    const celsius = 'metric'
    const fahrenheit = 'imperial'

    useEffect(() => {
        if (cityName.trim().length > 0) {
            setIsButtonClickable(true)
        } else {
            setIsButtonClickable(false)
        }
    }, [cityName])

    const getData = (unit: string) => {
        setUnit(unit)
        getTodaysWeather(cityName, unit)
        getFiveDayWeatherForecast(cityName, unit)
        setCityName('')
        setErrorMassage('')
    }


    const toggle = () => {
        const storedCityName = localStorage.getItem("cityName")
        const storedUnit = localStorage.getItem("unit")
        setErrorMassage('')

        let reverseUnit = storedUnit === 'metric' ? 'imperial' : 'metric'
        setUnit(reverseUnit)

        if (storedCityName && storedUnit) {
            getTodaysWeather(storedCityName, reverseUnit)
            getFiveDayWeatherForecast(storedCityName, reverseUnit)
        }  
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMassage('')
        setCityName(event.target.value);
    }

    const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            getData(celsius);
        }
    }

 
    return (
        <div className={styles.container}>
            {
                errorMassage ? <p className={styles.error}>{errorMassage}</p> : null 
            }
            <input className={styles.input} 
                type="text" value={cityName} 
                onChange={handleInputChange}
                onKeyDown={enterHandler}
                placeholder="Enter the city name"
            />
            <div className={styles.buttonContainer}>
                <button disabled={!isButtonClickable} tabIndex={0} onClick={() => getData(celsius)}><FaSearch /> °C</button>
                <button onClick={toggle}><FaArrowRightArrowLeft className={styles.toggle}/></button>
                <button disabled={!isButtonClickable} onClick={() => getData(fahrenheit)}><FaSearch /> °F</button>
            </div>
            
        </div>
    )
}