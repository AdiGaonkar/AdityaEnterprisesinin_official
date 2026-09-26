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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center font-sans text-black">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-gray-500 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  // SUPER STRICT FILTER
  const allImages = [product.image_url, ...(product.gallery_urls || [])].filter(
    (url) => url && typeof url === 'string' && url.trim() !== '' && url.trim().startsWith('http')
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link to="/products" className="text-gray-500 hover:text-black transition text-sm font-medium">
            ← Back to all products
          </Link>
        </div>

        {/* Main Product Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            {/* Main Active Image Viewer */}
            <div className="w-full bg-[#f0f0f0] rounded-[2rem] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px] mb-6">
              {activeImage && activeImage.trim() !== '' ? (
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply p-8"
                />
              ) : (
                <span className="text-gray-400 font-medium">Image not available</span>
              )}
            </div>

            {/* Thumbnails (Horizontal below main image) */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {allImages.map((imgUrl, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all bg-[#f0f0f0] ${
                    activeImage === imgUrl ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE: PRODUCT INFO ================= */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-3 font-serif">
              {product.name}
            </h1>
            
            {/* Static Reviews Mockup to match design */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-black text-sm">
                ★★★★★
              </div>
              <span className="text-sm text-gray-500 font-medium">Top Rated Product</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-10 whitespace-pre-line text-lg">
              {product.description}
            </p>

            <div className="mb-10">
              <p className="font-bold text-black mb-4">Choose an option:</p>
              
              {/* Styled "Option" Box mimicking the screenshot */}
              <div className="border-2 border-black rounded-2xl p-5 flex items-start gap-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="mt-1 w-5 h-5 rounded-full border-[5px] border-black flex-shrink-0"></div>
                <div>
                  <p className="font-bold text-black text-lg">One-time purchase</p>
                  <p className="text-gray-700 font-medium mt-1">₹ {product.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Checkout / Amazon Action */}
            <div className="mt-auto">
              {product.amazon_link ? (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white text-center px-8 py-5 rounded-[2rem] font-bold text-xl hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Buy on Amazon
                </a>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-500 px-8 py-5 rounded-[2rem] font-bold text-xl cursor-not-allowed">
                  Currently Unavailable
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
