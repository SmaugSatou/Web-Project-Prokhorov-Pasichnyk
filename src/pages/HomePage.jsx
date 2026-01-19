import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ChannelCard from '../components/ChannelCard/ChannelCard'
import AIChat from '../components/AIChat/AIChat'
import './HomePage.css'

function HomePage() {
  const [channels, setChannels] = useState([])
  const [allChannels, setAllChannels] = useState([])
  const [filter, setFilter] = useState('recommendations')
  const [savedCount, setSavedCount] = useState(0)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllChannels, setShowAllChannels] = useState(false)

  useEffect(() => {
    fetchChannels()
    fetchSavedCount()
  }, [])

  const fetchSavedCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/saved-channels')
      const data = await response.json()
      setSavedCount(data.length)
    } catch (error) {
      console.error('Error fetching saved count:', error)
      setSavedCount(3)
    }
  }

  useEffect(() => {
    filterChannels()
  }, [filter, allChannels, selectedCategory])

  const fetchChannels = async () => {
    try {
      const response = await fetch('http://localhost:3000/channels')
      const data = await response.json()
      setAllChannels(data)
    } catch (error) {
      console.error('Error fetching channels:', error)
      const mockData = getMockChannels()
      setAllChannels(mockData)
    }
  }

  const filterChannels = () => {
    let filtered = [...allChannels]

    if (selectedCategory) {
      filtered = filtered.filter(channel => {
        if (!channel.category) return false
        const categories = channel.category.split(',').map(cat => cat.trim())
        return categories.some(cat =>
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      })
    }

    if (filter === 'new') {
      filtered = filtered.reverse()
    } else if (filter === 'top') {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else {
      filtered = [...filtered]
    }

    setChannels(filtered)
  }

  const handleCategoryClick = (categoryLabel) => {
    const categoryMap = {
      'Англійська мова': 'Англійська мова',
      'Ігрові світи та лор': 'Ігри',
      'Книги': 'Книги',
      'Трукрайм': 'Трукрайм',
      'Аніме': 'Аніме',
      'Новини': 'Новини',
      'Навчання': 'Навчання',
      'Летсплеї': 'Летсплеї',
      'Кіно та серіали': 'Кіно',
      'Музика': 'Музика',
      'Кулінарія': 'Кулінарія',
      'Спорт та фітнес': 'Спорт',
      'Наука': 'Наука',
      'Технології': 'Технології',
      'Мистецтво': 'Мистецтво',
      'Подорожі': 'Подорожі'
    }

    const searchTerm = categoryMap[categoryLabel]
    if (selectedCategory === searchTerm) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(searchTerm)
    }
  }

  const categories = [
    { emoji: '🎮', label: 'Ігрові світи та лор' },
    { emoji: '📚', label: 'Книги' },
    { emoji: '👮', label: 'Трукрайм' },
    { emoji: '🌸', label: 'Аніме' },
    { emoji: '📰', label: 'Новини' },
    { emoji: '🌟', label: 'Летсплеї' }
  ]

  const allCategories = [
    { emoji: '🎮', label: 'Ігрові світи та лор' },
    { emoji: '📚', label: 'Книги' },
    { emoji: '👮', label: 'Трукрайм' },
    { emoji: '🌸', label: 'Аніме' },
    { emoji: '📰', label: 'Новини' },
    { emoji: '🌟', label: 'Летсплеї' },
    { emoji: '🎬', label: 'Кіно' },
    { emoji: '🎵', label: 'Блоги' },
    { emoji: '🔬', label: 'Наука' },
    { emoji: '💻', label: 'Технології' },
    { emoji: '🎨', label: 'Мистецтво' },
    { emoji: '✈️', label: 'Подорожі' },
    { emoji: '🎞️', label: 'Шортси' },
    { emoji: '🏋️', label: 'Спорт' }
  ]

  const displayedCategories = showAllCategories ? allCategories : categories

  return (
    <div className="home-page">
      <Header />

      <main className="home-content">
        <div className="content-wrapper">
          {/* Helper Bubble */}
          <div className="helper-bubble">
            <div className="bubble-text">
              Маєш проблеми з пошуком?
            </div>
            <button
              className="helper-button"
              aria-label="Помічник"
              onClick={() => setAiChatOpen(true)}
            >
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none">
                <path d="M18.5 2L22.8 14.2L35 18.5L22.8 22.8L18.5 35L14.2 22.8L2 18.5L14.2 14.2L18.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Saved Channels */}
          <Link to="/saved" className="saved-section">
            <h3 className="h3">Збережені канали</h3>
            <div className="saved-info">
              <div className="saved-count">{savedCount}</div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          {/* Theme Collections */}
          <section className="section">
            <div className="section-header">
              <h3 className="h3">Тематичні добірки</h3>
              <Link to="/categories" className="view-all-btn caption">
                переглянути всі
              </Link>
            </div>
            <div className="categories-grid">
              {displayedCategories.map((cat, index) => {
                const categoryMap = {
                  'Англійська мова': 'Англійська мова',
                  'Ігрові світи та лор': 'Ігри',
                  'Книги': 'Книги',
                  'Трукрайм': 'Трукрайм',
                  'Аніме': 'Аніме',
                  'Новини': 'Новини',
                  'Навчання': 'Навчання',
                  'Летсплеї': 'Летсплеї',
                  'Кіно та серіали': 'Кіно',
                  'Музика': 'Музика',
                  'Кулінарія': 'Кулінарія',
                  'Спорт та фітнес': 'Спорт',
                  'Наука': 'Наука',
                  'Технології': 'Технології',
                  'Мистецтво': 'Мистецтво',
                  'Подорожі': 'Подорожі'
                }
                const isActive = selectedCategory === categoryMap[cat.label]
                return (
                  <button
                    key={index}
                    className={`category-chip ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.label)}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* YouTube Channels */}
          <section className="section channels-section">
            <div className="section-header">
              <h3 className="h3">Ютуб-канали</h3>
              <Link to="/channels" className="view-all-btn caption">
                переглянути всі
              </Link>
            </div>

            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'recommendations' ? 'active' : ''}`}
                onClick={() => setFilter('recommendations')}
              >
                Рекомендації
              </button>
              <button
                className={`filter-tab ${filter === 'new' ? 'active' : ''}`}
                onClick={() => setFilter('new')}
              >
                Нове
              </button>
              <button
                className={`filter-tab ${filter === 'top' ? 'active' : ''}`}
                onClick={() => setFilter('top')}
              >
                Топ
              </button>
            </div>

            <div className="channels-list">
              {channels.slice(0, 6).map((channel, index) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  variant={index === 0 ? 'full' : 'compact'}
                />
              ))}
            </div>
          </section>

          {/* Add Channel */}
          <section className="section add-channel-section">
            <h3 className="h3">Додати ютуб-канал</h3>
            <div className="add-channel-text">
              <p>
                Заповніть форму, щоб запропонувати канал.
                <br />
                <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються!</strong>
                <br />
                Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті.
              </p>
              <p>
                Додавання безкоштовне. Дякуємо за підтримку українського контенту!
              </p>
            </div>
            <Link to="/add-channel" className="primary-button">
              Заповнити форму
            </Link>
          </section>
        </div>
      </main>

      <Footer />
      <AIChat isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </div>
  )
}

export default HomePage
