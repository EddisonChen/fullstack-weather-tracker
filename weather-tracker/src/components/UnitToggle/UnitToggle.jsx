import "./UnitToggle.scss";
import {useState, useEffect} from "react";

const UnitToggle = (props) => {

    const {setUnitType, unitType, unitConverter} = props

    const handleToggleClick = () => {
        setUnitType(!unitType)
        console.log(unitType)
        unitConverter()
    }

    return (
        <div>
            <h2>Unit Switcher!</h2>
            <label className="switch">
                <input type="checkbox" onClick={handleToggleClick}/>
                <span className="slider round"></span>
            </label>
        </div>
        
    )
}

export default UnitToggle;