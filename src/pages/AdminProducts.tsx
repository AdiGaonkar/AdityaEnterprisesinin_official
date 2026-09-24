import React, { useState, useEffect } from 'react';
import { supabase } from '../../src/supabaseClient'; // adjust path if needed

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    amazon_link: '', 
    image_url: '',
    gallery_urls: ['', '', '', ''] 
  });

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null, null]);
  
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) console.error("Error fetching:", error);
    else setProducts(data || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGalleryUrlChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery_urls];
    newGallery[index] = value;
    setFormData({ ...formData, gallery_urls: newGallery });
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainFile(e.target.files[0]);
      setFormData({ ...formData, image_url: '' }); 
    }
  };

  const handleGalleryFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = [...galleryFiles];
      newFiles[index] = e.target.files[0];
      setGalleryFiles(newFiles);

      const newUrls = [...formData.gallery_urls];
      newUrls[index] = ''; 
      setFormData({ ...formData, gallery_urls: newUrls });
    }
  };

  const uploadFileToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products') 
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      setUploadStatus('Uploading main image...');
      let finalMainUrl = formData.image_url;
      
      if (mainFile) {
        finalMainUrl = await uploadFileToSupabase(mainFile);
      }

      if (!finalMainUrl) {
        throw new Error("Please provide either a file or a URL for the main image.");
      }

      setUploadStatus('Uploading gallery images...');
      let finalGalleryUrls = [...formData.gallery_urls];
      
      for (let i = 0; i < galleryFiles.length; i++) {
        if (galleryFiles[i]) {
          const uploadedUrl = await uploadFileToSupabase(galleryFiles[i]!);
          finalGalleryUrls[i] = uploadedUrl;
        }
      }

      const validGalleryUrls = finalGalleryUrls.filter(url => url.trim() !== '');
      
      setUploadStatus('Saving product to database...');
      
      const { error: dbError } = await supabase.from('products').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          amazon_link: formData.amazon_link, 
          image_url: finalMainUrl,
          gallery_urls: validGalleryUrls,
          is_available: true // Set default availability to true
        }
      ]);

      if (dbError) throw dbError;

      alert("Product added successfully!");
      setFormData({ name: '', description: '', price: '', amazon_link: '', image_url: '', gallery_urls: ['', '', '', ''] });
      setMainFile(null);
      setGalleryFiles([null, null, null, null]);
      (document.getElementById('product-form') as HTMLFormElement).reset();
      fetchProducts();

    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
      setUploadStatus('');
    }
  };

  // NEW: Toggle Availability Function
  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    const newStatus = currentStatus === false ? true : false;
    const { error } = await supabase.from('products').update({ is_available: newStatus }).eq('id', id);
    if (error) alert("Error updating availability: " + error.message);
    else fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert("Error deleting: " + error.message);
    else fetchProducts(); 
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin: Manage Products</h1>

        <form id="product-form" onSubmit={handleAddProduct} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
              <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange} placeholder="Price ($)" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
              
              <input type="url" name="amazon_link" required value={formData.amazon_link} onChange={handleChange} placeholder="Amazon / Purchase Link URL" className="w-full px-4 py-2 border border-yellow-400 bg-yellow-50 rounded-lg focus:ring-2 focus:ring-black outline-none md:col-span-2" />
              
              <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Full Product Description..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none md:col-span-2 resize-none" rows={4}></textarea>
            </div>
          </div>

          {/* Section 2: Images */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Product Images</h2>
            <p className="text-sm text-gray-500 mb-6">Choose to either upload a file from your PC <b>OR</b> paste a direct image URL.</p>
            
            <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <label className="block text-sm font-bold text-gray-900 mb-3">Main Thumbnail (Required)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <input type="file" accept="image/*" onChange={handleMainFileChange} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800" />
                <span className="text-center text-gray-400 font-medium hidden md:block">OR</span>
                <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Paste Image URL here..." disabled={!!mainFile} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none disabled:opacity-50 disabled:bg-gray-100" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Gallery Images (Optional - up to 4)</label>
              <div className="space-y-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <input type="file" accept="image/*" onChange={(e) => handleGalleryFileChange(index, e)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300" />
                    <input type="url" value={formData.gallery_urls[index]} onChange={(e) => handleGalleryUrlChange(index, e.target.value)} placeholder={`Gallery URL ${index + 1}`} disabled={!!galleryFiles[index]} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none text-sm disabled:opacity-50 disabled:bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button type="submit" disabled={loading} className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50">
              {loading ? 'Processing...' : '+ Add Product to Store'}
            </button>
            {loading && <span className="text-sm font-medium text-blue-600 animate-pulse">{uploadStatus}</span>}
          </div>
        </form>

        {/* PRODUCT LIST TO DELETE & TOGGLE AVAILABILITY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Current Products</h2>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded-lg object-cover border" />
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">${product.price}</p>
                    <p className="text-xs text-blue-500 mt-1 truncate max-w-xs hover:text-clip">
                      Link: {product.amazon_link || "None"}
                    </p>
                  </div>
                </div>
                
                {/* Actions: Toggle Stock and Delete */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleToggleAvailability(product.id, product.is_available)} 
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${product.is_available !== false ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {product.is_available !== false ? 'In Stock' : 'Out of Stock'}
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition">
                    Delete
                  </button>
                </div>
                
              </div>
            ))}
            {products.length === 0 && <p className="text-gray-500 text-sm italic">No products found. Add one above!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}