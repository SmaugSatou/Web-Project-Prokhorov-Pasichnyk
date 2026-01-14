import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChannelPage from './pages/ChannelPage'
import AddChannelPage from './pages/AddChannelPage'
import SavedChannelsPage from './pages/SavedChannelsPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import CategoriesPage from './pages/CategoriesPage'
import ChannelsListPage from './pages/ChannelsListPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/add-channel" element={<AddChannelPage />} />
        <Route path="/saved" element={<SavedChannelsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/channels" element={<ChannelsListPage />} />
      </Routes>
    </Router>
  )
}

export default App
