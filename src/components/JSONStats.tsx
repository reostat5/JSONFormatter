import React from 'react';
import { BarChart2, Layers, AlignJustify } from 'lucide-react';
import { getJSONInfo } from '../utils/jsonFormatter';

interface JSONStatsProps {
  jsonData: any;
}

const JSONStats: React.FC<JSONStatsProps> = ({ jsonData }) => {
  const { size, nodeCount, depth } = getJSONInfo(jsonData);
  
  if (!jsonData) {
    return null;
  }
  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 py-2 px-4">
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <BarChart2 size={14} className="mr-1.5" />
          <span>Size: {size}</span>
        </div>
        
        <div className="flex items-center">
          <Layers size={14} className="mr-1.5" />
          <span>Nodes: {nodeCount}</span>
        </div>
        
        <div className="flex items-center">
          <AlignJustify size={14} className="mr-1.5" />
          <span>Depth: {depth}</span>
        </div>
      </div>
    </div>
  );
};

export default JSONStats;