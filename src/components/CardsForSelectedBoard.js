import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const CardsForSelectedBoard = ({ cardData, onUpdateLike, onRemove }) => {
  console.log("in CFSB: ", cardData)
  const cardComponents = cardData.map((card) => {
    return (
      <Card
        id={card.id}
        key={card.id}
        boardId={card.boardId}
        status={card.status}
        message={card.message}
        likesCount={card.likesCount}
        onUpdateLike={onUpdateLike}
        onRemove={onRemove}
      />
    );
  });
  return (
    <section>
      <ul>{cardComponents}</ul>
    </section>
  );
};

CardsForSelectedBoard.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string,
      status: PropTypes.bool,
      likesCount: PropTypes.number,
    })
  ).isRequired,
  onUpdateLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CardsForSelectedBoard;
