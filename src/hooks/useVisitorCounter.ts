import { useState, useEffect } from 'react';

export const useVisitorCounter = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const weekKey = `visitors_${startOfWeek.toISOString().split('T')[0]}`;
    
    const savedCount = localStorage.getItem(weekKey);
    const currentCount = savedCount ? parseInt(savedCount, 10) : 0;
    
    // Check if this is a new visit for today
    const lastVisit = localStorage.getItem('last_visit');
    const today = now.toISOString().split('T')[0];
    
    if (lastVisit !== today) {
      const newCount = currentCount + 1;
      localStorage.setItem(weekKey, newCount.toString());
      localStorage.setItem('last_visit', today);
      setCount(newCount);
    } else {
      setCount(currentCount);
    }
  }, []);

  return count;
};