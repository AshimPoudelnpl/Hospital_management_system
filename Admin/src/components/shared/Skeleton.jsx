import React from "react";

const Skeleton = ({ variant = "card", count = 1, className = "" }) => {
  const baseClass = "animate-pulse bg-gray-200 rounded";

  const variants = {
    card: (
      <div className={`${className} space-y-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className={`${baseClass} h-48 w-full mb-4`}></div>
            <div className={`${baseClass} h-6 w-3/4 mb-3`}></div>
            <div className={`${baseClass} h-4 w-full mb-2`}></div>
            <div className={`${baseClass} h-4 w-5/6`}></div>
          </div>
        ))}
      </div>
    ),

    table: (
      <div className={`${className} space-y-3`}>
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`${baseClass} h-6 flex-1`}></div>
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow flex gap-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className={`${baseClass} h-6 flex-1`}></div>
            ))}
          </div>
        ))}
      </div>
    ),

    text: (
      <div className={`${className} space-y-2`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} h-4 w-full`}></div>
        ))}
      </div>
    ),

    image: (
      <div className={`${className} space-y-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} h-64 w-full rounded-lg`}></div>
        ))}
      </div>
    ),

    grid: (
      <div className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
            <div className={`${baseClass} h-48 w-full`}></div>
            <div className="p-4 space-y-3">
              <div className={`${baseClass} h-6 w-3/4`}></div>
              <div className={`${baseClass} h-4 w-full`}></div>
              <div className={`${baseClass} h-4 w-5/6`}></div>
              <div className={`${baseClass} h-10 w-full mt-4`}></div>
            </div>
          </div>
        ))}
      </div>
    ),

    hero: (
      <div className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg min-h-[400px] animate-pulse`}></div>
    ),

    form: (
      <div className={`${className} space-y-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className={`${baseClass} h-4 w-1/4`}></div>
            <div className={`${baseClass} h-10 w-full`}></div>
          </div>
        ))}
      </div>
    ),
  };

  return variants[variant] || variants.card;
};

export default Skeleton;
