import React from 'react';

const BackgroundAnimation: React.FC = () => (
  <div className="fixed inset-0 -z-10" aria-hidden="true">
    <div className="w-full h-full animate-swirl" />
  </div>
);

export default BackgroundAnimation;