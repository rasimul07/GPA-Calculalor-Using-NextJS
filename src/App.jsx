import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

import {Appbar} from './components/Appbar'
import ResponsiveDrawer from './components/ResponsiveDrawer'

import FindYgpa from './components/FindYgpa'
import {FindPercentage} from './components/FindPercentage'
import GpaEquator from './components/GpaEquator'
import FindSgpa from './components/FindSgpa'
import FindDgpa from './components/FindDgpa'
import HomePage from './components/HomePage'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState(null);
  const [token,setToken] = useState(localStorage.getItem('token'));
  return (
    <div>

      <Router>
      {/* <Appbar email={email} setEmail={setEmail}></Appbar> */}
        <Routes>
          {/* <Route path={'/appbar'} element={<Appbar></Appbar>}></Route> */}
          <Route path={'/'} element={<HomePage></HomePage>}></Route>
          <Route path={'/mydrawer'} element={<ResponsiveDrawer></ResponsiveDrawer>}></Route>
          <Route path={'/findYgpa'} element={<FindYgpa email={email} setEmail={setEmail}></FindYgpa>}></Route>
          <Route path={'/findPercentage'} element={<FindPercentage></FindPercentage>}></Route>
          <Route path={'/gpaEquator'} element={<GpaEquator></GpaEquator>}></Route>
          <Route path={'/findDgpa'} element={<FindDgpa></FindDgpa>}></Route>
          <Route path={'/findSgpa'} element={<FindSgpa></FindSgpa>}></Route>
          <Route path={'/signin'} element={<SignIn></SignIn>}></Route>
          <Route path={'/profile'} element={<Profile email={email} setEmail={setEmail}></Profile>}></Route>
          <Route path={'/editProfile'} element={<EditProfile email={email} setEmail={setEmail}></EditProfile>}></Route>

        </Routes>
      </Router>


    </div>

  )
}

export default App
