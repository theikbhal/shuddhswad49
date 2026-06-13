import React, { useState } from 'react';
import './App.css';

const MOCK_VIDEOS = [
  { id: 1, title: 'How we started Shuddh Swad', date: 'October 12, 2023' },
  { id: 2, title: 'Behind the scenes: Making Thekua', date: 'November 05, 2023' },
  { id: 3, title: 'Our first 1 Lakh Sale!', date: 'December 20, 2023' },
  { id: 4, title: 'Listing on Blinkit', date: 'February 14, 2024' },
  { id: 5, title: 'Shark Tank / Founders Pitch Experience', date: 'May 10, 2024' },
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the name of the brand?",
    options: ["Shuddh Swad", "Desi Swad", "Apna Thekua", "Bihari Bites"],
    answer: 0
  },
  {
    question: "What product do they sell?",
    options: ["Khakra", "Thekua", "Ladoo", "Moa"],
    answer: 1
  },
  {
    question: "What is the age of the youngest co-founders (Sameer & Kailash)?",
    options: ["15 years", "17 years", "20 years", "23 years"],
    answer: 1
  },
  {
    question: "How much total sales did they achieve in one year?",
    options: ["10 Lakh", "25 Lakh+", "50 Lakh+", "1 Crore+"],
    answer: 2
  },
  {
    question: "What is their profit margin?",
    options: ["15%", "25%", "35%", "50%"],
    answer: 2
  },
  {
    question: "What is the shelf life of their product?",
    options: ["30 days", "60 days", "90 days", "120 days"],
    answer: 2
  },
  {
    question: "How much does it cost to list a single product on Blinkit?",
    options: ["10,000", "15,000 + GST", "25,000 + GST", "50,000"],
    answer: 2
  },
  {
    question: "What valuation did they pitch at the founders show?",
    options: ["1 Crore", "5 Crores", "10 Crores", "50 Crores"],
    answer: 2
  },
  {
    question: "Which traditional Bengali snack do they plan to revive next?",
    options: ["Rasgulla", "Joynagarer Moa", "Sandesh", "Chamcham"],
    answer: 1
  },
  {
    question: "How much money did they spend on ads to get 50 Lakh+ sales?",
    options: ["Zero", "50,000", "1 Lakh", "5 Lakhs"],
    answer: 0
  }
];

function App() {
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const toggleVideoViewed = (id) => {
    const newSet = new Set(viewedVideos);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setViewedVideos(newSet);
  };

  const allVideosWatched = viewedVideos.size === MOCK_VIDEOS.length;

  const handleAnswer = (qIndex, oIndex) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="app-container">
      {/* Header & Progress Tracker */}
      <header className="app-header glass">
        <h1 className="brand-title">Shuddh Swad</h1>
        <div className="progress-badge animate-slide-up">
          <span>👀</span>
          {viewedVideos.size} / {MOCK_VIDEOS.length}
        </div>
      </header>

      {/* Timeline Section */}
      <main className="container">
        <p className="text-center mt-4 mb-8" style={{ color: 'var(--text-muted)' }}>
          Watch all {MOCK_VIDEOS.length} videos chronologically to unlock your reward and the final quiz!
        </p>

        <div className="timeline">
          {MOCK_VIDEOS.map((video) => (
            <div key={video.id} className="video-card animate-slide-up">
              <div className="video-placeholder">
                <div className="play-icon"></div>
                <span style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.875rem' }}>
                  Mock Instagram Reel
                </span>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <span className="video-date">{video.date}</span>
                
                <label className="viewed-action">
                  <span style={{ fontWeight: 600 }}>Mark as Viewed</span>
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      style={{ display: 'none' }}
                      checked={viewedVideos.has(video.id)}
                      onChange={() => toggleVideoViewed(video.id)}
                    />
                    <div className="custom-checkbox"></div>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Reward Section */}
        {allVideosWatched && (
          <div className="reward-section animate-pulse-slow">
            <h2 className="reward-title">🎉 Congratulations! 🎉</h2>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              You have watched all videos. You earned ₹100!
            </p>
            <p>Now, test your knowledge in the quiz below to prove you paid attention.</p>
          </div>
        )}

        {/* Quiz Section */}
        {allVideosWatched && (
          <div className="quiz-section animate-slide-up mt-8">
            <h2 className="text-center mb-8" style={{ fontSize: '2rem' }}>Final Test</h2>
            
            {QUIZ_QUESTIONS.map((q, qIndex) => (
              <div key={qIndex} className="question-card">
                <h3 className="question-text">{qIndex + 1}. {q.question}</h3>
                <div className="options-grid">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    let btnClass = 'option-btn';
                    
                    if (showResult) {
                      if (oIndex === q.answer) btnClass += ' correct';
                      else if (isSelected) btnClass += ' wrong';
                    } else if (isSelected) {
                      btnClass += ' selected';
                    }

                    return (
                      <button
                        key={oIndex}
                        className={btnClass}
                        onClick={() => !showResult && handleAnswer(qIndex, oIndex)}
                        disabled={showResult}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!showResult ? (
              <div className="text-center mt-8">
                <button 
                  className="btn" 
                  onClick={() => setShowResult(true)}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="quiz-result animate-slide-up">
                <h2>Your Score</h2>
                <div className="score-display">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </div>
                <p>{calculateScore() >= 8 ? 'Excellent! You are a true fan.' : 'Good try! Better luck next time.'}</p>
                <button className="btn mt-4" onClick={() => window.location.reload()}>
                  Restart
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
