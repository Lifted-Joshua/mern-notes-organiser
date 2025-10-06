import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';


const CreatePage = () => {

  const [title, setTitle] = useState(""); // State for note title
  const [content, setContent] = useState(""); // State for note content
  const [loading, setLoading] = useState(false); // State for submit button loading

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh on form submit
    
    if(!title.trim() || !content.trim()) { // Validates inputs
      console.log("All values are empty");
      toast.error("All fields are required");
      return;
    }

    setLoading(true);  // Disable button while request is in progress
    
    try {
        await axiosInstance.post("/notes/", { // Send POST request to create note
          title: title,
          content: content,
        })
        toast.success("Note created successfully!");
        navigate("/"); //Navigate back to homepage
    } catch (error) {
        console.log("Error creating note", error);
        if (error.response.status === 429) { // Handle rate limit
          toast.error("You have reached your note limit", {
            duration:4000,
            icon:"❗"
          });
      } else {
          toast.error("Failed to create note");
      }
      
    } finally {
        setLoading(false); // Re-enable button
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>



          <div className='card bg-base-100 p-6'> {/* add padding */}
            <div className='card-body p-0'> {/* remove default card-body padding to control spacing */}
              <div className='card-title text-2xl mb-6'>Create New Note</div> {/* increased bottom margin */}
              
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea 
                    placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Update state on textarea change
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"} 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage