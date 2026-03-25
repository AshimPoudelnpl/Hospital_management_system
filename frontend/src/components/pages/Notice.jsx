import React, { useState, useMemo } from "react";
import { useGetNoticesQuery } from "@Redux/features/noticeSlice.js";
import Skeleton from "../shared/Skeleton";
import { FaBullhorn, FaCalendarAlt, FaClock, FaChevronDown, FaStar, FaTimes } from "react-icons/fa";
import heroImage from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";

const Notice = () => {
  const { data: notices, isLoading, error } = useGetNoticesQuery();
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const isNew = (date) => {
    const noticeDate = new Date(date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return noticeDate > sevenDaysAgo;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
    return `${backendUrl}/${imagePath}`;
  };

  const filtered = useMemo(() => {
    let result = [...(notices || [])];
    if (filter === "new") {
      result = result.filter((n) => isNew(n.created_at));
    }
    return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [notices, filter]);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (isLoading) return <Skeleton variant="list" count={5} />;

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
     

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
       
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center animate-fade-in">
            <p className="text-red-600 font-semibold text-lg">Failed to load notices</p>
            <p className="text-red-500 text-sm mt-2">Please try refreshing the page</p>
          </div>
        )}

        {/* Empty State */}
        {!error && filtered.length === 0 && (
          <div className="py-16 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <FaBullhorn className="text-blue-600 text-4xl opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No notices available</h3>
            <p className="text-gray-600">Check back soon for updates</p>
          </div>
        )}

        {/* Accordion List */}
        {!error && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((notice, index) => (
              <div
                key={notice.id}
                className="notice-item bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header - Always Visible */}
                <div
                  onClick={() => toggleOpen(notice.id)}
                  className="notice-header flex justify-between items-center p-5 sm:p-6"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
                        {notice.title}
                      </h2>
                      {isNew(notice.created_at) && (
                        <span className="inline-block bg-linear-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg pulse-glow shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={12} className="text-blue-500" />
                        <span>{formatDate(notice.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock size={12} className="text-amber-500" />
                        <span>{getTimeAgo(notice.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chevron Icon */}
                  <div className="ml-4 shrink-0">
                    <FaChevronDown
                      className={`chevron-icon text-blue-600 text-lg transition-transform duration-300 ${
                        openId === notice.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expandable Content */}
                {openId === notice.id && (
                  <div className="expand-content border-t border-gray-100 px-5 sm:px-6 py-5 sm:py-6 bg-linear-to-br from-blue-50 to-indigo-50">
                    {/* Image - Clickable */}
                    {getImageUrl(notice.image) && (
                      <div
                        onClick={() => setSelectedImage(getImageUrl(notice.image))}
                        className="mb-5 rounded-xl overflow-hidden shadow-md"
                      >
                        <img
                          src={getImageUrl(notice.image)}
                          alt={notice.title}
                          className="notice-image w-full h-56 sm:h-64 object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                      {notice.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="modal-backdrop fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 bg-white hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={24} />
            </button>

            {/* Image */}
            <div className="modal-image rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage}
                alt="Notice"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Click to Close Info */}
            <p className="text-center text-white text-sm mt-4">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
