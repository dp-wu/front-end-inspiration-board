const Board = ({id, title, owner, status, selected, onSelect}) => {
    const selectBoardHandler = () => {
        onSelect(id);
    }
    return (          
        <button onClick={selectBoardHandler}>{title}</button>
    );
};

export default Board;