import { useContext } from "react"
import { WeatherContext } from "../utils/context"
import styles from "../assets/styles/modalWindow.module.scss"

export const ModalWindow = () => {
    const { setShowModal, setLocation, location } = useContext(WeatherContext)

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { 
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    setLocation({ latitude, longitude })
                },
            )
        } 

        setShowModal(false)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>can i use your location ?</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleLocation}>YES</button>
                <button onClick={() => setShowModal(false)}>NO</button>
            </div>
        </div>
    )
}