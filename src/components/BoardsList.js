import Board from "./Board";

const BoardsList = ({boards, onSelect}) => {
    return(
        <section>
            <h2> BOARDS </h2>
            {boards.map((board)=>{
                return(
                    <Board 
                        key={board.id}
                        id={board.id}
                        title={board.title}
                        owner={board.owner}
                        status={board.status}
                        selected={board.selected}
                        onSelect={onSelect}
                    />
                );
            })
            }
        </section>
    );
};

export default BoardsList;