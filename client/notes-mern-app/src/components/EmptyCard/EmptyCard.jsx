/* eslint-disable react/prop-types */
const EmptyCard = ({ notesImg, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <img src={notesImg} alt="No notes" width={350}></img>

      <p className="w-1/2 text-lg font-semibold text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
