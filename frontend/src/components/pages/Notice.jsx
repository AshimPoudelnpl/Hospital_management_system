import React from "react";
import { useGetNoticesQuery } from "@Redux/features/noticeSlice.js";
import Loading from "../shared/Loading";
import { FaBullhorn } from "react-icons/fa";

const Notice = () => {
  const { data: notices, isLoading, error } = useGetNoticesQuery();

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg mb-4">Failed to load notices.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Notices</h1>
          <p className="text-gray-600 text-lg">
            Latest announcements and updates from Swastik Hospital
          </p>
        </div>

        {notices && notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div
                key={notice.id || index}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition border-l-4 border-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaBullhorn className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-blue-900">
                        {notice.title}
                      </h3>
                      {notice.created_at && (
                        <span className="text-xs text-gray-400 ml-4 flex-shrink-0">
                          {new Date(notice.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            No notices available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
