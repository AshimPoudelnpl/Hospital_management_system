import { useGetNoticesQuery } from "@Redux/features/noticeSlice.js";
import { useNavigate } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import heroImage from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";

const Notice = () => {
  const { data, isLoading, error } = useGetNoticesQuery();
  const navigate = useNavigate();

  // Handle both array and object with data property
  const notices = Array.isArray(data) ? data : data?.data || [];

  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-xl text-red-600">Error loading notices</p>
          <p className="text-sm text-gray-600 mt-2">
            {error?.data?.message || error?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <div
        className="relative w-full h-64 sm:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Notices</h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Stay updated with latest announcements
          </p>
        </div>
      </div>

      {/* Notices List */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="flex flex-col divide-y divide-gray-200">
          {sortedNotices.length > 0 ? (
            sortedNotices.map((notice) => (
              <div
                key={notice.id}
                className="sm:flex sm:flex-row justify-start sm:justify-between items-start sm:items-center py-3 cursor-pointer hover:bg-gray-50 px-3 rounded transition-all"
                onClick={() => notice.slug && navigate(`/notice/${notice.slug}`)}
              >
                {/* Title */}
                <p className="flex items-center text-black hover:text-blue-600">
                  <FaCaretRight className="text-black w-4 h-4 mr-2" />
                  <span>{notice.title}</span>
                </p>

                {/* Date */}
                <span className="text-gray-500 text-sm ml-6 sm:ml-0">
                  {formatDate(notice.created_at)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-8">No notices found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
