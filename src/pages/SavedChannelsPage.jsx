import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ChannelCard from '../components/ChannelCard/ChannelCard'
import AIChat from '../components/AIChat/AIChat'
import './SavedChannelsPage.css'

function SavedChannelsPage() {
  const [savedChannels, setSavedChannels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [aiChatOpen, setAiChatOpen] = useState(false)

  useEffect(() => {
    fetchSavedChannels()
  }, [])

  const fetchSavedChannels = async () => {
    try {
      const response = await fetch('http://localhost:3000/saved-channels')
      const data = await response.json()
      setSavedChannels(data)
    } catch (error) {
      console.error('Error fetching saved channels:', error)
      setSavedChannels([
        {
          id: 1,
          name: 'Melior Max',
          category: 'Ігри, Летсплеї',
          subscribers: '45,1 тис.',
          videos: '957',
          rating: 4.8,
          avatar: 'https://via.placeholder.com/120',
          youtubeUrl: 'https://youtube.com/@meliormax',
          description: 'Привіт мене звати Макс і я роблю летсплей українською на моєму каналі.'
        },
        {
          id: 2,
          name: 'thetremba',
          category: 'Ігри, Летсплеї',
          subscribers: '116 тис.',
          videos: '455',
          rating: 4.9,
          avatar: 'https://via.placeholder.com/120',
          youtubeUrl: 'https://youtube.com/@thetremba',
          description: 'можна просто Тремба. ми тут проходимо всі ігрові новинки.'
        },
        {
          id: 3,
          name: 'Загін Кіноманів',
          category: 'Кіно',
          subscribers: '693 тис.',
          videos: '298',
          rating: 4.3,
          avatar: 'https://via.placeholder.com/120',
          youtubeUrl: 'https://youtube.com/@zagin',
          description: 'QTV для нового покоління'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (channelId) => {
    try {
      await fetch(`http://localhost:3000/saved-channels/${channelId}`, {
        method: 'DELETE'
      })
      setSavedChannels(prev => prev.filter(ch => ch.id !== channelId))
    } catch (error) {
      console.error('Error removing channel:', error)
      setSavedChannels(prev => prev.filter(ch => ch.id !== channelId))
    }
  }

  const filteredChannels = savedChannels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="saved-page">
        <Header />
        <main className="saved-content">
          <div className="loading">Завантаження...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="saved-page">
      <Header />

      <main className="saved-content">
        <div className="saved-container">
          <div className="breadcrumb">
            <Link to="/">Головна</Link> / Збережені
          </div>

          <h1 className="saved-title">Список збережених україномовних ютуб-каналів</h1>

          <div className="controls-row">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="filter-toggle-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>У вас поки немає збережених каналів</p>
              <Link to="/" className="primary-button">
                Переглянути канали
              </Link>
            </div>
          ) : (
            <div className="saved-channels-grid">
              {filteredChannels.map(channel => (
                <ChannelCard key={channel.id} channel={channel} variant="full" />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <button className="ai-helper-btn" aria-label="AI помічник" onClick={() => setAiChatOpen(true)}>
        <div className="helper-tooltip">
          <span>Маєш проблеми з пошуком?</span>
        </div>
        <div className="helper-icon">
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none">
            <path d="M18.5 3.5L22.5 11.5L31 13.5L24.5 19.5L26.5 28L18.5 23.5L10.5 28L12.5 19.5L6 13.5L14.5 11.5L18.5 3.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      <AIChat isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </div>
  )
}

export default SavedChannelsPage
