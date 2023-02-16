import "./SearchBar.scss"

const SearchBar = (props) => {

    const {handleSearchInput, cityName} = props;

    return (
        <div className="search_Bar">
            <input type="textbox"
                placeholder="City Name"
                onInput={handleSearchInput}
                value={cityName}
                className="search_box"
                ></input>
        </div>
    )
} 

export default SearchBar;