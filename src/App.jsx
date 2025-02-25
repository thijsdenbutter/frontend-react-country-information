import './App.css';
import axios from 'axios';
import worldMap from './assets/world_map.png';
import {useState} from "react";
import LandTile from "./components/LandTile/LandTile.jsx";


function App() {

    const [lands, setLands] = useState([]);
    const [buttonIsClicked, toggleButtonIsClicked] = useState(false);

    async function handleClick() {
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            const allLands = response.data.map((land) => ({
                name: land.name.common,
                flag: land.flags.svg,
                population: land.population,
                region: land.region,
                subregion: land.subregion,
            }))
            allLands.sort((a, b) => a.population - b.population);

            setLands(allLands);

        } catch (e) {
            console.error(e);
        } finally {
            toggleButtonIsClicked(true);
        }

    }

    return (
        <main>
            <span className="image-world-map-wrapper">
                <img className="image-world-map" src={worldMap} alt="World map"/>
            </span>
            {!buttonIsClicked ? (
                <button
                    type={"button"}
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Klik mij!
                </button>) : (
                <div>
                    <h1>World Regions</h1>
                    <ul>
                        {lands.map((land, index) => (
                            <li key={index}>
                                <LandTile
                                    name={land.name}
                                    flag={land.flag}
                                    population={land.population}
                                    region={land.region}
                                    subregion={land.subregion}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    )
}

export default App
