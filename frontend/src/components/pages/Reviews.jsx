import { useState } from "react";
import { useGetReviewsQuery } from "@Redux/features/reviewSlice.js";
import Loading from "../shared/Loading";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  const { data: reviews = [], isLoading } = useGetReviewsQuery();
  const [sortBy, setSortBy] = useState("recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Patient Reviews</h1>
          <p className="text-gray-600 text-lg">Read what our patients say about their experience at Swastik Hospital</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Stats */}
          <div className="lg:col-span-1">
            {/* Rating Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Rating Summary</h2>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">{avgRating}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-200"} size={20} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">Based on {reviews.length} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-12">{rating} ⭐</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${reviews.length > 0 ? (ratingCounts[rating] / reviews.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{ratingCounts[rating]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Reviews List */}
          <div className="lg:col-span-2">
            {/* Sort Options */}
            <div className="mb-6 flex gap-3">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

            {/* Reviews Grid */}
            {sortedReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No reviews yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} size={16} />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <FaQuoteLeft className="text-blue-100 text-2xl flex-shrink-0 mt-1" />
                      <p className="text-gray-700 leading-relaxed">{review.text || review.review_text}</p>
                    </div>

                    {review.role && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                          {review.role}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
