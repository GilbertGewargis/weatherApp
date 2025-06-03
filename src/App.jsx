import { useState, useEffect } from 'react';
import './app.css';
import { tempToHsl } from './tempToColour';

function App() {
  /* ------------ state ------------ */
  const [weather, setWeather]   = useState(null);    // null  → loading spinner
  const [inputCity, setInputCity] = useState('London'); // <input> text
  const [city, setCity]         = useState('London'); // triggers the fetch

  const API_KEY = '9b214bd4d3044403b2f150651250106';
  



  /* ------------ fetch when `city` changes ------------ */
  useEffect(() => {
    setWeather(null);                               // show "Loading…"
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setWeather({ error: data.error.message }); // invalid city etc.
        } else {
          setWeather(data);                          // success!
        }
      })
      .catch(() => {
        setWeather({ error: 'Network error – please try again.' });
      });
  }, [city]);

  /* ------------ helpers ------------ */
  const handleInputChange = e => setInputCity(e.target.value);

  const changeCity = () => {
    const trimmed = inputCity.trim();
    if (!trimmed) {
      setWeather({ error: 'City name cannot be empty.' });
      return;
    }

    // Capitalise every word: "new york" → "New York"
    const formatted = trimmed
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    setCity(formatted);
  };
  const cssVars =
  weather && !weather?.error      // A ⟵ only when we have valid data
    ? { '--tempColour': tempToHsl(weather.current.temp_c) }
    : {};
  
  /* ------------ UI ------------ */
  return (
  <div className="container1">
    {/* B ⟵ attach colour variable here */}
    <div className="Weather-App1" style={cssVars}>

      {/* Loading */}
      {weather === null && <h1>Loading…</h1>}

      {/* Error */}
      {weather?.error && <h1>Error: {weather.error}</h1>}

      {/* Weather */}
      {weather && !weather?.error && (
        <>
          <h1>Weather in {weather.location.name}</h1>
          <h2>Current: {weather.current.temp_c}°C</h2>
          <h3>Currnt Time: {weather.location.localtime}</h3>
        </>
      )}

      {/* Input + button always visible */}
      <input
        type="text"
        placeholder="Enter city"
        value={inputCity}
        onChange={handleInputChange}
        onKeyDown={e => e.key === 'Enter' && changeCity()}
      />
      <button onClick={changeCity}>Change</button>
      
    </div>
  </div>
  );
}

export default App;
