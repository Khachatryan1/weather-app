import { createContext, useState } from "react"
import { ContextType, CountryNameType, DateTimeObject, LocationType, TodaysWeatherType } from "./types"
import axios from "axios"


export const WeatherContext = createContext<ContextType>({
    cityName: '',
    setCityName: () => {},
    unit: '',
    setUnit: () => {},
    getTodaysWeather: () => {},
    todaysWeather: null,
    setTodaysWeather: () => {},
    countryName: null,
    setCountryName: () => {},
    getDateTimeInfo: () => null,
    location: null,
    setLocation: () => {},
    showModal: true,
    setShowModal: () => {},
    getWeatherByCoordinates: () => {},
    fiveDayForecast: [],
    setFiveDayForecast: () => {},
    getFiveDayWeatherForecast: () => {}

})


export const WeatherContextWrapper = ({children}: { children: React.ReactNode }) => {
    const [cityName, setCityName] = useState('')
    const [unit, setUnit] = useState('')
    const [todaysWeather, setTodaysWeather] = useState<TodaysWeatherType | null>(null)
    const [countryName, setCountryName] = useState<CountryNameType | null>(null)
    const [location, setLocation] = useState<LocationType | null>(null);
    const [coordinates, setCoordinates] = useState<LocationType | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [fiveDayForecast, setFiveDayForecast] = useState<TodaysWeatherType[] | null>(null)

    const apiKey = "af59f415af5e5ff677e3c9a94264db8b"

    const getTodaysWeather = (cityName: string, indicator: string) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${indicator}`

        axios.get(apiUrl)
            .then(response => {
                setTodaysWeather(response.data)

                return axios
                    .get(`https://restcountries.com/v3.1/alpha/${response.data.sys.country}`)
                    .then(res => {
                        setCountryName(res.data)
                        
                        setCoordinates({latitude: todaysWeather?.coord.lat, longitude: todaysWeather?.coord.lon})

                        localStorage.setItem("cityName", response.data.name)
                        localStorage.setItem("unit", indicator)
                    })
            })
            .catch(() => {})
    }


    const getWeatherByCoordinates = (coordinates: LocationType, indicator: string) => {
        const { latitude, longitude } = coordinates

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${indicator}`
    
        axios.get(apiUrl)
            .then(response => {
                setTodaysWeather(response.data)
    
                return axios
                    .get(`https://restcountries.com/v3.1/alpha/${response.data.sys.country}`)
                    .then(res => {
                        setCountryName(res.data);
    
                        localStorage.setItem("cityName", response.data.name)
                        localStorage.setItem("unit", indicator)
                    })
            })
    }



    const getFiveDayWeatherForecast = (cityName: string, indicator: string) => {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=${indicator}`
        
        axios.get(forecastUrl)
            .then(response => {
                setFiveDayForecast(response.data.list);
            })
            .catch(err => console.log(err))  
    }
    

     
    const getDateTimeInfo = (timestamp: number | undefined): DateTimeObject | null => {
        if (typeof timestamp === 'number') {
            const date = new Date(timestamp * 1000)
    
            const monthNames = [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ]
            
            const dayNames = [
                "Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"
            ]

            const dayName = dayNames[date.getDay()]
            const monthName = monthNames[date.getMonth()]
            const dayOfMonth = date.getDate()
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
    
            return {
                dayName,
                monthName,
                dayOfMonth,
                hours,
                minutes,
            }

        } else {
            return null
        }
    }

 
    
    const contextValue: ContextType = {
        cityName,
        setCityName,
        unit, 
        setUnit,
        getTodaysWeather,
        todaysWeather,
        setTodaysWeather,
        countryName,
        setCountryName,
        getDateTimeInfo,
        location,
        setLocation,
        showModal,
        setShowModal,
        getWeatherByCoordinates,
        fiveDayForecast,
        setFiveDayForecast,
        getFiveDayWeatherForecast
    }

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    )
}