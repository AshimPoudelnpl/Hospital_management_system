import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
      <FaQuoteLeft className="text-blue-100 text-4xl" />
      <p className="text-gray-600 text-sm leading-relaxed -mt-2">{review.text || review.review_text}</p>
      <div className="flex gap-0.5 mt-auto">
        {Array.from({ length: 5 }).map((_, s) => (
          <FaStar key={s} className={s < review.rating ? "text-yellow-400" : "text-gray-200"} size={14} />
        ))}
      </div>
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{review.name}</p>
          <p className="text-xs text-gray-400">{review.role || "Patient"}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
