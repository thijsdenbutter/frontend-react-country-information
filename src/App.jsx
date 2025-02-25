import './App.css';
import axios from 'axios';
import worldMap from './assets/world_map.png';
import {useState} from "react";
import LandTile from "./components/LandTile/LandTile.jsx";


function App() {

    const [lands, setLands] = useState([]);
    const [buttonIsClicked, toggleButtonIsClicked] = useState(false);
    const [landToSearch, setLandToSearch] = useState("");
    const [searchedLand, setSearchedLand] = useState({});

    async function handleSearchClick() {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${landToSearch}?fullText=true`);
            setLands([]);
            setSearchedLand(response.data);
            console.log(searchedLand);

        }
        catch (error) {
            console.error(error.message);
        }
    }

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

        } catch (error) {
            console.error(error.message);
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
                    onClick={handleClick}
                >
                    Klik mij!
                </button>) : (
                <div>
                    <h1>World Regions</h1>
                    <input
                        type="text"
                        value={landToSearch}
                        onChange={(e) => {setLandToSearch(e.target.value)}}
                        placeholder="Type in a country"
                    />
                    <button
                        type="button"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                    <div>

                    </div>
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
