import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon, Pin } from 'lucide-react'
import { formatDate } from '../lib/utils'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes, handlePin }) => {


    const handleDelete = async (e, id) => {
        e.preventDefault(); //Prevents the page naviagting to NoteDetailPage when delete button is clicked

        if(!window.confirm("Are you sure you want to delete this note?")) { //If the user clicks no/ cancel on pop up, then exit this pop up
            return; 
        }

        try {
            await axiosInstance.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)); //This gets rid of the deleted note from the notes array in HomePage.jsx
            toast.success("Note deleted successfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    }

  return <Link to={`/note/${note._id}`}
    className="card bg-base-200 hover:shadow-lg transition-all duration-200
        border-t-4 border-solid border-blue-400"
  >
    <div className='card-body'>
        <h3 className='card-title tect-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-small text-base-content/60'>
                {formatDate(new Date(note.createdAt))}
            </span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className='size-4'/>
                </button>
                <button 
                    className={`btn btn-xs ${note.pinned ? "bg-red-500 text-white" : "btn-ghost text-error"}`} 
                    onClick={(e) => handlePin(e, note._id)}
                    >
                    <Pin className='size-4'></Pin>
                </button>
            </div>
        </div>
    </div>


  </Link>
  
}

export default NoteCard