import { useContext, useEffect, useRef, useState } from "react"
import { Chart as ChartJS } from "chart.js/auto"
import { WeatherContext } from "../utils/context"
import styles from "../assets/styles/barChat.module.scss"


export const BarChart = () => {
    const { fiveDayForecast, unit } = useContext(WeatherContext)
    const chartRef = useRef<HTMLCanvasElement | null>(null)
  
    const [userData, setUserData] = useState({
        labels: [] as number[],
        datasets: [
            {
                label: `Temperature ${unit === 'metric' ? '°C' : '°F'}`,
                data: [] as number[],
                backgroundColor: [
                    "rgba(75, 192, 192, 1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
                
            },
        ],
    });
  
    useEffect(() => {
        const chartCanvas = chartRef.current;
        const chartInstance = chartCanvas && ChartJS.getChart(chartCanvas)

        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = chartCanvas?.getContext("2d")

        if (ctx && fiveDayForecast) {
                const forecast = fiveDayForecast.filter(
                    (day) => day.dt_txt?.split(" ")[1] === "15:00:00"
                );

                const chartData = {
                    labels: forecast.map((data) => data.main.temp) as number[],
                    datasets: [
                    {
                        ...userData.datasets[0],
                        data: forecast.map((data) => data.main.temp) as number[],
                        label: `Temperature ${unit === 'metric' ? '°C' : '°F'}`,
                    },
                ],
            };

            setUserData(chartData)

            new ChartJS(ctx, {
                type: "bar",
                data: chartData,
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: "white",
                                font: {
                                    size: 18,
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "white",
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        y: {
                            ticks: {
                                color: "white",
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [fiveDayForecast, unit])
  
    return (
        <div className={styles.container}>
          <canvas id="bar-chart" ref={chartRef} />
        </div>
    )
}