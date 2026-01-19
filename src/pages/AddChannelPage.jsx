import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './AddChannelPage.css'

function AddChannelPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    channelName: '',
    channelUrl: '',
    category: '',
    description: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('http://localhost:3000/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    'Ігри',
    'Летсплеї',
    'Стріми',
    'Книги',
    'Трукрайм',
    'Аніме',
    'Новини',
    'Навчання',
    'Подорожі',
    'Лайфстайл',
    'Інше'
  ]

  return (
    <div className="add-channel-page">
      <Header />

      <main className="add-channel-content">
        <div className="form-container">
          <h1 className="h3">Додати ютуб-канал</h1>

          <div className="form-description">
            <p>
              Заповніть форму, щоб запропонувати канал.
              <br />
              <strong>Увага: розглядаються лише україномовні канали, російськомовні не додаються!</strong>
            </p>
            <p>
              Перевірте, чи каналу ще немає на сайті. Статус запиту можна відстежувати в акаунті.
            </p>
            <p>
              Додавання безкоштовне. Дякуємо за підтримку українського контенту!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="channel-form">
            <div className="form-group">
              <label htmlFor="channelName">Назва каналу *</label>
              <input
                type="text"
                id="channelName"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                required
                placeholder="Введіть назву каналу"
              />
            </div>

            <div className="form-group">
              <label htmlFor="channelUrl">Посилання на канал *</label>
              <input
                type="url"
                id="channelUrl"
                name="channelUrl"
                value={formData.channelUrl}
                onChange={handleChange}
                required
                placeholder="https://youtube.com/@channelname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Категорія *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Оберіть категорію</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Опис каналу</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Розкажіть про канал..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Ваш email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
              <small>Для зв'язку та відстеження статусу заявки</small>
            </div>

            {submitStatus === 'success' && (
              <div className="status-message success">
                ✓ Канал успішно додано! Перенаправлення...
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                ✗ Помилка при додаванні каналу. Спробуйте ще раз.
              </div>
            )}

            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Надіслати заявку'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AddChannelPage
