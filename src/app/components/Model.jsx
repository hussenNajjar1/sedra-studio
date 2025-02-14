import React from "react";

const Model = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* العنوان */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">تعديل العرض</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* محتوى النموذج */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Model;
