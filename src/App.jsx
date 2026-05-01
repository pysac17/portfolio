import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home, About, Projects, Contact, ArtGallery} from './pages'

const App = () => {
return (
    <Router>
        <Navbar /> 
        <main>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/about' element={ <About /> } />
                <Route path='/projects' element={ <Projects /> } />
                <Route path='/art' element={ <ArtGallery /> } />
                <Route path='/contact' element={ <Contact /> } />
            </Routes>
        </main>
    </Router>
)
}

export default App