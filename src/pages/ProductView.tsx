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
  const { id } = useParams<{ id: string }>(); // Grabs the ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // This state controls which image is currently showing in the big viewer
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      // Fetch the single product that matches the ID
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
        setActiveImage(data.image_url); // Default the big image to the main thumbnail
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center font-sans text-white">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-blue-400 hover:underline">← Back to Products</Link>
      </div>
    );
  }

  // YAHAN FIX KIYA HAI: STRICT FILTER
 // SUPER STRICT FILTER: Sirf unko rakhega jo actual working links hain (http/https se start hote hain)
  const allImages = [product.image_url, ...(product.gallery_urls || [])].filter(
    (url) => url && typeof url === 'string' && url.trim() !== '' && url.trim().startsWith('http')
  );

  return (
    <div className="min-h-screen bg-black font-sans pb-20">
      {/* If your Navbar is absolute/fixed, you might need some padding-top here */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link to="/products" className="text-white/50 hover:text-white transition text-sm font-medium">
            ← Back to all products
          </Link>
        </div>

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
            
            {/* Thumbnails (Vertical on desktop, Horizontal on mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-hide py-1 pr-1">
              {allImages.map((imgUrl, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === imgUrl ? 'border-black scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100 bg-gray-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image Viewer */}
            <div className="flex-1 bg-[#f4f5f7] rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              {activeImage && activeImage.trim() !== '' ? (
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply p-4"
                />
              ) : (
                <span className="text-gray-400 font-medium">Image not available</span>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE: PRODUCT INFO ================= */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="text-3xl font-extrabold text-black mb-6">
              ${product.price.toLocaleString()}
            </div>
            
            <div className="w-16 h-1 bg-black mb-6 rounded-full"></div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">About this product</h3>
            <p className="text-gray-600 leading-relaxed mb-10 whitespace-pre-line">
              {product.description}
            </p>

            {/* Checkout / Amazon Action */}
            <div className="mt-auto">
              {product.amazon_link ? (
                <a 
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full bg-[#FF9900] hover:bg-[#e38800] text-black px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Buy on Amazon
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-500 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed">
                  Currently Unavailable
                </button>
              )}
              
              <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider">
                Secure transaction via external partner
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}