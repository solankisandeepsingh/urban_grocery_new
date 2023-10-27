import React from "react";

const InfiniteLoader = () => {
  return (
    <div className="fixed inset-0 bg-opacity-40 bg-[gray] flex justify-center items-center z-50">
      <div className="w-10  h-10 border-[3.5px]   border-[#885dd8]  border-b-[#aa5b5b]  border-t-[Green] border-l-[Green] rounded-full animate-spin"></div>
    </div>
  );
};

export default InfiniteLoader;
