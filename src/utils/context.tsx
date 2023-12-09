import { createContext, useState } from "react"
import { ContextType, CountryNameType, DateTimeObject, LocationType, TodaysWeatherType, WeatherIcons } from "./types"
import axios from "axios"
import clear from "../assets/images/clear.png"
import cloudy from "../assets/images/cloudy.png"
import rain from "../assets/images/rain.png"
import snow from "../assets/images/snow.png"
import fog from "../assets/images/fog.png"
import thunder from "../assets/images/thunder.png"
import { format, parseISO } from "date-fns"


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
    getFiveDayWeatherForecast: () => {},
    setIcon:  (iconCode: string) => iconCode,
    errorMassage: '',
    setErrorMassage: () => {}
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
    const [errorMassage, setErrorMassage] = useState('')

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
            .catch(() => setErrorMassage('invalid name'))  
    }
    

     
    const getDateTimeInfo = (timestamp: number | undefined): DateTimeObject | null => {
        if (typeof timestamp !== 'number') {
            return null
        }
    
        const date = parseISO(new Date(timestamp * 1000).toISOString())
    
        return {
            dayName: format(date, 'EEEE'),
            monthName: format(date, 'MMMM'),
            dayOfMonth: date.getDate(),
        }
    }

    const setIcon = (iconCode: string) => {
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

        return weatherIcons[iconCode]
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
        getFiveDayWeatherForecast,
        setIcon,
        errorMassage, 
        setErrorMassage
    }

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    )
}