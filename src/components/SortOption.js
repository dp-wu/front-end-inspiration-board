const SortOption = ({cardData,onChange}) => {

    const dropdownChangeHandler = (event) => {
        onChange(event.target.value);
      }; 
    return (
            <select onChange={dropdownChangeHandler}> 
            <option value='id'>Sort by Id</option>
            <option value='message'>Sort by Message</option>
            <option value='likes'>Sort by Likes count</option>
            </select>
    );
}

export default SortOption;