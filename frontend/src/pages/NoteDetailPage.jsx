import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { LoaderIcon, ArrowLeftIcon,Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {

  const [note, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams() //useParams extracts the id from the url and we assign it to id


  //This useEffect fetches the notes with the specific id, as soon as the page loads 
  useEffect(() => {

    const fetchNote = async() => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching the notes", error);
        toast.error("Error fetching notes");
      } finally {
        setLoading(false);
      }
    } 
    fetchNote();

  }, [id])//id is the dependency array. When the id changes useEffect is re-run

  console.log({ note });

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note")) return;

    try {
      await axiosInstance.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }

  };


  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content")
      return;
    }

    setSaving(true);

    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }

  };


  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>

    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder='Note title!'
                  className='input input-bordered'
                  value={note.title} //Setting the value of the input field to the note title
                  // Updates the note state on every keystroke:
                  // - Keeps all other fields the same (...note)
                  // - Replaces only the title field with the current input value
                  onChange={(e) => setNotes({ ...note, title: e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNotes({...note, content: e.target.value })}
                />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default NoteDetailPage