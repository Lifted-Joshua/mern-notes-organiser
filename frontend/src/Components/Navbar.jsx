import { Link } from 'react-router'
import { PlusIcon, Search } from 'lucide-react'




const Navbar = ( props ) => {//Here we are passing in the functions as props
    const { isOpen: isOpen, toggleSearch: toggleSearch, setSearchTerm:  setSearchTerm} = props; //breaking down props object variables and assigning it to navbar.jsx local variables

    let searchElement;//Variable which we will assign a component to, to display in ui

    if(isOpen) { //this means if isOpen is true. isOpen by default is false
        searchElement =  (
            <div className="relative w-full max-w-sm">
                {isOpen && (
                    <input
                    className="rounded-md w-full pr-10 pl-2" // full width, padding-right for icon, padding-left for typing comfort
                    placeholder="Search notes..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}
                <Search
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
                    onClick={toggleSearch}
                />
                </div>
            );
    } else {
        searchElement = <Search className=' size-7 mr-5 text-primary' onClick={toggleSearch}/>
    }

    

  return (
    <header className='bg-base-300 border-b border-base-conten/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Notes Organizer</h1>
                <div className='flex items-center gap-4 '>
                    <div>{searchElement}</div>
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className='size-5' />
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar