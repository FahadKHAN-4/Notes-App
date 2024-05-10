import React, { useState } from 'react'

const Navbar = () => {

    const handleLogOut = () =>{
        localStorage.removeItem("token");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" href="/PastNotes">Past Notes</a></li>
                        </ul>
                    </div>
                    <form className="d-flex">
                        <a className="btn btn-danger mx-1" href="/Login" onClick={handleLogOut}>Log Out</a>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;