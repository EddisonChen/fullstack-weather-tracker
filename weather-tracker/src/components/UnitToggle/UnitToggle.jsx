import "./UnitToggle.scss";

const UnitToggle = (props) => {

    const {setUnitType, unitType} = props;

    const handleToggleClick = () => {
        setUnitType(!unitType);
    }

    return (
        <div className="toggle_button">
            <label className="switch">
                <input type="checkbox" onClick={handleToggleClick}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default UnitToggle;