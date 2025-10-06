import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RateLimitedUI';
import toast from "react-hot-toast"
import NoteCard from '../Components/NoteCard';
import axiosInstance from '../lib/axios';
import NotesNotFound from '../Components/NotesNotFound';
import { useDebounce } from '../hooks/hooks';
import { sortPinnedNotes } from '../lib/utils';




const HomePage = () => {

    //isRateLimited is the value and setIsRateLimited is the function that defines if isRateLimited true or false.
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]); //State to store the fetched notes
    const [loading, setLoading] = useState(true);//loading = true means "we are currently fetching values/ waiting for data" 
    const [isOpen, setIsOpen] = useState(false); //This decides whether the search icon is a search icon or bar
    const [searchTerm, setSearchTerm ] = useState('');
    const debouncedSearch = useDebounce(searchTerm); //debouncedSearch is the returned value of useDebounced function which is the debouncedValue in the function
    

    const toggleSearch = () => { // Toggle search input visibility
        setIsOpen(prev => !prev); 
    } 

    // Handle pinning/unpinning a note
    const handlePin = async (e, id) => {
        e.preventDefault();
        console.log(`From homepage UI, Note id${id} was clicked`);
        try {
            const res = await axiosInstance.patch(`/notes/${id}/pin`);
            const updatedNote = res.data;

            setNotes(prevNotes => {
                const newNotes = prevNotes.map(note =>
                    note._id === updatedNote._id ? updatedNote : note
                );
            // Call your sort util
                return sortPinnedNotes(newNotes);
            });
            console.log(res.data);
        } catch (error) {
            console.log("Error flipping note pin value", error);
            toast.error("Error pinning note");
        }
    }

    

    useEffect(() => {
        // Fetch all notes from backend
        const fetchNotes = async () => {
            try {
                //res stands for response its javascript convention
                const res = await axiosInstance.get("/notes"); //Make a get request to my api to fetch all the notes
                console.log(res.data); 
                setNotes(res.data);
                setIsRateLimited(false); // Reset rate-limit state on success
            } catch (error) {//cathces any errors 
                console.log("Error fetching notes", error);

                if(error.response?.status === 429) { //if condition checks if error is due to rateLimit
                     setIsRateLimited(true); // Show rate-limit UI if too many requests
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setLoading(false); //loading = false means "fetching finished, show the actual data or errors"
            }
        }

        // Fetch notes filtered by search term
        const fetchNotesBySearch = async () => {
            try {
                const res = await axiosInstance.get(`/notes?search=${debouncedSearch}`) //this is how to make an api request by searchItems
                if(res.data.length === 0) {
                    toast.error("Notes do not exit");
                }
                console.log(res.data);
                setNotes(res.data);
            } catch (error) {
                console.log("Error fetching notes", error);
                
            }
        }

        

        if(!searchTerm) {
            fetchNotes(); //Fetch all notes if search is empty
        } else {
            fetchNotesBySearch(); //fetch filtered notes if search is not empty
        }
        
        
    }, [debouncedSearch]) //Dependency Array means, controls when the useEffect fires Re-run the useEffect whenever searchTerm changes

    

  return (
    <div className='min-h-screen'>
        {/* Pass search state and toggle function to Navbar */}
        <Navbar isOpen={isOpen} toggleSearch={toggleSearch} setSearchTerm={setSearchTerm}/>

        {/* Below is react conditional rendering.  
        What is the syntax means is that if a condition is true a react component is rendered.
        In this context if isRateLimited is true, then render on screen RateLimitedUI componnt.
        If isRateLimited is not true, the show nothing.*/}
        {isRateLimited && <RateLimitedUI />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {/* If the left side is true return the right side
            If the left side is false return false (the code on the right is not rendered)*/}
            {loading && <div className='text-center text-primary py-10'>Loading notes....</div> }

            {/* if there are no notes and we have not reached the rateLimit, 
            then display NotesNotFound component */}
            {notes.length === 0 && !isRateLimited && <NotesNotFound />} 

            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) => (
                       <NoteCard key={note._id} note={note} setNotes={setNotes} handlePin={handlePin} /> 
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default HomePage