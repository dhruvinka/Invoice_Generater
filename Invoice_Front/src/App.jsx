import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Menubar from './components/Menubar'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard'
import MainPage from './pages/MainPage'
import Preview from './pages/Preview'
import UserSyncHandler from './components/UserSyncHandler'
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'

export default function App() {
  return (
   <BrowserRouter>
   <UserSyncHandler />
   <Menubar/>
   <Toaster/>
   <Routes>
       <Route path='/' element={<LandingPage/>}/>


       <Route path='/dashboard' element={
        <>
        <SignedIn>
          <Dashboard/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
       }/>

       <Route path='/generate' element={
        <>
        <SignedIn>
          <MainPage/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
       }/>

       
       <Route path='/preview' element={
        <>
        <SignedIn>
          <Preview/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
       }/>



       {/* <Route path='/generate' element={<MainPage/>}/>
       <Route path='/preview' element={<Preview/>}/> */}
   </Routes>
   
   </BrowserRouter>
  )
}
