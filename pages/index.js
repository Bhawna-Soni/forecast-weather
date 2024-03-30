import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import AddLocationIcon from '@mui/icons-material/AddLocation';

// Parent component
export default function WeatherDashboard() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiKey = "15c3d7fce836d8f48ce0d978028c9f06";

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleClick = () => {
    if (location === "") {
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      )
      .then((res) => {
        console.log("res", res.data);
        setWeatherData(res.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="weather-dashboard">
          <div className="m-4 ">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="weather-heading">Weather Forecast</h1>
              <input
                type="text"
                className="form-control w-25 my-4"
                onChange={handleChange}
                value={location}
              />
              <button className="py-2 get-weather-btn" onClick={handleClick}>
                Get weather
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="d-flex justify-between">
          <Modal.Title>
          
              <div className="">{weatherData?.name??""}</div>
           
           
          </Modal.Title>
          <div className="d-block">
          <AddLocationIcon />
          <div className="">{weatherData?.sys?.country??""}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {weatherData && (
            <div>
              <p>Location: {weatherData.name}</p>
              <p>Temperature: {weatherData.main.temp}</p>
              {/* Add more weather information here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
