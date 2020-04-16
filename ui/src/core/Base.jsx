import React from "react";

const Base = ({ className = "bg-dark text-white mg-auto py-3", children }) => {
  return (
    <div>
      <div className="container-fluid">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
