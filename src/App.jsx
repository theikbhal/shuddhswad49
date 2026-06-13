import React, { useState } from 'react';
import './App.css';

const INSTAGRAM_REELS = [
  { id: 'DKKK1AST77W', title: 'Reel 1', url: 'https://www.instagram.com/shuddhswad49/reel/DKKK1AST77W/' },
  { id: 'DKE4K3iz6Pc', title: 'Reel 2', url: 'https://www.instagram.com/shuddhswad49/reel/DKE4K3iz6Pc/' },
  { id: 'DJ_vJ9CzGS0', title: 'Reel 3', url: 'https://www.instagram.com/shuddhswad49/reel/DJ_vJ9CzGS0/' },
  { id: 'DJ6eNj0zTxe', title: 'Reel 4', url: 'https://www.instagram.com/shuddhswad49/reel/DJ6eNj0zTxe/' },
  { id: 'DJ1cXkKTX4W', title: 'Reel 5', url: 'https://www.instagram.com/shuddhswad49/reel/DJ1cXkKTX4W/' },
  { id: 'DJolKTUTHQR', title: 'Reel 6', url: 'https://www.instagram.com/shuddhswad49/reel/DJolKTUTHQR/' },
  { id: 'DJjgEmBzmcq', title: 'Reel 7', url: 'https://www.instagram.com/shuddhswad49/reel/DJjgEmBzmcq/' },
  { id: 'DJeTmS-zpB1', title: 'Reel 8', url: 'https://www.instagram.com/shuddhswad49/reel/DJeTmS-zpB1/' },
  { id: 'DJbtQsxTMkQ', title: 'Reel 9', url: 'https://www.instagram.com/shuddhswad49/reel/DJbtQsxTMkQ/' },
  { id: 'DJWqL2HTBM5', title: 'Reel 10', url: 'https://www.instagram.com/shuddhswad49/reel/DJWqL2HTBM5/' },
  { id: 'DJOxoFgz1pT', title: 'Reel 11', url: 'https://www.instagram.com/shuddhswad49/reel/DJOxoFgz1pT/' },
  { id: 'DJJ0r0rzyLc', title: 'Reel 12', url: 'https://www.instagram.com/shuddhswad49/reel/DJJ0r0rzyLc/' },
  { id: 'DJHPfF5zOWW', title: 'Reel 13', url: 'https://www.instagram.com/shuddhswad49/reel/DJHPfF5zOWW/' },
  { id: 'DJEUH_BzChy', title: 'Reel 14', url: 'https://www.instagram.com/shuddhswad49/reel/DJEUH_BzChy/' },
  { id: 'DJD3jF8TA0d', title: 'Reel 15', url: 'https://www.instagram.com/shuddhswad49/reel/DJD3jF8TA0d/' },
  { id: 'DJB61nNzk9O', title: 'Reel 16', url: 'https://www.instagram.com/shuddhswad49/reel/DJB61nNzk9O/' },
  { id: 'DIqsFYmzabN', title: 'Reel 17', url: 'https://www.instagram.com/shuddhswad49/reel/DIqsFYmzabN/' },
  { id: 'DIi9ed_TiKQ', title: 'Reel 18', url: 'https://www.instagram.com/shuddhswad49/reel/DIi9ed_TiKQ/' },
  { id: 'DH0n2MCT52A', title: 'Reel 19', url: 'https://www.instagram.com/shuddhswad49/reel/DH0n2MCT52A/' },
  { id: 'DHlA1-ZT0Ds', title: 'Reel 20', url: 'https://www.instagram.com/shuddhswad49/reel/DHlA1-ZT0Ds/' },
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

  const allVideosWatched = viewedVideos.size === INSTAGRAM_REELS.length;

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
          {viewedVideos.size} / {INSTAGRAM_REELS.length}
        </div>
      </header>

      {/* Timeline Section */}
      <main className="container">
        <p className="text-center mt-4 mb-8" style={{ color: 'var(--text-muted)' }}>
          Watch all {INSTAGRAM_REELS.length} videos chronologically to unlock your reward and the final quiz!
        </p>

        <div className="timeline">
          {INSTAGRAM_REELS.map((video, index) => (
            <div key={video.id} className="video-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div style={{ width: '100%', height: '550px', background: 'var(--bg-color)', overflow: 'hidden' }}>
                <iframe 
                  src={`https://www.instagram.com/reel/${video.id}/embed`}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency="true"
                  title={`Shuddh Swad Reel ${index + 1}`}
                ></iframe>
              </div>
              <div className="video-info">
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
