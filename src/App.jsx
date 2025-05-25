import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EditPost from './pages/EditPost'
import AddPost from './pages/AddPost'
import PostDetails from './pages/PostDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
