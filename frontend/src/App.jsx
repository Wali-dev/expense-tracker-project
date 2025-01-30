
import './App.css'

import Home from './components/Pages/Home'
import Navbar from './components/Pages/Navbar'
import Report from './components/Pages/Report'
import SignIn from './components/Pages/Signin'
import SignUp from './components/Pages/Signup'


function App() {

  return (
    <>
      <div className='max-w-[960px] mx-auto '>
        {/* <Navbar /> */}
        <Home />
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        <Report />
      </div>

    </>
  )
}

export default App
