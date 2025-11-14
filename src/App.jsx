import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import Logo from './assets/graduation_hat.png'
// import viteLogo from '/vite.svg'
import './App.css'

//pages import
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import Admin from './pages/Admin.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';


export default function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <img src={Logo}></img>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Home</NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Courses</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Favorites</NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Admin</NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Checkout</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Profile</NavLink>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:slug' element={<CourseDetails />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}