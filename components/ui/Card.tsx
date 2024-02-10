const Card = ({ children }) => {
  return (
    <div className="relative h-fit w-fit bg-white shadow-md rounded-md overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
