import React, { useState } from "react";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    feedback: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // NEW: Convert the uploaded file into a Base64 string so localStorage can save it
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This saves the image as a long text string in our state
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReview = {
      id: Date.now(),
      name: formData.name,
      company: formData.company,
      feedback: formData.feedback,
      // Use the Base64 image, or a default avatar if they didn't upload one
      image: formData.image ? formData.image : "https://i.pravatar.cc/150?img=1"
    };

    const existingReviews = JSON.parse(localStorage.getItem("myReviews")) || [];
    
    // Add the new review to the list and save it back
    const updatedReviews = [newReview, ...existingReviews];
    localStorage.setItem("myReviews", JSON.stringify(updatedReviews));

    alert("Thanks for your feedback! Check the main page now.");
    
    // Reset form
    setFormData({ name: "", company: "", feedback: "", image: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Leave a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            {/* Quick preview to show the user their upload worked */}
            {formData.image && (
               <img src={formData.image} alt="Preview" className="mt-3 w-12 h-12 rounded-full object-cover shadow-sm" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
            <textarea
              name="feedback"
              required
              rows="4"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none resize-none"
              placeholder="Tell us about your experience..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;