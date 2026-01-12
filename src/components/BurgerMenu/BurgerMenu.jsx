import React from 'react'
import { Link } from 'react-router-dom'
import './BurgerMenu.css'

function BurgerMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      <div className="burger-overlay" onClick={onClose} />
      <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
        <button className="burger-close" onClick={onClose} aria-label="Закрити">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <nav className="burger-nav">
          <Link to="/profile" className="burger-login-btn" onClick={onClose}>
            <span>Вхід в акаунт</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <div className="burger-links">
            <Link to="/" className="burger-link" onClick={onClose}>
              <span>Головна</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link to="/categories" className="burger-link" onClick={onClose}>
              <span>Тематичні добірки</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link to="/channels" className="burger-link" onClick={onClose}>
              <span>Список каналів</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link to="/about" className="burger-link" onClick={onClose}>
              <span>Про проєкт</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#0F3A61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default BurgerMenu
