import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './ChannelPage.css'

function ChannelPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [channel, setChannel] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [similarChannels, setSimilarChannels] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showDescriptionToggle, setShowDescriptionToggle] = useState(false)
  const descriptionRef = React.useRef(null)

  useEffect(() => {
    fetchChannelDetails()
    fetchSimilarChannels()
    fetchComments()
  }, [id])

  useEffect(() => {
    if (descriptionRef.current && channel) {
      // Use a timeout to ensure the element is fully rendered
      setTimeout(() => {
        const element = descriptionRef.current
        if (!element) return

        // Get the computed line-height
        const computedStyle = window.getComputedStyle(element)
        const lineHeight = parseFloat(computedStyle.lineHeight) || 16
        const fontSize = parseFloat(computedStyle.fontSize) || 16
        const effectiveLineHeight = lineHeight === 'normal' ? fontSize * 1.2 : lineHeight

        // Count the number of lines by creating a temporary element
        const tempDiv = document.createElement('div')
        tempDiv.style.cssText = computedStyle.cssText
        tempDiv.style.position = 'absolute'
        tempDiv.style.visibility = 'hidden'
        tempDiv.style.width = element.offsetWidth + 'px'
        tempDiv.style.height = 'auto'
        tempDiv.style.maxHeight = 'none'
        tempDiv.style.whiteSpace = computedStyle.whiteSpace
        tempDiv.textContent = channel.description
        document.body.appendChild(tempDiv)

        const contentHeight = tempDiv.scrollHeight
        document.body.removeChild(tempDiv)

        // Calculate approximate number of lines
        const numberOfLines = Math.ceil(contentHeight / effectiveLineHeight)

        // Show toggle if content has more than 11 lines
        const shouldShowToggle = numberOfLines > 11
        setShowDescriptionToggle(shouldShowToggle)
      }, 100)
    }
  }, [channel])

  const fetchChannelDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/channels/${id}`)
      if (!response.ok) {
        throw new Error('Channel not found')
      }
      const data = await response.json()
      setChannel(data)
    } catch (error) {
      console.error('Error fetching channel:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/comments?channelId=${id}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      setComments([])
    }
  }

  const fetchSimilarChannels = async () => {
    try {
      const response = await fetch('http://localhost:3000/channels')
      if (response.ok) {
        const allChannels = await response.json()
        const similar = allChannels.filter(c => c.id !== id).slice(0, 3)
        setSimilarChannels(similar)
      }
    } catch (error) {
      console.error('Error fetching similar channels:', error)
      setSimilarChannels([])
    }
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
    // Here you would also update the saved status in the backend
  }

  const handleRating = (rating) => {
    setUserRating(rating)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: 'Ви',
      date: 'Щойно',
      rating: 5,
      text: commentText,
      avatar: 'https://via.placeholder.com/32'
    }

    setComments([newComment, ...comments])
    setCommentText('')
  }

  const toggleDescriptionExpand = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  if (isLoading) {
    return (
      <div className="channel-page">
        <Header />
        <main className="channel-content">
          <div className="loading">Завантаження...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="channel-page">
        <Header />
        <main className="channel-content">
          <div className="error">Канал не знайдено</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="channel-page">
      <Header />

      <main className="channel-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          Головна / Добірки / Летсплеї / {channel.name}
        </div>

        <div className="channel-container">
          {/* Main Channel Card */}
          <div className="main-channel-card">
            <div className="channel-card-avatar">
              <img src={channel.avatar} alt={channel.name} />
            </div>

            <button
              className={`channel-bookmark ${isSaved ? 'saved' : ''}`}
              onClick={toggleSave}
              aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? '#FBB03B' : 'none'} stroke={isSaved ? '#FBB03B' : '#9DA8B2'} strokeWidth="2">
                <path d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="channel-card-header">
              <div className="channel-card-info">
                <h1 className="channel-card-name">{channel.name}</h1>
                <p className="channel-card-category">{channel.category}</p>
              </div>
            </div>

            <a
              href={channel.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-youtube-button"
            >
              <svg width="25" height="18" viewBox="0 0 25 18" fill="white">
                <path d="M24.4363 2.8095C24.1902 1.84417 23.4385 1.07134 22.4969 0.817188C20.5261 0.272812 12.5 0.272812 12.5 0.272812C12.5 0.272812 4.47396 0.272812 2.50313 0.817188C1.56146 1.07134 0.809792 1.84417 0.563646 2.8095C0 4.8485 0 9.08813 0 9.08813C0 9.08813 0 13.3278 0.563646 15.3668C0.809792 16.3321 1.56146 17.105 2.50313 17.3591C4.47396 17.9035 12.5 17.9035 12.5 17.9035C12.5 17.9035 20.5261 17.9035 22.4969 17.3591C23.4385 17.105 24.1902 16.3321 24.4363 15.3668C25 13.3278 25 9.08813 25 9.08813C25 9.08813 25 4.8485 24.4363 2.8095Z" />
                <path d="M10 12.9063V5.26993L16.4773 9.08813L10 12.9063Z" fill="#FF0000"/>
              </svg>
              Перейти на канал
            </a>

            <div className="channel-card-stats">
              <div className="stat-box-wide">
                <span className="stat-label">Підписники</span>
                <span className="stat-value">{channel.subscribers}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Відео</span>
                <span className="stat-value">{channel.videos}</span>
              </div>
              <div className="stat-box-rating">
                <span className="stat-label">Оцінка</span>
                <div className="rating-value">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="#FBB03B">
                    <path d="M10 1.66667L12.5758 8.09001L19.2658 8.95834L14.6329 13.465L15.7142 20.1167L10 16.8858L4.28583 20.1167L5.36708 13.465L0.734167 8.95834L7.42417 8.09001L10 1.66667Z"/>
                  </svg>
                  <span>{channel.rating}</span>
                </div>
              </div>
            </div>

            <div className={`channel-card-description ${isDescriptionExpanded ? 'expanded' : ''} ${showDescriptionToggle ? 'has-toggle' : ''}`}>
              <p ref={descriptionRef} className="description-text">{channel.description}</p>
              {showDescriptionToggle && (
                <button className="description-toggle" onClick={toggleDescriptionExpand}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isDescriptionExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Recommended Videos */}
          {channel.recommendedVideos && channel.recommendedVideos.length > 0 && (
            <div className="recommended-section">
              <h2 className="section-title">Рекомендовані відео</h2>
              <div className="video-scroll-container">
                {channel.recommendedVideos.map(video => (
                  <a
                    key={video.id}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card"
                  >
                    <div className="video-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="video-play-icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                          <circle cx="25" cy="25" r="25" fill="rgba(0, 0, 0, 0.3)"/>
                          <path d="M34 25L20 33.6603L20 16.3397L34 25Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    <p className="video-title">{video.title}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="rating-section">
            <h2 className="rating-title">Оцініть канал!</h2>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  className={`star-button ${userRating >= star ? 'active' : ''}`}
                  onClick={() => handleRating(star)}
                  aria-label={`Оцінити ${star} зірок`}
                >
                  <svg width="46" height="46" viewBox="0 0 46 46" fill={userRating >= star ? '#FBB03B' : 'none'} stroke={userRating >= star ? '#FBB03B' : '#9DA8B2'} strokeWidth="2">
                    <path d="M23 3.83334L28.3944 18.9133L44 20.6667L33.5 30.8717L35.7889 46.4167L23 39.3608L10.2111 46.4167L12.5 30.8717L2 20.6667L17.6056 18.9133L23 3.83334Z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <div className="comments-header">
              <h2 className="comments-title">Коментарі</h2>
              <div className="comments-count">{comments.length}</div>
            </div>

            {/* Comment Input */}
            <div className="comment-input-container">
              <div className="comment-input-wrapper">
                <div className="comment-user-avatar">
                  <img src="https://via.placeholder.com/32" alt="User" />
                </div>
                <div className="comment-input-field">
                  <textarea
                    placeholder="Напишіть коментар."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="2"
                  />
                  <span className="comment-hint">Коментарі приймаються тільки українською мовою.</span>
                </div>
              </div>
              <button className="comment-submit" onClick={handleCommentSubmit}>
                Коментувати
              </button>
            </div>

            {/* Comment List */}
            <div className="comments-list">
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    <img src={comment.avatar} alt={comment.author} />
                  </div>
                  <div className="comment-bubble">
                    <div className="comment-bubble-arrow"></div>
                    <div className="comment-bubble-content">
                      <div className="comment-meta">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.date}</span>
                        <div className="comment-rating-stars">
                          {Array.from({ length: comment.rating }).map((_, i) => (
                            <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FBB03B">
                              <path d="M10 1.66667L12.5758 8.09001L19.2658 8.95834L14.6329 13.465L15.7142 20.1167L10 16.8858L4.28583 20.1167L5.36708 13.465L0.734167 8.95834L7.42417 8.09001L10 1.66667Z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <button className="comment-reply">Відповісти</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Channels */}
          <div className="similar-section">
            <h2 className="section-title">Подібні канали</h2>
            <div className="similar-carousel">
              <div className="similar-scroll-container" style={{ transform: `translateX(-${currentSlide * 360}px)` }}>
                {similarChannels.map(similarChannel => (
                  <div
                    key={similarChannel.id}
                    className="similar-channel-card"
                    onClick={() => navigate(`/channel/${similarChannel.id}`)}
                  >
                    <div className="similar-card-avatar">
                      <img src={similarChannel.avatar} alt={similarChannel.name} />
                    </div>

                    <div className="similar-card-header">
                      <div className="similar-card-info">
                        <h3 className="similar-card-name">{similarChannel.name}</h3>
                        <p className="similar-card-category">{similarChannel.category}</p>
                      </div>
                    </div>

                    <div className="similar-card-stats">
                      <div className="stat-box-wide">
                        <span className="stat-label">Підписники</span>
                        <span className="stat-value">{similarChannel.subscribers}</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-label">Відео</span>
                        <span className="stat-value">{similarChannel.videos}</span>
                      </div>
                      <div className="stat-box-rating">
                        <span className="stat-label">Оцінка</span>
                        <div className="rating-value">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="#FBB03B">
                            <path d="M10 1.66667L12.5758 8.09001L19.2658 8.95834L14.6329 13.465L15.7142 20.1167L10 16.8858L4.28583 20.1167L5.36708 13.465L0.734167 8.95834L7.42417 8.09001L10 1.66667Z"/>
                          </svg>
                          <span>{similarChannel.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="similar-card-description">
                      <p className="description-text">{similarChannel.description}</p>
                    </div>

                    <button className="view-info-link">
                      Переглянути інформацію
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#4FA1ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {similarChannels.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ChannelPage
