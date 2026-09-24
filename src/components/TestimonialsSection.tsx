
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedTitle } from './ui/AnimatedText';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const testimonials = [
    {
      content: "Working with this developer was an absolute pleasure. They took our vague concept and transformed it into a stunning website that perfectly represents our brand. Their technical skills and eye for design are truly impressive.",
      author: "Abhishek Gupta",
      role: "Founder",
      company: "Trendvise Pro",
    },
    {
      content: "I've worked with many developers over the years, but none have delivered the level of quality and attention to detail that I experienced here. The website is not only beautiful but also performs exceptionally well.",
      author: "Abhishek lahamge",
      role: "Founder",
      company: "Gogas",
    },
    {
      content: "The UI/UX consultation provided invaluable insights that completely transformed our user experience. Our conversion rates have increased by 40% since implementing the recommended changes.",
      author: "Dnyaneshwar Gaonkar",
      role: "Product Manager",
      company: "AdityaEnterprises",
    },
    {
      content: "From the initial concept to the final delivery, every aspect of our project was handled with professionalism and creativity. The 3D product configurator exceeded our expectations and has become a key selling point for our products.",
      author: "CA.Vishal GhadiGaonkar",
      role: "CA",
      company: "Chartered Accountant",
    },
  ];
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, isAnimating]);
  
  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
  };

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-background/90 to-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-20" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="chip mb-3">Testimonials</span>
          <AnimatedTitle 
            text="What Clients Say About My Work" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-6"
            wordsClassName="text-gradient"
          />
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Feedback from clients who have trusted me with their projects.
          </p>
        </div>
        
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <TestimonialCard
                      content={testimonial.content}
                      author={testimonial.author}
                      role={testimonial.role}
                      company={testimonial.company}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-6' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
