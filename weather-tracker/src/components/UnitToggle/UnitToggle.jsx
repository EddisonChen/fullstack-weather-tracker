import "./UnitToggle.scss";

const UnitToggle = (props) => {

    const {setUnitType, unitType, unitConverter} = props

    const handleToggleClick = () => {
        setUnitType(!unitType)
        console.log(unitType)
        unitConverter()
    }

    return (
        <div>
            <p>Imperial Units?</p>
            <label className="switch">
                <input type="checkbox" onClick={handleToggleClick}/>
                <span className="slider round"></span>
            </label>
        </div>
        
    )
}

export default UnitToggle;