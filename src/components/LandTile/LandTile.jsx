import './LandTile.css';
import getColorForRegion from "../../helper/getColorForRegion.js";

function LandTile({name, flag, population, region, subregion}) {
    return (
        <div className="land-tile">
            <div className="flag-and-name">
            <span className="image-flag-wrapper">
                <img className="image-flag" src={flag} alt="flag"/>
            </span>
                <h2 className={`name-in-${getColorForRegion(region, subregion)}`} >{name}</h2>
            </div>

            <p>Has a population of {population} people</p>

        </div>

    )
}

export default LandTile;