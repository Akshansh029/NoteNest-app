const EmptyCard = ({ noNotesImg, message }) => {
  return (
    <div>
      <img src={noNotesImg} className="w-60" alt="No notes"></img>

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
