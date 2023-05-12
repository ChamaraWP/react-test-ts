import styles from "./card.module.css";

interface CardData {
  id: number;
  status: string;
  pricelist: {
    name: string;
  };
  space: {
    name: string;
  };
  items: {
    price: number;
    quantity: number;
  }[];
  location: string;
}

interface CardProps {
  card: CardData;
  onCardClick: (id: number, state: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onCardClick }) => {
  let buttonText = "";
  switch (card.status) {
    case "New":
      buttonText = "Approve";
      break;
    case "Active":
      buttonText = "Ready";
      break;
    case "Ready":
      buttonText = "Complete";
      break;
    default:
      buttonText = "";
      break;
  }

  const totalPrice = card.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.row}>
          <span className={styles.orderNumber}>{`Order #${card.id}`}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.restaurantName}>{card.pricelist.name}</span>
        </div>
        <div className={styles.row}>
          <div className={styles.itemText}>
            {card.items.length} items &bull; &euro;{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <span className={styles.location}>{card.location}</span>
        <button
          className={styles.ctaButton}
          onClick={() => onCardClick(card.id, card.status)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
