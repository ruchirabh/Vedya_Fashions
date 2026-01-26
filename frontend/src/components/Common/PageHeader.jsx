// src/components/Common/PageHeader.jsx
import { ArrowLeft } from "lucide-react";
import React from "react";

function PageHeader({ title, subtitle, onBack, backLabel = "Back" }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
        >
          <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group-hover:scale-105">
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </div>
          <span className="hidden sm:inline text-sm sm:text-base">
            {backLabel}
          </span>
        </button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
            {title}
          </h1>
        </div>
      </div>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 pl-12 sm:pl-14">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;