import React, { useState, useEffect } from 'react'

export const Header = () => {

    const [navSelection, setNavSelection] = useState('home')
    
    useEffect(() => {
        switch(navSelection){
            case 'home':
                console.log(navSelection)
                break;
            case 'uploadImage':
                console.log(navSelection)
                break;
            case 'captureImage':
                console.log(navSelection)
                break;
            default:
                console.log(navSelection)
        }
        return () => {
            console.log("This is a cleanup.")
        }
    }, [navSelection])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={() => setNavSelection('home')} href="#">Cat vs Dog Classifier</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => setNavSelection('uploadImage')}  href="#">Upload Image</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={() => setNavSelection('captureImage')}  href="#">Capture Image</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
