import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ChannelCard.css'

function ChannelCard({ channel, variant = 'compact' }) {
  const navigate = useNavigate()

  const handleViewInfo = (e) => {
    e.stopPropagation()
    navigate(`/channel/${channel.id}`)
  }

  const handleCardClick = () => {
    navigate(`/channel/${channel.id}`)
  }

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12.245 7.905L18 8.5L14 12.605L15.09 18L10 15.405L4.91 18L6 12.605L2 8.5L7.755 7.905L10 2Z" fill="#FBB03B"/>
        </svg>
        <span className="rating-value">{rating}</span>
      </div>
    )
  }

  // List variant for ChannelsListPage (matches Figma design)
  if (variant === 'list') {
    return (
      <div
        className="channel-card channel-card-list"
        onClick={handleCardClick}
      >
        <div className="channel-avatar">
          <img src={channel.avatar || 'https://via.placeholder.com/120'} alt={channel.name} />
        </div>

        <div className="channel-header">
          <div className="channel-info">
            <h3 className="channel-name">{channel.name}</h3>
            <p className="channel-category">{channel.category}</p>
          </div>
          <a
            href={channel.youtubeUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-platform"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
              <path d="M38 7.5C37.5 5.5 36 4 34 3.5C31 3 20 3 20 3C20 3 9 3 6 3.5C4 4 2.5 5.5 2 7.5C1.5 10.5 1.5 16.5 1.5 16.5C1.5 16.5 1.5 22.5 2 25.5C2.5 27.5 4 29 6 29.5C9 30 20 30 20 30C20 30 31 30 34 29.5C36 29 37.5 27.5 38 25.5C38.5 22.5 38.5 16.5 38.5 16.5C38.5 16.5 38.5 10.5 38 7.5Z" fill="#FF0000"/>
              <path d="M16 22L26 16.5L16 11V22Z" fill="white"/>
            </svg>
          </a>
        </div>

        <div className="channel-stats">
          <div className="stat-box stat-box-wide">
            <p className="stat-label">Підписники</p>
            <p className="stat-value">{channel.subscribers}</p>
          </div>
          <div className="stat-box">
            <p className="stat-label">Відео</p>
            <p className="stat-value">{channel.videos}</p>
          </div>
          <div className="stat-box stat-box-rating">
            <p className="stat-label">Оцінка</p>
            <div className="stat-rating">
              {renderStars(channel.rating)}
            </div>
          </div>
        </div>

        <div className="channel-description">
          <p className="description-text">
            {channel.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`channel-card ${variant === 'full' ? 'channel-card-full' : ''}`}
      onClick={handleCardClick}
    >
      <div className="channel-avatar">
        <img src={channel.avatar || 'https://via.placeholder.com/120'} alt={channel.name} />
      </div>

      <div className="channel-header">
        <div className="channel-info">
          <h3 className="channel-name">{channel.name}</h3>
          <p className="channel-category">{channel.category}</p>
        </div>
        <a
          href={channel.youtubeUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="channel-platform"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
            <path d="M38 7.5C37.5 5.5 36 4 34 3.5C31 3 20 3 20 3C20 3 9 3 6 3.5C4 4 2.5 5.5 2 7.5C1.5 10.5 1.5 16.5 1.5 16.5C1.5 16.5 1.5 22.5 2 25.5C2.5 27.5 4 29 6 29.5C9 30 20 30 20 30C20 30 31 30 34 29.5C36 29 37.5 27.5 38 25.5C38.5 22.5 38.5 16.5 38.5 16.5C38.5 16.5 38.5 10.5 38 7.5Z" fill="#FF0000"/>
            <path d="M16 22L26 16.5L16 11V22Z" fill="white"/>
          </svg>
        </a>
      </div>

      <div className="channel-stats">
        <div className="stat-box stat-box-wide">
          <p className="stat-label">Підписники</p>
          <p className="stat-value">{channel.subscribers}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Відео</p>
          <p className="stat-value">{channel.videos}</p>
        </div>
        <div className="stat-box stat-box-rating">
          <p className="stat-label">Оцінка</p>
          <div className="stat-rating">
            {renderStars(channel.rating)}
          </div>
        </div>
      </div>

      <div className="channel-description">
        <p className="description-text">
          {channel.description}
        </p>
      </div>

      <button
        className="view-info-button"
        onClick={handleViewInfo}
      >
        <span>Переглянути інформацію</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default ChannelCard
