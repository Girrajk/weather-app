import React, { useState } from 'react';
import './Style.css';

function Weather() {

    const [cityName, setCityName] = useState('');
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    let changeHandler = (e) => {
        setCityName(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {

            if (!cityName.trim()) {
                setError('Please Enter city name ')
                setLoading(false);
            }
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=baad054bdfd442c0ba464914252001&&q=${cityName}`);
            if (!response.ok) {
                throw new Error('City Not Found, Please Enter a Correct City Name...');
            }
            let data = await response.json();
            console.log(data);
            if (data) {
                setWeatherDetails(data);
                setLoading('');
            }

        } catch (error) {
            setError(error.message || 'Something Went Wrong');
            console.log(error.message);
            setLoading(false);
        }

    }
    return (
        <div className='weather-container'>
            <h1>Weather Application </h1>
            <form onSubmit={submitHandler}>
                <input type="text"
                    id=""
                    placeholder='Enter Your City'
                    value={cityName}
                    onChange={changeHandler}
                />
                <button type='submit'>Get Weather Details </button>
            </form>

            {loading && <span cityName='loading'>Loading Weather Details...</span>}

            {error && <span cityName='error'>{error}</span>}
            {weatherDetails && (
                <div cityName='weather-details'>
                    <h2>{weatherDetails.location.name},{weatherDetails.location.region},{weatherDetails.current.condition.code},{weatherDetails.location.country}</h2>
                    <p>Temprature: <strong>{weatherDetails.current.temp_c}</strong> °C</p>
                    <p>Weather: {weatherDetails.current.condition.text}</p>
                    <img src={weatherDetails.current.condition.icon} alt="weatherDetails.current.condition.text" />
                    <p>Humidity: <strong>{weatherDetails.current.humidity}</strong>%</p>
                    <p>Wind Speed: <strong>{weatherDetails.current.wind_kph}</strong>kph</p>
                </div>
            )}
        </div>
    )
}

export default Weather;
