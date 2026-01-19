import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  const [savedChannels, setSavedChannels] = useState([])
  const [userChannels, setUserChannels] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [channelName, setChannelName] = useState('')
  const [channelUrl, setChannelUrl] = useState('')

  const user = {
    name: 'Бавовнятко',
    email: 'Bavovnyatko@gmail.com',
    avatar: '/assets/profile_icons/my.png',
    youtubeConnected: true
  }

  const handleImageError = (e) => {
    e.target.src = '/assets/channel_icons/default.png'
  }

  useEffect(() => {
    fetchSavedChannels()
    fetchUserChannels()
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
          handle: '@meliormax',
          subscribers: '45,1 тис.',
          videos: '957',
          rating: 4.8,
          avatar: 'https://via.placeholder.com/60'
        },
        {
          id: 2,
          name: 'thetremba',
          handle: '@thetremba',
          subscribers: '116 тис.',
          videos: '455',
          rating: 4.9,
          avatar: 'https://via.placeholder.com/60'
        },
        {
          id: 3,
          name: 'PlayUA',
          handle: '@PlayUA',
          subscribers: '23,6 тис.',
          videos: '1900',
          rating: 4.5,
          avatar: 'https://via.placeholder.com/60'
        }
      ])
    }
  }

  const fetchUserChannels = async () => {
    setUserChannels([
      {
        id: 1,
        name: 'Melior Max',
        handle: '@meliormax',
        subscribers: '45,1 тис.',
        videos: '957',
        rating: 4.8,
        avatar: 'https://via.placeholder.com/60',
        status: 'approved',
        description: 'Привіт мене звати Макс і я роблю летсплей українською на моєму каналі.'
      }
    ])
  }

  const handleRemoveChannel = (channelId) => {
    setSavedChannels(savedChannels.filter(ch => ch.id !== channelId))
  }

  const handleSubmitChannel = (e) => {
    e.preventDefault()
    if (!channelName.trim() || !channelUrl.trim()) return

    alert('Канал відправлено на модерацію!')
    setChannelName('')
    setChannelUrl('')
  }

  const filteredUserChannels = userChannels.filter(channel => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'moderation') return channel.status === 'moderation'
    if (activeFilter === 'new') return channel.status === 'approved'
    if (activeFilter === 'rejected') return channel.status === 'rejected'
    return true
  })

  return (
    <div className="profile-page">
      <Header />

      <main className="profile-content">
        <div className="profile-container">
          {/* User Profile Section */}
          <div className="user-profile-header">
            <div className="user-avatar">
              <img 
                src={user.avatar} 
                alt={user.name}
                onError={handleImageError}
              />
            </div>
            <div className="user-info">
              <h1 className="user-name">{user.name}</h1>
              <p className="user-email">{user.email}</p>
            </div>
            <button className="edit-profile-button" aria-label="Редагувати профіль">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80957 15.8327 1.80957C16.1422 1.80957 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1898 3.85714 18.1898 4.16667C18.1898 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* YouTube Connected */}
          {user.youtubeConnected && (
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-connected-button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M19.582 5.155a2.513 2.513 0 0 0-1.768-1.778C16.254 2.954 10 2.954 10 2.954s-6.254 0-7.814.42a2.513 2.513 0 0 0-1.768 1.778C0 6.725 0 10 0 10s0 3.275.418 4.845a2.513 2.513 0 0 0 1.768 1.778c1.56.42 7.814.42 7.814.42s6.254 0 7.814-.42a2.513 2.513 0 0 0 1.768-1.778C20 13.275 20 10 20 10s0-3.275-.418-4.845zM7.955 12.973V7.027L13.182 10l-5.227 2.973z"/>
              </svg>
              YouTube підключено
            </a>
          )}

          {/* Вподобання Section */}
          <Link to="/" className="preferences-link">
            <span>Вподобання</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Збережені канали Section */}
          <section className="saved-channels-section">
            <h2 className="section-title">Збережені канали</h2>
            <div className="saved-channels-list">
              {savedChannels.map(channel => (
                <div key={channel.id} className="saved-channel-card">
                  <div className="saved-channel-header">
                    <img 
                      src={channel.avatar || '/assets/channel_icons/default.png'} 
                      alt={channel.name} 
                      className="saved-channel-avatar"
                      onError={handleImageError}
                    />
                    <div className="saved-channel-info">
                      <h3 className="saved-channel-name">{channel.name}</h3>
                      <p className="saved-channel-handle">{channel.handle}</p>
                    </div>
                    <button
                      className="bookmark-icon-button active"
                      onClick={() => handleRemoveChannel(channel.id)}
                      aria-label="Видалити зі збережених"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 6.5C4 5.09987 4 4.3998 4.27248 3.86502C4.51217 3.39462 4.89462 3.01217 5.36502 2.77248C5.8998 2.5 6.59987 2.5 8 2.5H12C13.4001 2.5 14.1002 2.5 14.635 2.77248C15.1054 3.01217 15.4878 3.39462 15.7275 3.86502C16 4.3998 16 5.09987 16 6.5V17.5L10 14.1667L4 17.5V6.5Z"/>
                      </svg>
                    </button>
                    <a
                      href={`https://youtube.com/${channel.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube-icon-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M19.582 5.155a2.513 2.513 0 0 0-1.768-1.778C16.254 2.954 10 2.954 10 2.954s-6.254 0-7.814.42a2.513 2.513 0 0 0-1.768 1.778C0 6.725 0 10 0 10s0 3.275.418 4.845a2.513 2.513 0 0 0 1.768 1.778c1.56.42 7.814.42 7.814.42s6.254 0 7.814-.42a2.513 2.513 0 0 0 1.768-1.778C20 13.275 20 10 20 10s0-3.275-.418-4.845zM7.955 12.973V7.027L13.182 10l-5.227 2.973z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="saved-channel-stats">
                    <div className="stat-item-inline">
                      <span className="stat-value">{channel.subscribers}</span>
                      <span className="stat-label">підписників</span>
                    </div>
                    <div className="stat-item-inline">
                      <span className="stat-value">{channel.videos}</span>
                      <span className="stat-label">відео</span>
                    </div>
                    <div className="stat-item-inline rating">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1L8.575 5.33L13 5.83L10 8.85L10.65 13.5L7 11.485L3.35 13.5L4 8.85L1 5.83L5.425 5.33L7 1Z" fill="#FBB03B"/>
                      </svg>
                      <span className="stat-value">{channel.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Додати ютуб-канал Section */}
          <section className="add-channel-section">
            <h2 className="section-title">Додати ютуб-канал</h2>
            <p className="section-description">
              Заповніть форму, щоб запропонувати канал. Уваже розглядається лише українськими каналами, російськомовні НЕ дозволяється! Перевірте, чи канал ще не немає на сайті! Дані викладаємо згідно з ініціюють каналу. Додавання безкоштовне. Якщо ви підставу підтримку каналу.
            </p>
            <form onSubmit={handleSubmitChannel} className="add-channel-form">
              <div className="form-group">
                <label htmlFor="channelName" className="form-label">Назва каналу</label>
                <input
                  type="text"
                  id="channelName"
                  className="form-input"
                  placeholder="Введіть назву каналу"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="channelUrl" className="form-label">Посилання на канал</label>
                <input
                  type="url"
                  id="channelUrl"
                  className="form-input"
                  placeholder="https://youtube.com/@channel"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-channel-button">
                Заповнити форму
              </button>
            </form>
          </section>

          {/* Ваші додані ютуб-канали Section */}
          <section className="user-channels-section">
            <h2 className="section-title">Ваші додані ютуб-канали</h2>
            <div className="filter-buttons">
              <button
                className={`filter-button ${activeFilter === 'moderation' ? 'active' : ''}`}
                onClick={() => setActiveFilter('moderation')}
              >
                На модерації
              </button>
              <button
                className={`filter-button ${activeFilter === 'new' ? 'active' : ''}`}
                onClick={() => setActiveFilter('new')}
              >
                Нові
              </button>
              <button
                className={`filter-button ${activeFilter === 'rejected' ? 'active' : ''}`}
                onClick={() => setActiveFilter('rejected')}
              >
                Відхилено
              </button>
            </div>
            <div className="user-channels-list">
              {filteredUserChannels.map(channel => (
                <div key={channel.id} className="user-channel-card">
                  <div className="user-channel-header">
                    <img 
                      src={channel.avatar || '/assets/channel_icons/default.png'} 
                      alt={channel.name} 
                      className="user-channel-avatar"
                      onError={handleImageError}
                    />
                    <div className="user-channel-info">
                      <h3 className="user-channel-name">{channel.name}</h3>
                      <p className="user-channel-handle">{channel.handle}</p>
                    </div>
                    <a
                      href={`https://youtube.com/${channel.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube-icon-link"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M19.582 5.155a2.513 2.513 0 0 0-1.768-1.778C16.254 2.954 10 2.954 10 2.954s-6.254 0-7.814.42a2.513 2.513 0 0 0-1.768 1.778C0 6.725 0 10 0 10s0 3.275.418 4.845a2.513 2.513 0 0 0 1.768 1.778c1.56.42 7.814.42 7.814.42s6.254 0 7.814-.42a2.513 2.513 0 0 0 1.768-1.778C20 13.275 20 10 20 10s0-3.275-.418-4.845zM7.955 12.973V7.027L13.182 10l-5.227 2.973z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="user-channel-stats">
                    <div className="stat-item-inline">
                      <span className="stat-value">{channel.subscribers}</span>
                      <span className="stat-label">підписників</span>
                    </div>
                    <div className="stat-item-inline">
                      <span className="stat-value">{channel.videos}</span>
                      <span className="stat-label">відео</span>
                    </div>
                    <div className="stat-item-inline rating">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1L8.575 5.33L13 5.83L10 8.85L10.65 13.5L7 11.485L3.35 13.5L4 8.85L1 5.83L5.425 5.33L7 1Z" fill="#FBB03B"/>
                      </svg>
                      <span className="stat-value">{channel.rating}</span>
                    </div>
                  </div>
                  <p className="user-channel-description">{channel.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Logout Button */}
          <button
            className="logout-button"
            onClick={() => {
              alert('Вихід з облікового запису')
              navigate('/')
            }}
          >
            <span>Вийти</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProfilePage
