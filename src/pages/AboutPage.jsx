import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './AboutPage.css'

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Feedback submitted:', feedback)
    setFeedback('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const faqs = [
    {
      question: "Що таке U2U і як він працює?",
      answer: "U2U: Ukrainians to Ukrainians — простір для українців, які шукають україномовний контент, що надихає та відповідає їхнім інтересам. Після початку повномасштабного вторгнення, для багатьох українців постало питання: як відмовитися від російськомовного контенту та знайти якісну альтернативу українською? Ми створили U2U, щоб зробити цей шлях простішим і приємнішим, об'єднуючи в одному місці найкращі україномовні ресурси."
    },
    {
      question: "Як U2U підбирає рекомендації для мене?",
      answer: "Наш алгоритм аналізує ваші вподобання та пропонує канали, які відповідають вашим інтересам. Ми враховуємо категорії, рейтинги та популярність каналів."
    },
    {
      question: "Чи можу я запропонувати YouTube-канал або інший ресурс для U2U?",
      answer: "Так, ви можете додати канал через спеціальну форму на сайті. Наша команда перевірить його та додасть до бази."
    },
    {
      question: "Чи є можливість знайти менш відомих контент-мейкерів?",
      answer: "Звичайно! У нас є фільтри та категорії, які допоможуть вам знайти як популярні, так і менш відомі канали українською мовою."
    },
    {
      question: "Чи буде U2U розширювати свою бібліотеку контенту?",
      answer: "Так, ми постійно працюємо над покращенням платформи. У майбутньому плануємо додати музику, ігри українського виробництва та інші категорії контенту."
    }
  ]

  return (
    <div className="about-page">
      <Header />

      <main className="about-content">
        <div className="about-container">
          <div className="breadcrumb">
            Головна / Про проєкт
          </div>

          <section className="about-section">
            <h1 className="about-title">Про проєкт</h1>

            <div className="about-text">
              <p>
                <strong>U2U: Ukrainians to Ukrainians</strong> — простір для українців, які шукають україномовний контент, що надихає та відповідає їхнім інтересам. Після початку повномасштабного вторгнення, для багатьох українців постало питання: як відмовитися від російськомовного контенту та знайти якісну альтернативу українською? Ми створили U2U, щоб зробити цей шлях простішим і приємнішим, об'єднуючи в одному місці найкращі україномовні ресурси.
              </p>

              <p>
                Наш сайт призначений для молоді, яка хоче відкривати нове та унікальне. На U2U ви знайдете добірки від популярних YouTube-каналів до менш відомих, але не менш цікавих українських креаторів, що заслуговують на увагу.
              </p>

              <p>
                Наша місія — зробити український контент більш доступним, підтримати розвиток українських контент-мейкерів і надати платформу, де кожен може знайти щось для себе. З U2U ви відкриєте, наскільки різнобарвним та цікавим є український інформаційний простір.
              </p>

              <p>
                У майбутньому ми плануємо розширити платформу і включити до неї музику, ігри українського виробництва. Ми віримо, що кожен зможе знайти вітчизняний контент для душі, відкрити нових авторів та насолодитися українською культурою.
              </p>

              <p>
                <strong>U2U — українці для українців. Разом ми будуємо простір для себе та про себе.</strong>
              </p>
            </div>
          </section>

          <section className="faq-section">
            <h2 className="section-title">Питання та відповіді</h2>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`chevron ${openFaq === index ? 'rotated' : ''}`}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="feedback-section">
            <h2 className="section-title">Маєш пропозиції для покращення сайту?</h2>

            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="feedback-input-wrapper">
                <label htmlFor="feedback-textarea" className="feedback-label">
                  Напишіть пропозиції
                </label>
                <textarea
                  id="feedback-textarea"
                  placeholder='Напр. "Додати коментарі"'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="feedback-textarea"
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${submitted ? 'submitted' : ''}`}
                disabled={submitted}
              >
                {submitted ? 'Відправлено. Дякуємо!' : 'Відправити'}
              </button>
            </form>
          </section>
        </div>

        {/* AI Chat Helper Button */}
        <button className="ai-helper-btn" aria-label="AI помічник">
          <div className="helper-tooltip">
            <span>Маєш проблеми з пошуком?</span>
          </div>
          <div className="helper-icon">
            <svg width="37" height="37" viewBox="0 0 37 37" fill="none">
              <path d="M18.5 3.5L22.5 11.5L31 13.5L24.5 19.5L26.5 28L18.5 23.5L10.5 28L12.5 19.5L6 13.5L14.5 11.5L18.5 3.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
