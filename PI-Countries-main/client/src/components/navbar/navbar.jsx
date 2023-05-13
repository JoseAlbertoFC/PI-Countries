import React from 'react';
import "./navbar.css"

function Navbar() {
  return (
    <div className='search-box'>
        <form>
          <input placeholder = "Search"/>
          <button>Search</button>
        </form>
    </div>
  )
}

export default Navbar