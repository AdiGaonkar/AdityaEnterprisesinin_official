import React, { useRef, useState, useEffect } from "react";

// In production, fetch this data from your backend!
// These act as our default/fallback reviews.
const dummyReviews = [
  {
    id: 1,
    name: "Karan",
    company: "Tech Solutions",
    feedback: "My buying experience is so nice, and received me very politely. Riding experience is also very good. Very good performance. I never experienced such a kind of performance. Very good service.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  
];

const TestimonialSection = () => {
  const scrollRef = useRef(null);
  
  // 1. Set up state to hold our reviews, defaulting to the dummy data
  const [reviews, setReviews] = useState(dummyReviews);

  // 2. When the component loads, check local storage for new submitted reviews
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("myReviews"));
    if (savedReviews && savedReviews.length > 0) {
      // Combine the newly submitted reviews with the dummy ones
      setReviews([...savedReviews, ...dummyReviews]); 
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Width of one card roughly
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#f9fafb] py-20 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Read reviews, <br className="hidden md:block" /> ride with confidence.
          </h2>
          <div className="flex items-center justify-center gap-3 text-lg font-medium">
            <span>4.2/5</span>
            <div className="flex items-center text-[#00b67a] gap-1 text-2xl">
              {/* Trustpilot-style Star SVG */}
              ★ Trustpilot
            </div>
            <span className="text-gray-500 font-normal">Based on 5210 reviews</span>
          </div>
        </div>

        {/* Bottom Content: Left Sidebar + Right Scrolling Cards */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Area */}
          <div className="lg:w-1/4 flex-shrink-0 lg:sticky lg:top-24">
            <div className="text-[#b3b3b3] text-7xl mb-4 font-serif leading-none">“</div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
              What our <br /> customers are <br /> saying
            </h3>
            
            {/* Custom Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => scroll("left")}
                className="hover:bg-gray-200 p-2 rounded-full transition"
              >
                ←
              </button>
              <div className="w-16 h-[2px] bg-gray-300 relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-800"></div>
              </div>
              <button 
                onClick={() => scroll("right")}
                className="hover:bg-gray-200 p-2 rounded-full transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Area (Scrollable Cards) */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 3. Make sure we map over 'reviews' state, NOT just 'dummyReviews' */}
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="snap-start flex-shrink-0 w-[320px] md:w-[350px] flex flex-col"
              >
                {/* Speech Bubble Container */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative mb-6 min-h-[220px]">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {review.feedback}
                  </p>
                  
                  {/* 5 Stars */}
                  <div className="flex text-[#00b67a] mt-6 text-lg">
                    ★★★★★
                  </div>

                  {/* Speech Bubble Tail (Triangle trick) */}
                  <div className="absolute -bottom-4 left-8 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-t-white border-r-[16px] border-r-transparent drop-shadow-sm"></div>
                </div>

                {/* User Info Below Bubble */}
                <div className="flex items-center gap-4 px-4">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">{review.name}</h4>
                    <p className="text-gray-500 text-xs">{review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;