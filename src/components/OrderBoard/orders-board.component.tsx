import React, { useState } from "react";
import styles from "./order-board.module.css";
import { Card } from "../Card/card.component";
import OrderList from "../../data/orders.json";

export const OrdersBoard: React.FC = () => {
  const [cards, setCards] = useState(OrderList);

  const handleCardClick = (id: number, status: string) => {
    const cardIndex = cards.findIndex((card) => card.id === id);

    const newCards = [...cards];

    switch (status) {
      case "New":
        newCards[cardIndex].status = "Active";
        break;
      case "Active":
        newCards[cardIndex].status = "Ready";
        break;
      case "Ready":
        newCards[cardIndex].status = "Complete";
        break;
      default:
        break;
    }

    setCards(newCards);
  };

  const countCards = (status: string): number => {
    return cards.filter((card) => card.status === status).length;
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.columnHeader}>
          <h2>New </h2>
          <div className={styles.newCount}>{countCards("New")}</div>
        </div>

        {cards
          .filter((card) => card.status === "New")
          .map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>
          <h2>Active </h2>
          <div className={styles.activeCount}>{countCards("Active")}</div>
        </div>

        {cards
          .filter((card) => card.status === "Active")
          .map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
      </div>
      <div className={styles.column}>
        <div className={styles.columnHeader}>
          <h2>Ready </h2>
        </div>
        {cards
          .filter((card) => card.status === "Ready")
          .map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
      </div>
    </div>
  );
};
