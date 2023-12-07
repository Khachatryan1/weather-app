export type ContextType = {
    cityName: string
    setCityName: React.Dispatch<React.SetStateAction<string>>
    unit: string
    setUnit: React.Dispatch<React.SetStateAction<string>>
    getTodaysWeather: (cityName: string, indicator: string) => void
    todaysWeather: TodaysWeatherType | null
    setTodaysWeather: React.Dispatch<React.SetStateAction<TodaysWeatherType | null>>
    countryName: CountryNameType | null
    setCountryName: React.Dispatch<React.SetStateAction<CountryNameType | null>>
    getDateTimeInfo: (timestamp: number | undefined) => DateTimeObject | null
    getWeatherByCoordinates: (coordinates: LocationType, indicator: string) => void
    location: LocationType | null
    setLocation: React.Dispatch<React.SetStateAction<LocationType | null>>
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    fiveDayForecast: TodaysWeatherType[] | null
    setFiveDayForecast: React.Dispatch<React.SetStateAction<TodaysWeatherType[] | null>>
    getFiveDayWeatherForecast: (cityName: string, indicator: string) => void
}

export type TodaysWeatherType = {
    dt: number
    dt_txt?: string
    coord: {
        lat: number
        lon: number
    }
    main: {
        feels_like: number
        temp: number
        pressure: number
        humidity: number
    }
    name: string
    sys: {
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    weather: {
        0: {
            main?: string
            description: string
            icon: string
        }
    }
    wind: {
        speed: number
    }
}

export type CountryNameType = {
    0: {
        name: {
            common: string 
        }
    }
}

export type DateTimeObject = {
    dayName: string
    monthName: string
    dayOfMonth: number
}

export type WeatherIcons = {
    [key: string]: string
}

export type LocationType = {
    latitude: number | undefined
    longitude: number | undefined
}