import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNoticeBySlugQuery } from "@Redux/features/noticeSlice.js";
import { FaArrowLeft } from "react-icons/fa";

const formatSubmittedAt = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${day} - ${time}`;
};

const NoticeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const { data: notice, isLoading, error } = useGetNoticeBySlugQuery(slug);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    setImageFailed(false);
  }, [notice?.image]);

  const imageUrl =
    notice?.image && !imageFailed ? `${backendUrl}/${notice.image}` : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-[28px] bg-white px-6 py-20 shadow-sm ring-1 ring-slate-200">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-[#1f4e8c]"></div>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">
            Notice not found
          </h1>
          <p className="mt-3 text-slate-600">
            The requested notice could not be loaded.
          </p>
          <button
            onClick={() => navigate("/notice")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1f4e8c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#173a67]"
          >
            <FaArrowLeft size={14} />
            <span>Back to notices</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <button
          onClick={() => navigate("/notice")}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
        >
          <FaArrowLeft size={14} />
          <span>Back to notices</span>
        </button>

        <section className="rounded-[28px] bg-white px-4 py-5 shadow-sm ring-1 ring-slate-200 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <h1 className="max-w-5xl break-words text-2xl font-semibold leading-tight text-[#1f4e8c] sm:text-4xl">
              {notice.title}
            </h1>
            <div className="hidden h-px flex-1 self-center bg-[#9eb5d4] sm:block" />
          </div>

          <p className="mt-4 text-base text-slate-800 sm:text-[1.15rem]">
            Submitted on: {formatSubmittedAt(notice.created_at)}
          </p>

          {imageUrl ? (
            <div className="mt-5">
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="group mx-auto block max-w-[560px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md"
                title="Open full image in new tab"
              >
                <img
                  src={imageUrl}
                  alt={notice.title}
                  className="w-full h-auto object-contain transition group-hover:scale-[1.01]"
                  onError={() => setImageFailed(true)}
                />
              </a>
              <p className="mt-3 text-center text-sm text-slate-500">
                Click the image to open the full file in a new tab.
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-600">
              Notice image is not available.
            </div>
          )}

          {notice.content ? (
            <div className="mt-6 rounded-[24px] bg-[#f5f8fc] px-5 py-4 text-sm leading-7 text-slate-700 sm:px-6 sm:text-base">
              <p className="whitespace-pre-wrap">{notice.content}</p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default NoticeDetail;
