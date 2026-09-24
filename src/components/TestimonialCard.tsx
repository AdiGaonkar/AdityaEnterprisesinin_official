
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

export default function TestimonialCard({ 
  content, 
  author, 
  role, 
  company, 
  avatar,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("glass-card p-6 rounded-xl hover-lift h-full", className)}>
      <div className="flex justify-between items-start mb-4">
        <Quote className="w-10 h-10 text-primary/30" />
      </div>
      
      <blockquote className="mb-6">
        <p className="text-gray-300 text-sm italic leading-relaxed">{content}</p>
      </blockquote>
      
      <div className="flex items-center">
        <div className="mr-3">
          {avatar ? (
            <img 
              src={avatar} 
              alt={author} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full glass overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
            </div>
          )}
        </div>
        
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-xs text-gray-400">
            {role}{company && `, ${company}`}
          </div>
        </div>
      </div>
    </div>
  );
}
