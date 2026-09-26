import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../src/supabaseClient'; // Adjust path if needed
import Navbar from '@/components/Navbar'; // Adjust path if needed

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  gallery_urls: string[];
  amazon_link: string;
};

export default function ProductView() {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
        setActiveImage(data.image_url);
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-t-2 border-l-2 border-black rounded-full animate-spin"></div>
          <span className="text-black text-sm tracking-widest uppercase">Loading</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center font-sans text-black">
        <h1 className="text-4xl font-serif tracking-tight mb-6">Product Not Found</h1>
        <Link to="/products" className="text-sm tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
          Return to Collection
        </Link>
      </div>
    );
  }

  // SUPER STRICT FILTER
  const allImages = [product.image_url, ...(product.gallery_urls || [])].filter(
    (url) => url && typeof url === 'string' && url.trim() !== '' && url.trim().startsWith('http')
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-24">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-32 lg:pt-44">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-10">
          <Link 
            to="/products" 
            className="text-gray-400 hover:text-black transition-colors text-xs font-semibold tracking-[0.2em] uppercase"
          >
            ← Back to Collection
          </Link>
        </div>

        {/* Main Product Container */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
          <div className="w-full lg:w-[55%] flex flex-col">
            
            {/* Main Active Image Viewer */}
            <div className="w-full bg-[#f8f8f8] rounded-3xl overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[650px] mb-6 relative group">
              {activeImage && activeImage.trim() !== '' ? (
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply p-12 transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              ) : (
                <span className="text-gray-400 font-medium tracking-wide">Image unavailable</span>
              )}
            </div>

            {/* Thumbnails (Horizontal below main image) */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-1">
              {allImages.map((imgUrl, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden transition-all duration-300 bg-[#f8f8f8] ${
                    activeImage === imgUrl 
                      ? 'ring-1 ring-black shadow-lg scale-100' 
                      : 'ring-1 ring-transparent opacity-40 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply p-3" />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE: PRODUCT INFO ================= */}
          <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:pt-8">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-black leading-[1.1] tracking-tight mb-6">
              {product.name}
            </h1>
            
            {/* Minimalist Reviews */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex text-black text-sm tracking-widest">
                ★★★★★
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Premium Selection</span>
            </div>

            <div className="w-full h-[1px] bg-gray-200 mb-10"></div>

            <p className="text-gray-600 leading-relaxed mb-12 whitespace-pre-line text-lg font-light">
              {product.description}
            </p>

            <div className="mb-12">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">Purchasing Options</p>
              
              {/* Styled "Option" Box - High-end minimalist */}
              <div className="border border-black rounded-2xl p-6 flex items-center justify-between bg-white cursor-pointer hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-5">
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                    <div className="w-2 h-2 rounded-full bg-black group-hover:bg-white transition-colors"></div>
                  </div>
                  <span className="font-medium text-black text-lg tracking-wide">One-time purchase</span>
                </div>
                <span className="text-black font-serif text-2xl">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout / Amazon Action */}
            <div className="mt-auto pt-4">
              {product.amazon_link ? (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-black text-white px-8 py-5 rounded-full font-medium text-lg tracking-wide hover:bg-gray-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  Purchase via Amazon
                </a>
              ) : (
                <button disabled className="w-full border border-gray-200 text-gray-400 px-8 py-5 rounded-full font-medium text-lg tracking-wide cursor-not-allowed uppercase text-sm">
                  Currently Unavailable
                </button>
              )}
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-xs font-semibold uppercase tracking-widest">Secure External Checkout</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
