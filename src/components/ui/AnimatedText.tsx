
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  animated?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = false,
  delay = 0,
  animated = true,
}) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!animated) {
    return <span className={className}>{text}</span>;
  }
  
  return (
    <span className="inline-block overflow-hidden">
      <span
        className={cn(
          'inline-block transition-transform duration-700 ease-out',
          show ? 'translate-y-0' : 'translate-y-full',
          className
        )}
      >
        {text}
      </span>
    </span>
  );
};

export const AnimatedTitle: React.FC<{
  text: string;
  className?: string;
  wordsClassName?: string;
  delay?: number;
}> = ({ text, className, wordsClassName, delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <h2 className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-2 overflow-hidden">
          <AnimatedText
            text={word}
            className={wordsClassName}
            delay={delay + i * 100}
          />
        </span>
      ))}
    </h2>
  );
};

export default AnimatedText;
