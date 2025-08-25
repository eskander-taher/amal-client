import React from 'react';
import Notch from './Notch';

const NotchDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Notch Component Demo</h1>
      
      {/* Upward notch with white color */}
      <div className="bg-blue-500 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Upward Notch (Default)</h2>
        <Notch color="#fff" width={400}>
          <span className="text-blue-500 font-semibold">Content in Center</span>
        </Notch>
      </div>

      {/* Downward notch with black color */}
      <div className="bg-white p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Downward Notch</h2>
        <Notch direction="down" color="#000" width={400}>
          <span className="text-white font-semibold">Downward Content</span>
        </Notch>
      </div>

      {/* Upward notch with custom color */}
      <div className="bg-green-500 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Custom Color Notch</h2>
        <Notch color="#ff6b6b" width={350}>
          <div className="text-center">
            <span className="text-white font-semibold block">Custom Red Color</span>
            <span className="text-white text-sm">With multiple lines</span>
          </div>
        </Notch>
      </div>

      {/* Downward notch with icon */}
      <div className="bg-purple-500 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Notch with Icon</h2>
        <Notch direction="down" color="#fff" width={300}>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📱</span>
            <span className="text-purple-500 font-semibold">iPhone Style</span>
          </div>
        </Notch>
      </div>

      {/* Empty notch */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Empty Notch</h2>
        <Notch color="#fff" width={250} />
      </div>

      {/* Different sizes */}
      <div className="bg-orange-500 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Different Sizes</h2>
        <div className="space-y-4">
          <Notch color="#fff" width={200} height={30}>
            <span className="text-orange-500 text-sm font-semibold">Small</span>
          </Notch>
          <Notch color="#fff" width={300} height={49}>
            <span className="text-orange-500 font-semibold">Medium</span>
          </Notch>
          <Notch color="#fff" width={400} height={60}>
            <span className="text-orange-500 text-lg font-semibold">Large</span>
          </Notch>
        </div>
      </div>
    </div>
  );
};

export default NotchDemo;

