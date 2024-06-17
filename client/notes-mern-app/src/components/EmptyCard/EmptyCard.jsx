/* eslint-disable react/prop-types */
const EmptyCard = ({ notesImg, message, isDarkMode }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={notesImg} alt="No notes" width={350}></img>

      <p
        className={`w-full text-lg font-semibold  text-center leading-7 mt-5 ${
          isDarkMode ? "text-slate-200" : "text-slate-700"
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
