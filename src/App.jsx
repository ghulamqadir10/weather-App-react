import { useState, useRef } from "react";
import axios from "axios";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css';

function WeatherApp() {
  const [cities, setCities] = useState([]);
  const [weatherArr, setWeatherArr] = useState([]);
  let appId = "71819b21d0c34a92ad2131710240509";
  let city = useRef(null);

  function getWeather(e) {
    e.preventDefault();
    const currentCity = city.current.value;
    console.log(currentCity)
    if (cities.includes(currentCity)) {
      alert("city already searched");
      return;
    }
    cities.push(currentCity);
    setCities([...cities]);
    axios(
      `https://api.weatherapi.com/v1/current.json?key=${appId}&q=${currentCity}&aqi=yes`
    )
      .then((res) => {
        weatherArr.unshift(res.data);
        setWeatherArr([...weatherArr]);
        console.log(weatherArr);
      })
      .catch((err) => {
        alert("city not correct input a correct city");
        console.log(err);
      });
    city.current.value = "";
  }

  return (
    <>
      <div 
        className="navbar bg-black text-neutral-content text-2xl"
        style={{ display: `flex`, justifyContent: `center` }}
      >
        <button
          className="btn btn-ghost text-ye-xl"
          style={{
            color: `white`,
            textDecoration: `underline`,
            padding: `10px`,
          }}
        >
          Weather App
        </button>
      </div>
      
        
      <div className="m-20" style={{ border: `2px solid black`,borderRadius: `30px`, textAlign: `center`,boxShadow: `14px 13px 20px grey`, marginTop: `70px`, padding: `20px`}}>
        <h1 className="text-xl p-4 " style={{textDecoration: `underline`, fontSize: `30px` ,textShadow: `8px 8px 8px grey`}}><strong>weather Update</strong></h1>
        <div>
          {/* by putting input and button form and give onsubmit event with function just press enter in keyboard and value will get   */}
        <form onSubmit={getWeather}>
          <input
          // value={currentCity}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs p-2 m-2"
          ref={city}
          />
          <button className="btn btn-outline btn-neutral  btn-md">Search</button>
          </form>
        </div>
{/* map functionality */}
{ weatherArr.map((weather,index) =>{
  const {
    location: {name,country,region,tz_id},
    current: {feelslike_c,feelslike_f,wind_kph,
      condition: {code}
    }
  }=weather;
  return (
    <div key={index} className="m-8" style={{border: `2px solid black`, borderRadius: `30px`, padding: `10px`}}>
    <h1><strong> (location) </strong></h1>
    <h1><strong><i> City: </i></strong> { name}</h1>
    <h1><strong> Country: </strong>{country}</h1>
    <h1><strong> Region: </strong>{region}</h1>
    <h1><strong> Continent: </strong>{tz_id}</h1>
    <h1><strong> Feellike celcius: </strong>{feelslike_c}</h1>
    <h1><strong> Feellike ferranite: </strong>{feelslike_f}</h1>
    <h1><strong> wind Kph: </strong>{wind_kph}</h1>
    <h1><strong> Code: </strong>{code}</h1>
  </div>

)

}
) }



{/* before map functionality */}
</div>
</>
 );
}

export default WeatherApp;
