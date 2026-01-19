import React, { useState } from 'react'
import './SearchModal.css'

function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleImageError = (e) => {
    e.target.src = '/assets/channel_icons/default.png'
  }

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch('http://localhost:3000/channels')
      const channels = await response.json()

      const results = channels.filter(channel =>
        channel.name.toLowerCase().includes(query.toLowerCase()) ||
        channel.category.toLowerCase().includes(query.toLowerCase()) ||
        (channel.description && channel.description.toLowerCase().includes(query.toLowerCase()))
      )

      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  const handleResultClick = (channelId) => {
    onClose()
    window.location.href = `/channel/${channelId}`
  }

  if (!isOpen) return null

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Пошук каналів..."
              value={searchQuery}
              onChange={handleInputChange}
              autoFocus
            />
            <button className="search-close" onClick={onClose} aria-label="Закрити">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="search-modal-content">
          {!searchQuery && (
            <div className="search-suggestions">
              <h3 className="search-section-title">Популярні запити</h3>
              <div className="search-tags">
                <button className="search-tag" onClick={() => { setSearchQuery('Ігри'); handleSearch('Ігри'); }}>
                  Ігри
                </button>
                <button className="search-tag" onClick={() => { setSearchQuery('Летсплеї'); handleSearch('Летсплеї'); }}>
                  Летсплеї
                </button>
                <button className="search-tag" onClick={() => { setSearchQuery('Стріми'); handleSearch('Стріми'); }}>
                  Стріми
                </button>
                <button className="search-tag" onClick={() => { setSearchQuery('Навчання'); handleSearch('Навчання'); }}>
                  Навчання
                </button>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="search-loading">Пошук...</div>
          )}

          {searchQuery && !isSearching && searchResults.length === 0 && (
            <div className="search-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>Нічого не знайдено</p>
              <span>Спробуйте інший запит</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="search-results">
              <h3 className="search-section-title">Знайдено каналів: {searchResults.length}</h3>
              <div className="search-results-list">
                {searchResults.map(channel => (
                  <div
                    key={channel.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(channel.id)}
                  >
                    <div className="search-result-avatar">
                      {channel.avatar ? (
                        <img 
                          src={channel.avatar} 
                          alt={channel.name}
                          onError={handleImageError}
                        />
                      ) : (
                        <img 
                          src="/assets/channel_icons/default.png" 
                          alt={channel.name}
                        />
                      )}
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-name">{channel.name}</div>
                      <div className="search-result-meta">
                        <span>{channel.category}</span>
                        <span>•</span>
                        <span>{channel.subscribers}</span>
                      </div>
                    </div>
                    <div className="search-result-rating">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L10.09 5.26L14.79 5.90L11.39 9.22L12.18 13.88L8 11.67L3.82 13.88L4.61 9.22L1.21 5.90L5.91 5.26L8 1Z" fill="#FBB03B"/>
                      </svg>
                      <span>{channel.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
