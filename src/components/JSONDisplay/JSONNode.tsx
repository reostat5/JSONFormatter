import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JSONNodeProps {
  name: string | null;
  value: any;
  isLast: boolean;
  level: number;
  path: string;
  onPathClick: (path: string) => void;
}

const JSONNode: React.FC<JSONNodeProps> = ({ 
  name, 
  value, 
  isLast, 
  level,
  path,
  onPathClick
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(level < 2);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  const getType = (val: any): string => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
  };
  
  const getNodeClass = (type: string): string => {
    switch (type) {
      case 'string':
        return 'text-green-600 dark:text-green-400';
      case 'number':
        return 'text-blue-600 dark:text-blue-400';
      case 'boolean':
        return 'text-purple-600 dark:text-purple-400';
      case 'null':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };
  
  const renderValue = () => {
    const type = getType(value);
    
    if (type === 'array' || type === 'object') {
      const count = type === 'array' ? value.length : Object.keys(value).length;
      const isArray = type === 'array';
      
      return (
        <div>
          <div 
            className="cursor-pointer inline-flex items-center hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={handleToggle}
          >
            {isExpanded ? 
              <ChevronDown size={16} className="transition-transform" /> : 
              <ChevronRight size={16} className="transition-transform" />
            }
            
            {name !== null && (
              <span className="text-indigo-800 dark:text-indigo-300 mr-1">
                {name}:
              </span>
            )}
            
            <span className="select-none">
              {isArray ? '[' : '{'}
            </span>
            
            <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">
              {count} {count === 1 ? (isArray ? 'item' : 'property') : (isArray ? 'items' : 'properties')}
            </span>
            
            {!isExpanded && <span>{isArray ? ']' : '}'}</span>}
          </div>
          
          {isExpanded && (
            <div className="ml-6 border-l border-gray-300 dark:border-gray-700 pl-2">
              {type === 'array' ? 
                value.map((item: any, index: number) => (
                  <JSONNode
                    key={index}
                    name={String(index)}
                    value={item}
                    isLast={index === value.length - 1}
                    level={level + 1}
                    path={`${path}[${index}]`}
                    onPathClick={onPathClick}
                  />
                )) : 
                Object.entries(value).map(([key, val], index, arr) => (
                  <JSONNode
                    key={key}
                    name={key}
                    value={val}
                    isLast={index === arr.length - 1}
                    level={level + 1}
                    path={path ? `${path}.${key}` : key}
                    onPathClick={onPathClick}
                  />
                ))
              }
              
              <div className="inline">
                {isArray ? ']' : '}'}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div>
        {name !== null && (
          <span 
            className="text-indigo-800 dark:text-indigo-300 mr-1 cursor-pointer hover:underline"
            onClick={() => onPathClick(path)}
          >
            {name}:
          </span>
        )}
        
        <span className={getNodeClass(type)}>
          {type === 'string' ? `"${value}"` : 
            type === 'null' ? 'null' : 
            String(value)}
        </span>
        
        {!isLast && <span>,</span>}
      </div>
    );
  };
  
  return (
    <div className="my-1 font-mono text-sm">
      {renderValue()}
    </div>
  );
};

export default JSONNode;