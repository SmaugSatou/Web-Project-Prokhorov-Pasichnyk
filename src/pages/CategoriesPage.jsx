import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Pagination from '../components/Pagination/Pagination'
import './CategoriesPage.css'

function CategoriesPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const categories = [
    { emoji: '🌟', name: 'Летсплеї', count: 483 },
    { emoji: '🇬🇧', name: 'Англійська мова', count: 65 },
    { emoji: '📚', name: 'Книги', count: 120 },
    { emoji: '🎮', name: 'Ігрові світи та лор', count: 1477 },
    { emoji: '📰', name: 'Новини', count: 287 },
    { emoji: '👮', name: 'Трукрайм', count: 156 },
    { emoji: '🌸', name: 'Аніме', count: 145 },
    { emoji: '📖', name: 'Навчання', count: 105 },
    { emoji: '🎬', name: 'Кіно', count: 95 },
    { emoji: '🔬', name: 'Наука', count: 99 },
    { emoji: '💬', name: 'Осакр', count: 52 },
    { emoji: '🎭', name: 'АРТ', count: 143 },
    { emoji: '🎵', name: 'Блоги', count: 541 },
    { emoji: '🏋️', name: 'Спорт', count: 297 },
    { emoji: '�', name: 'Гумор', count: 190 },
    { emoji: '✈️', name: 'Подорожі', count: 112 },
    { emoji: '💡', name: 'Лайфхаки', count: 175 },
    { emoji: '🎨', name: 'Мистецтво', count: 97 },
    { emoji: '💻', name: 'Технології', count: 131 },
    { emoji: '📝', name: 'Українська мова', count: 452 },
    { emoji: '🎯', name: 'Дизайн', count: 205 },
    { emoji: '⌨️', name: 'ІТ', count: 95 },
    { emoji: '🇺🇸', name: 'Британська мова', count: 97 },
    { emoji: '📷', name: 'Камера', count: 126 },
    { emoji: '🏃', name: 'Спортивні', count: 145 },
    { emoji: '🔧', name: 'Майстерня', count: 105 },
    { emoji: '⚡', name: 'Інтерв\'ю', count: 77 },
    { emoji: '🗳️', name: 'Політика', count: 97 },
    { emoji: '🗣️', name: 'Різні', count: 94 },
    { emoji: '🎪', name: 'Театр', count: 88 },
    { emoji: '🏆', name: 'Футбол', count: 123 },
    { emoji: '🛠️', name: 'DIY', count: 168 },
    { emoji: '📺', name: 'Телебачення', count: 245 },
    { emoji: '🌍', name: 'Історія', count: 163 },
    { emoji: '🎥', name: 'Для дітей', count: 471 },
    { emoji: '🎞️', name: 'Шортси', count: 320 }
  ]

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === 'all') return matchesSearch
    if (activeFilter === 'popular') return matchesSearch && cat.count > 200
    if (activeFilter === 'new') return matchesSearch && cat.count < 100

    return matchesSearch
  })

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeFilter])

  const handleCategoryClick = (categoryName) => {
    // Navigate to channels list with category filter
    navigate(`/channels?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="categories-page">
      <Header />

      <main className="categories-content">
        <div className="categories-container">
          <div className="breadcrumb">
            Головна / Добірки
          </div>

          <h1 className="categories-title">Тематичні добірки</h1>

          <div className="categories-controls">
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

            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Всі
              </button>
              <button
                className={`filter-btn ${activeFilter === 'popular' ? 'active' : ''}`}
                onClick={() => setActiveFilter('popular')}
              >
                Популярні
              </button>
              <button
                className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`}
                onClick={() => setActiveFilter('new')}
              >
                Нові
              </button>
            </div>
          </div>

          <div className="categories-grid">
            {paginatedCategories.map((cat, index) => (
              <button
                key={index}
                className="category-item"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-icon">{cat.emoji}</div>
                <div className="category-info">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">{cat.count}</span>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CategoriesPage
