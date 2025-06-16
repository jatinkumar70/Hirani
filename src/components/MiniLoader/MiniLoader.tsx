import type React from "react";

const MiniLoader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-gradient-to-r from-primary-gold via-dark-gold to-primary-gold">
        <div className="h-full w-1/3 animate-pulse-x bg-gradient-to-r from-primary-gold via-dark-gold to-primary-gold"></div>
      </div>
    </div>
  );
};

export default MiniLoader;
