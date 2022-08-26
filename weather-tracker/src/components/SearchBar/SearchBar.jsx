import "./SearchBar.scss"

const SearchBar = (props) => {

    const {handleSearchInput, cityName} = props;

    return (
        <input type="textbox"
                placeholder="City Name"
                onInput={handleSearchInput}
                value={cityName}></input>
    )
} 

export default SearchBar;