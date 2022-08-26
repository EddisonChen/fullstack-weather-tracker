import "./SingleCity.scss";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId} = props;

    const handleCityCardClick = () => {
        setCityId(id)
        console.log(id)
    }

    return (
        <div onClick={handleCityCardClick}>
            <p>{name}</p>
            <p>{state}</p>
            <p>{country}</p>
            <p>{id}</p>
        </div>
    )
}

export default SingleCity;