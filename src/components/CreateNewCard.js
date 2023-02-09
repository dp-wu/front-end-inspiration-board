import React, { useState, useRef } from 'react';
import './CreateNewCard.css';

const defaultCardData = {
  message: '',
};

const CreateNewCard = ( {onCardUpdate }) => {
  const [cardData, setCardData] = useState(defaultCardData);
  const {message} = cardData
  const inputMessage = useRef()

  const onChange = (e) => {
    const {name, value} = e.target;
    setCardData({
      ...cardData,
      [name]: value
    })
  }

  const cardFormSubmitHandler = (e) => {
    e.preventDefault();
    onCardUpdate(cardData);
    setCardData(defaultCardData);
    inputMessage.current.focus();
  }

  return (
    <form className='new-card-form' onSubmit={cardFormSubmitHandler}>
            <h2> CREATE A NEW CARD</h2>
            <label>message</label>
            <input 
                name='message' 
                placeholder='message' 
                onChange={onChange} 
                value={message}
                ref= {inputMessage}
            />
            <p id='preview-label'>preview: 
                <span>{`${message}`}</span>
            </p>
            <button type='submit'>Submit</button>
        </form>
    );
};
export default CreateNewCard;