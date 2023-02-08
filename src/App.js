
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import DUMMY_BOARDS from "../src/data/boards.json"
import DUMMY_CARDS from "../src/data/cards.json"
import NewBoardForm from './components/NewBoardForm';
import BoardsList from "./components/BoardsList";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import CreateNewCard from './components/CreateNewCard';

const kBaseUrl = "http://127.0.0.1:5000";

const transformCardResponse = (card) => {
  const {
    id,
    message,
    likes_count: likesCount,
    board_id: boardId,
    status,
  } = card;
  return { id, message, likesCount, boardId, status };
}

const INIT_BOARDS = DUMMY_BOARDS;
const INIT_CARDS = DUMMY_CARDS.map(card=> transformCardResponse(card))

const getAllBoards = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return INIT_BOARDS //this will be deleted after connecting with Back-end
    });
};

const getCardsForSelectedBoard = (id) => {
  return axios
    .get(`${kBaseUrl}/boards/${id}/cards`)
    .then((response) => {
      return response.data.map(transformCardResponse);
    })
    .catch((error) => {
      console.log(error);
      return INIT_CARDS.filter(card => card.boardId === id)
    });
};

function App() {
  const [cardData, setCardData] = useState(INIT_CARDS);
  const [boardsList, setBoardList] = useState(INIT_BOARDS);

  // const updateCardData = (id) => {
  //   likeCardWithId(id).then((updatedCard) => {
  //     setCardState((oldData) => {
  //       return oldData.map((card) => {
  //         if (card.id === id) {
  //           return updatedCard;
  //         }
  //         return card;
  //       });
  //     });
  //   });
  // };

  const fetchBoards = () => {
    getAllBoards().then((boards) => {
      setBoardList(boards);
    });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchCards = (id) => {
    getCardsForSelectedBoard(id).then((cards) => {
      setCardData(cards);      
    })
  }
  

  const handleUpdatedBoard = (newBoard) => {
    // POST 
    const newBoardsList = [...boardsList]
    newBoardsList.push({...newBoard, id:boardsList.length + 1})
    setBoardList(newBoardsList);
  }
  
  const onUpdateLike = (updatedCard) => {
    const updatedCards = cardData.map((card) => {
      if ((card.id === updatedCard.id)){
        return updatedCard;
      } else {
        return card;
      }
      })
    setCardData(updatedCards);
  };

  const onRemove = (updatedCard) => {
    const cards = cardData.map((card) => {
      if ((card.id === updatedCard.id)) {
        return updatedCard;
      } else {
        return card;
      }
    });      
    setCardData(cards);
  };

  let selectedBoard;
  
  const HandleSelectedBoard = (id) => {
    const updatedBoards = boardsList.map((board)=> { 
      const updatedBoard = {...board}
      if (board.id === id) {
        updatedBoard.selected = true;
        selectedBoard = board;
      } else {
        updatedBoard.selected = false;
      }
      return updatedBoard;
    })
    setBoardList(updatedBoards);
    fetchCards(id);
    }

      
  for(const board of boardsList){ 
    if (board.selected) {
      selectedBoard = board;
    }
  }

  const handleUpdatedCard = (newCard) => {
    console.log(newCard);
    
    if (!selectedBoard) {
      console.log('No board selected');
      return;
    }
    
    const requestBody = {
      ...newCard,
      // likes_count: 0,
      board_id: selectedBoard.id,
      status: true,
    };
  
    console.log(requestBody);
    return axios
      .post(`${kBaseUrl}/boards/${requestBody.board_id}/cards`,
      {
        message: requestBody.message,
        board_id: requestBody.board_id,
        status: true,
      })
      .then((response) => {
        console.log(requestBody);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  
  };

  return (
    <div className="App">
      <main>
        <BoardsList boards={boardsList} onSelect={HandleSelectedBoard}/>
          <div>
            <h3>{!selectedBoard?'':`${selectedBoard.title}`}</h3>
            {/* <h3>{!selectedBoard?'':`${selectedBoard.title} created by ${selectedBoard.owner}`}</h3> */}
            <CardsForSelectedBoard
              cardData={selectedBoard? cardData:[]}
              onUpdateLike={onUpdateLike}
              onRemove={onRemove}
            />
          </div>
        <NewBoardForm onBoardUpdate={handleUpdatedBoard}/>
        <CreateNewCard onCardUpdate={handleUpdatedCard}/>
        </main>
      </div>
  );
}

export default App;
