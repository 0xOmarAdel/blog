interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative h-fit w-full bg-white shadow-md rounded-md overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
