import React, { useState } from 'react'
import './AIChat.css'

function AIChat({ isOpen, onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Вітаю!\nЯ ваш персональний помічник.\nДопоможу знайти україномовний контент, який відповідає вашим вподобанням. Напишіть запит або оберіть шаблон — і я разом відкриємо щось нове!'
    }
  ])

  const suggestedActions = [
    'Летсплеєри по S.T.A.L.K.E.R.',
    'Персоналізовані рекомендації',
    'Очистити підписки від російського*',
    'Аналізувати мій YouTube для рекомендацій*'
  ]

  const handleSend = () => {
    if (!message.trim()) return

    // Add user message
    const newMessages = [...messages, {
      id: messages.length + 1,
      type: 'user',
      text: message
    }]

    setMessages(newMessages)
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, {
        id: newMessages.length + 1,
        type: 'assistant',
        text: 'Дякую за ваше повідомлення! Я працюю над пошуком відповідних каналів...'
      }])
    }, 1000)
  }

  const handleActionClick = (action) => {
    setMessage(action)
  }

  if (!isOpen) return null

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-chat-header">
          <h2 className="ai-chat-title">AI помічник</h2>
          <button className="ai-chat-close" onClick={onClose} aria-label="Закрити">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message ${msg.type}`}>
              {msg.type === 'assistant' && (
                <div className="message-header">
                  <span className="message-author">Помічник</span>
                  <span className="message-time">11:34</span>
                </div>
              )}
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="ai-chat-actions">
          {suggestedActions.map((action, index) => (
            <button
              key={index}
              className="ai-action-button"
              onClick={() => handleActionClick(action)}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="ai-chat-note">
          *Потрібна авторизація через YouTube для деяких функцій!
        </div>

        <div className="ai-chat-input">
          <input
            type="text"
            className="ai-input-field"
            placeholder="Введіть повідомлення"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="ai-send-button" onClick={handleSend} aria-label="Надіслати">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 8L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat
