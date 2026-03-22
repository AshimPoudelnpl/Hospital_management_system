import React, { useState } from "react";
import { useGetNoticesQuery } from "@Redux/features/noticeSlice.js";
import Loading from "../shared/Loading";
import { FaBullhorn, FaCalendarAlt, FaTimes } from "react-icons/fa";

const Notice = () => {
  const { data: notices, isLoading, error } = useGetNoticesQuery();
  const [selected, setSelected] = useState(null);

  if (isLoading) return <Loading />;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Notices</h1>
          <p className="text-gray-500">Latest announcements from Swastik Hospital</p>
        </div>

        {error && (
          <div className="text-center py-16 text-red-500">Failed to load notices.</div>
        )}

        {!error && (!notices || notices.length === 0) && (
          <div className="text-center py-16 text-gray-400">No notices available.</div>
        )}

        {!error && notices?.length > 0 && (
          <div className="space-y-4">
            {notices.map((notice, i) => (
              <div
                key={notice.id || i}
                onClick={() => setSelected(notice)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 cursor-pointer hover:shadow-md hover:border-blue-200 transition"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaBullhorn className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-blue-900 mb-1">{notice.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{notice.content}</p>
                </div>
                {notice.created_at && (
                  <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                    <FaCalendarAlt className="text-blue-300" />
                    {formatDate(notice.created_at)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
              <FaTimes />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaBullhorn className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-900">{selected.title}</h2>
            </div>
            {selected.created_at && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                <FaCalendarAlt className="text-blue-300" /> {formatDate(selected.created_at)}
              </p>
            )}
            <p className="text-gray-600 leading-relaxed text-sm">{selected.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
