import React from 'react';
import Notch from './Notch';

const NotchExample: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Example 1: Basic upward notch */}
      <div className=" p-6 rounded-lg mb-6">
        <Notch color="#fff" width={300}>
          <span className="text-blue-600 font-semibold">Status Bar</span>
        </Notch>
      </div>

      {/* Example 2: Downward notch with content */}
      <div className=" p-6 rounded-lg mb-6">
        <Notch direction="down" color="#fff" width={500} >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📱</span>
            <span className="text-gray-900 font-semibold">iPhone Notch</span>
          </div>
        </Notch>
      </div>

      {/* Example 3: Custom colored notch */}
      <div className=" p-6 rounded-lg">
        <Notch color="#ff4757" width={400}>
          <span className="text-white font-semibold">Custom Red Notch</span>
        </Notch>
      </div>
    </div>
  );
};

export default NotchExample;

