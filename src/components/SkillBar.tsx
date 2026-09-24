import { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
}

export default function SkillBar({ name, percentage, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 100 + delay);

    return () => clearTimeout(timeout);
  }, [percentage, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="text-xs text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
        <div 
          className="h-2 bg-gradient-to-r from-white to-teal-400 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}


export function SkillCard({ name, icon, description }: { name: string; icon: React.ReactNode; description: string }) {
  return (
    <div className="glass-card p-6 rounded-xl hover-lift group">
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-lg inline-block mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{name}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
