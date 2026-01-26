import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ChannelCard from '../components/ChannelCard/ChannelCard'
import Pagination from '../components/Pagination/Pagination'
import AIChat from '../components/AIChat/AIChat'
import './ChannelsListPage.css'

function ChannelsListPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [channels, setChannels] = useState([])
  const [totalChannels, setTotalChannels] = useState(0)
  const [activeSort, setActiveSort] = useState('subscribers')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const itemsPerPage = 15

  useEffect(() => {
    fetchChannels()
  }, [activeSort, sortDirection, searchQuery, categoryParam, currentPage])

  const fetchChannels = async () => {
    try {
      const params = new URLSearchParams()


      params.append('_page', currentPage)
      params.append('_limit', itemsPerPage)

      if (searchQuery) {
        params.append('q', searchQuery)
      }

      if (categoryParam) {
        params.append('category_like', categoryParam)
      }

      const sortFieldMap = {
        'subscribers': 'subscribers',
        'videos': 'videos',
        'rating': 'rating'
      }

      params.append('_sort', sortFieldMap[activeSort])
      params.append('_order', sortDirection)

      const response = await fetch(`http://localhost:3000/channels?${params.toString()}`)

      const totalCount = response.headers.get('X-Total-Count')
      if (totalCount) {
        setTotalChannels(parseInt(totalCount))
      }

      const data = await response.json()
      setChannels(data)
    } catch (error) {
      console.error('Error fetching channels:', error)
      setChannels([])
      setTotalChannels(0)
    }
  }

  const handleSortClick = (sortType) => {
    if (activeSort === sortType) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setActiveSort(sortType)
      setSortDirection('desc')
    }
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalChannels / itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, categoryParam])

  return (
    <div className="channels-list-page">
      <Header />

      <main className="channels-list-content">
        <div className="breadcrumb">
          <Link to="/">Головна</Link> / Канали
        </div>

        <div className="page-header">
          <h1 className="page-title">
            Список україномовних ютуб-каналів
          </h1>
        </div>

        <div className="search-filter-row">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Пошук каналу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-button" onClick={() => setShowFilterMenu(!showFilterMenu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H10M10 7C10 8.65685 11.3431 10 13 10C14.6569 10 16 8.65685 16 7M10 7C10 5.34315 11.3431 4 13 4C14.6569 4 16 5.34315 16 7M16 7H21M3 17H10M10 17C10 18.6569 11.3431 20 13 20C14.6569 20 16 18.6569 16 17M10 17C10 15.3431 11.3431 14 13 14C14.6569 14 16 15.3431 16 17M16 17H21" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="sort-buttons">
          <button
            className={`sort-btn ${activeSort === 'subscribers' ? 'active' : ''} ${activeSort === 'subscribers' && sortDirection === 'asc' ? 'sort-asc' : ''}`}
            onClick={() => handleSortClick('subscribers')}
          >
            Підписники
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`sort-btn ${activeSort === 'videos' ? 'active' : ''} ${activeSort === 'videos' && sortDirection === 'asc' ? 'sort-asc' : ''}`}
            onClick={() => handleSortClick('videos')}
          >
            Відео
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`sort-btn ${activeSort === 'rating' ? 'active' : ''} ${activeSort === 'rating' && sortDirection === 'asc' ? 'sort-asc' : ''}`}
            onClick={() => handleSortClick('rating')}
          >
            Оцінка
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="channels-grid">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              variant="compact"
            />
          ))}
        </div>

        {channels.length === 0 && (
          <div className="empty-state">
            <p>Не знайдено каналів за вашим запитом</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />

      {/* AI Chat Helper Button */}
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

export default ChannelsListPage
