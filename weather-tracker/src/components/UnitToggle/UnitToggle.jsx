import "./UnitToggle.scss";

const UnitToggle = (props) => {

    const {setUnitType, unitType, unitConverter} = props;

    const handleToggleClick = () => {
        setUnitType(!unitType);
        console.log(unitType);
        unitConverter();
    }

    return (
        <div>
            <div className="toggle_button">
                <label className="switch">
                    <input type="checkbox" onClick={handleToggleClick}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        
    )
}

export default UnitToggle;