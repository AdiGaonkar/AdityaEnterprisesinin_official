import React, { useState, useEffect } from "react";
import { supabase } from "../../src/supabaseClient";

type Product = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  amazon_link: string;
  image_url: string;
  gallery_urls: string[];
  is_available: boolean;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    amazon_link: "",
    image_url: "",
    gallery_urls: ["", "", "", ""],
  });

  const [mainFile, setMainFile] = useState<File | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<
    (File | null)[]
  >([null, null, null, null]);

  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products: " + error.message);
      return;
    }

    setProducts(data || []);
  };

  // ============================================================
  // FORM HANDLING
  // ============================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // GALLERY URL CHANGE
  // ============================================================

  const handleGalleryUrlChange = (
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newGallery = [...prev.gallery_urls];

      newGallery[index] = value;

      return {
        ...prev,
        gallery_urls: newGallery,
      };
    });
  };

  // ============================================================
  // MAIN IMAGE FILE
  // ============================================================

  const handleMainFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Make sure selected file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setMainFile(file);

    // Clear URL because file has priority
    setFormData((prev) => ({
      ...prev,
      image_url: "",
    }));
  };

  // ============================================================
  // GALLERY IMAGE FILE
  // ============================================================

  const handleGalleryFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Update files
    setGalleryFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;

      return newFiles;
    });

    // Clear URL because file has priority
    setFormData((prev) => {
      const newUrls = [...prev.gallery_urls];

      newUrls[index] = "";

      return {
        ...prev,
        gallery_urls: newUrls,
      };
    });
  };

  // ============================================================
  // UPLOAD FILE TO SUPABASE STORAGE
  // ============================================================

  const uploadFileToSupabase = async (file: File) => {
    if (!file) {
      throw new Error("No file selected.");
    }

    const fileExt = file.name.split(".").pop()?.toLowerCase();

    if (!fileExt) {
      throw new Error("Unable to determine file extension.");
    }

    // Create unique filename
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 12)}.${fileExt}`;

    // File path inside bucket
    const filePath = `images/${fileName}`;

    console.log("Uploading file:", filePath);

    // Upload
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);

      throw new Error(
        `Image upload failed: ${uploadError.message}`
      );
    }

    // Generate public URL
    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error(
        "Image uploaded but public URL could not be generated."
      );
    }

    console.log("Public image URL:", data.publicUrl);

    return data.publicUrl;
  };

  // ============================================================
  // ADD PRODUCT
  // ============================================================

  const handleAddProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // --------------------------------------------------------
      // BASIC VALIDATION
      // --------------------------------------------------------

      if (!formData.name.trim()) {
        throw new Error("Please enter a product name.");
      }

      if (!formData.description.trim()) {
        throw new Error(
          "Please enter a product description."
        );
      }

      if (!formData.price) {
        throw new Error("Please enter a product price.");
      }

      const numericPrice = parseFloat(formData.price);

      if (isNaN(numericPrice)) {
        throw new Error("Please enter a valid price.");
      }

      if (numericPrice < 0) {
        throw new Error("Price cannot be negative.");
      }

      if (!formData.amazon_link.trim()) {
        throw new Error(
          "Please enter the Amazon / Purchase link."
        );
      }

      // --------------------------------------------------------
      // MAIN IMAGE
      // --------------------------------------------------------

      setUploadStatus("Preparing main image...");

      let finalMainUrl = formData.image_url.trim();

      // If file selected, upload it
      if (mainFile) {
        setUploadStatus("Uploading main image...");

        finalMainUrl =
          await uploadFileToSupabase(mainFile);
      }

      // Main image required
      if (!finalMainUrl) {
        throw new Error(
          "Please upload a main image or provide an image URL."
        );
      }

      // --------------------------------------------------------
      // GALLERY IMAGES
      // --------------------------------------------------------

      setUploadStatus("Processing gallery images...");

      const finalGalleryUrls = [
        ...formData.gallery_urls,
      ];

      for (
        let i = 0;
        i < galleryFiles.length;
        i++
      ) {
        if (galleryFiles[i]) {
          setUploadStatus(
            `Uploading gallery image ${i + 1} of 4...`
          );

          const uploadedUrl =
            await uploadFileToSupabase(
              galleryFiles[i]!
            );

          finalGalleryUrls[i] = uploadedUrl;
        }
      }

      // Remove empty gallery URLs
      const validGalleryUrls =
        finalGalleryUrls.filter(
          (url) => url.trim() !== ""
        );

      // --------------------------------------------------------
      // SAVE PRODUCT
      // --------------------------------------------------------

      setUploadStatus(
        "Saving product to database..."
      );

      const { error: dbError } = await supabase
        .from("products")
        .insert([
          {
            name: formData.name.trim(),

            description:
              formData.description.trim(),

            price: numericPrice,

            amazon_link:
              formData.amazon_link.trim(),

            image_url: finalMainUrl,

            gallery_urls: validGalleryUrls,

            is_available: true,
          },
        ]);

      if (dbError) {
        console.error(
          "Database insert error:",
          dbError
        );

        throw new Error(
          `Product could not be saved: ${dbError.message}`
        );
      }

      // --------------------------------------------------------
      // SUCCESS
      // --------------------------------------------------------

      alert(
        "Product added successfully! 🎉"
      );

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        amazon_link: "",
        image_url: "",
        gallery_urls: [
          "",
          "",
          "",
          "",
        ],
      });

      setMainFile(null);

      setGalleryFiles([
        null,
        null,
        null,
        null,
      ]);

      // Reset actual HTML form
      const form =
        document.getElementById(
          "product-form"
        ) as HTMLFormElement | null;

      if (form) {
        form.reset();
      }

      // Refresh products
      await fetchProducts();
    } catch (err: any) {
      console.error("Add product error:", err);

      alert(
        "Error: " +
          (err?.message ||
            "Something went wrong.")
      );
    } finally {
      setLoading(false);
      setUploadStatus("");
    }
  };

  // ============================================================
  // TOGGLE AVAILABILITY
  // ============================================================

  const handleToggleAvailability = async (
    id: number,
    currentStatus: boolean
  ) => {
    const newStatus =
      currentStatus === false
        ? true
        : false;

    const { error } = await supabase
      .from("products")
      .update({
        is_available: newStatus,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "Availability update error:",
        error
      );

      alert(
        "Error updating availability: " +
          error.message
      );

      return;
    }

    await fetchProducts();
  };

  // ============================================================
  // DELETE PRODUCT
  // ============================================================

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(
        "Error deleting product: " +
          error.message
      );

      return;
    }

    await fetchProducts();
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* ================================================== */}
        {/* PAGE TITLE */}
        {/* ================================================== */}

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin: Manage Products
        </h1>

        {/* ================================================== */}
        {/* ADD PRODUCT FORM */}
        {/* ================================================== */}

        <form
          id="product-form"
          onSubmit={handleAddProduct}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 space-y-8"
        >

          {/* ============================================== */}
          {/* BASIC DETAILS */}
          {/* ============================================== */}

          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              1. Basic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Product Name */}
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              />

              {/* Price */}
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              />

              {/* Amazon Link */}
              <input
                type="url"
                name="amazon_link"
                required
                value={formData.amazon_link}
                onChange={handleChange}
                placeholder="Amazon / Purchase Link URL"
                className="w-full px-4 py-2 border border-yellow-400 bg-yellow-50 rounded-lg focus:ring-2 focus:ring-black outline-none md:col-span-2"
              />

              {/* Description */}
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Full Product Description..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none md:col-span-2 resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* ============================================== */}
          {/* PRODUCT IMAGES */}
          {/* ============================================== */}

          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              2. Product Images
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Choose to either upload a file from your
              PC <b>OR</b> paste a direct image URL.
            </p>

            {/* ========================================== */}
            {/* MAIN IMAGE */}
            {/* ========================================== */}

            <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">

              <label className="block text-sm font-bold text-gray-900 mb-3">
                Main Thumbnail (Required)
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                {/* File */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleMainFileChange
                  }
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                />

                <span className="text-center text-gray-400 font-medium hidden md:block">
                  OR
                </span>

                {/* URL */}
                <input
                  type="url"
                  name="image_url"
                  value={
                    formData.image_url
                  }
                  onChange={handleChange}
                  placeholder="Paste Image URL here..."
                  disabled={!!mainFile}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none disabled:opacity-50 disabled:bg-gray-100"
                />

              </div>

              {/* Selected file */}
              {mainFile && (
                <p className="text-xs text-green-600 mt-3">
                  ✓ Selected:{" "}
                  {mainFile.name}
                </p>
              )}
            </div>

            {/* ========================================== */}
            {/* GALLERY */}
            {/* ========================================== */}

            <div>

              <label className="block text-sm font-bold text-gray-900 mb-3">
                Gallery Images (Optional - up to 4)
              </label>

              <div className="space-y-4">

                {[0, 1, 2, 3].map(
                  (index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >

                      {/* Gallery File */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleGalleryFileChange(
                            index,
                            e
                          )
                        }
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
                      />

                      {/* Gallery URL */}
                      <input
                        type="url"
                        value={
                          formData
                            .gallery_urls[
                            index
                          ]
                        }
                        onChange={(e) =>
                          handleGalleryUrlChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Gallery URL ${
                          index + 1
                        }`}
                        disabled={
                          !!galleryFiles[
                            index
                          ]
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none text-sm disabled:opacity-50 disabled:bg-gray-100"
                      />

                      {/* Selected gallery file */}
                      {galleryFiles[
                        index
                      ] && (
                        <p className="text-xs text-green-600 md:col-span-2">
                          ✓ Selected:{" "}
                          {
                            galleryFiles[
                              index
                            ]?.name
                          }
                        </p>
                      )}

                    </div>
                  )
                )}

              </div>
            </div>
          </div>

          {/* ============================================== */}
          {/* SUBMIT */}
          {/* ============================================== */}

          <div className="pt-4 flex flex-col md:flex-row items-start md:items-center gap-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : "+ Add Product to Store"}
            </button>

            {loading && (
              <span className="text-sm font-medium text-blue-600 animate-pulse">
                {uploadStatus}
              </span>
            )}

          </div>
        </form>

        {/* ================================================== */}
        {/* CURRENT PRODUCTS */}
        {/* ================================================== */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Current Products
          </h2>

          <div className="space-y-4">

            {products.map(
              (product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
                >

                  {/* Product Information */}
                  <div className="flex items-center gap-4 min-w-0">

                    {/* Image */}
                    <img
                      src={
                        product.image_url
                      }
                      alt={
                        product.name
                      }
                      className="w-16 h-16 rounded-lg object-cover border flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                    <div className="min-w-0">

                      <h3 className="font-bold text-gray-900 truncate">
                        {
                          product.name
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p className="text-xs text-blue-500 mt-1 truncate max-w-xs">
                        Link:{" "}
                        {product.amazon_link ||
                          "None"}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Gallery:{" "}
                        {Array.isArray(
                          product.gallery_urls
                        )
                          ? product
                              .gallery_urls
                              .length
                          : 0}{" "}
                        image(s)
                      </p>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">

                    {/* Availability */}
                    <button
                      onClick={() =>
                        handleToggleAvailability(
                          product.id,
                          product.is_available
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        product.is_available !==
                        false
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {product.is_available !==
                      false
                        ? "In Stock"
                        : "Out of Stock"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      className="text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              )
            )}

            {/* No Products */}
            {products.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                No products found. Add one
                above!
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
