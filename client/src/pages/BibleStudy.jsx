import { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import './BibleStudy.css';

const lessons = [
  {
    id: 1,
    category: 'Sunday School',
    icon: '📖',
    title: 'The Birth of Jesus Christ',
    scripture: 'Luke 2:1–20',
    summary: 'Discover the story of the miraculous birth of our Lord Jesus Christ — the fulfillment of ancient prophecy and the greatest gift ever given to humanity.',
    points: [
      'God became flesh and dwelt among us (John 1:14)',
      'Jesus was born of a virgin by the power of the Holy Spirit',
      'Angels announced His birth to shepherds in the field',
      'He is Emmanuel — God with us',
    ],
  },
  {
    id: 2,
    category: 'Sunday School',
    icon: '✝️',
    title: 'The Death and Resurrection of Christ',
    scripture: 'Matthew 27–28',
    summary: 'The cross is the foundation of our faith. Jesus died for our sins and rose on the third day — defeating death, hell, and the grave forever.',
    points: [
      'Christ died for our sins according to the Scriptures (1 Cor. 15:3)',
      'He was buried and rose again on the third day',
      'The resurrection is proof of His power over death',
      'Because He lives, we too shall live',
    ],
  },
  {
    id: 3,
    category: 'Bible Study',
    icon: '🙏',
    title: 'The Power of Prayer',
    scripture: 'Matthew 6:5–13 | James 5:16',
    summary: 'Prayer is our lifeline to God. Through prayer we communicate with our Heavenly Father, receive direction, find peace, and see miracles happen.',
    points: [
      'Pray without ceasing (1 Thess. 5:17)',
      'The Lord\'s Prayer as our model',
      'The effectual fervent prayer of a righteous man avails much',
      'Praying in the Spirit builds up your faith',
    ],
  },
  {
    id: 4,
    category: 'Bible Study',
    icon: '🛡️',
    title: 'The Armor of God',
    scripture: 'Ephesians 6:10–18',
    summary: 'We are in a spiritual battle. God has provided every piece of armor we need to stand firm against the enemy\'s schemes. Learn to put on the full armor of God.',
    points: [
      'Belt of Truth — know God\'s Word',
      'Breastplate of Righteousness — walk in holiness',
      'Shield of Faith — quench the fiery darts of the enemy',
      'Sword of the Spirit — the Word of God is our offensive weapon',
    ],
  },
  {
    id: 5,
    category: 'Sunday School',
    icon: '🕊️',
    title: 'The Holy Spirit',
    scripture: 'Acts 2:1–4 | John 14:16–17',
    summary: 'The Holy Spirit is our Comforter, Guide, and Helper. He empowers believers to live the Christian life and to be witnesses for Christ to the ends of the earth.',
    points: [
      'The Holy Spirit dwells in every believer',
      'He guides us into all truth',
      'He empowers us for service and witness',
      'The fruit of the Spirit: love, joy, peace, patience...',
    ],
  },
  {
    id: 6,
    category: 'Bible Study',
    icon: '💰',
    title: 'Faith and Giving',
    scripture: 'Malachi 3:10 | Luke 21:1–4 | 2 Cor. 9:7',
    summary: 'God is a giver — He gave His Son. Giving is an act of worship and faith. When we give cheerfully and sacrificially, we open the windows of heaven over our lives.',
    points: [
      'Bring the full tithe into the storehouse',
      'Give, and it shall be given unto you (Luke 6:38)',
      'God loves a cheerful giver',
      'Sow generously and you will reap generously',
    ],
  },
];

const quizQuestions = [
  {
    q: 'Who was the first man created by God?',
    options: ['Noah', 'Adam', 'Moses', 'Abraham'],
    answer: 1,
  },
  {
    q: 'How many days did Jesus fast in the wilderness?',
    options: ['7 days', '30 days', '40 days', '3 days'],
    answer: 2,
  },
  {
    q: 'How many books are in the Bible?',
    options: ['63', '66', '72', '39'],
    answer: 1,
  },
  {
    q: 'Who wrote most of the Psalms?',
    options: ['Solomon', 'Moses', 'David', 'Elijah'],
    answer: 2,
  },
  {
    q: 'What is the shortest verse in the Bible?',
    options: ['"Pray without ceasing"', '"Jesus wept"', '"God is love"', '"Fear not"'],
    answer: 1,
  },
  {
    q: 'Who baptized Jesus in the Jordan River?',
    options: ['Peter', 'John the Baptist', 'Moses', 'Elijah'],
    answer: 1,
  },
  {
    q: 'Which disciple betrayed Jesus?',
    options: ['Peter', 'Thomas', 'Judas Iscariot', 'Matthew'],
    answer: 2,
  },
  {
    q: 'On which day did God rest after creation?',
    options: ['5th day', '6th day', '7th day', '8th day'],
    answer: 2,
  },
  {
    q: 'What river did the Israelites cross into the Promised Land?',
    options: ['Nile', 'Euphrates', 'Jordan', 'Red Sea'],
    answer: 2,
  },
  {
    q: 'Who was thrown into the lion\'s den?',
    options: ['Shadrach', 'Elijah', 'Daniel', 'Joseph'],
    answer: 2,
  },
  {
    q: 'What gift did the Holy Spirit give on the Day of Pentecost?',
    options: ['Healing', 'Speaking in tongues', 'Prophecy', 'Wisdom'],
    answer: 1,
  },
  {
    q: 'Which book of the Bible comes first?',
    options: ['Exodus', 'Psalms', 'Genesis', 'Matthew'],
    answer: 2,
  },
];

export default function BibleStudy() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [filter, setFilter] = useState('All');
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const categories = ['All', 'Sunday School', 'Bible Study'];
  const filteredLessons = filter === 'All' ? lessons : lessons.filter((l) => l.category === filter);

  function selectAnswer(i) {
    if (selected !== null) return;
    setSelected(i);
  }

  function nextQuestion() {
    const newAnswers = [...answers, selected];
    if (current + 1 >= quizQuestions.length) {
      setAnswers(newAnswers);
      setQuizDone(true);
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function resetQuiz() {
    setQuizStarted(false);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setQuizDone(false);
  }

  const score = answers.filter((a, i) => a === quizQuestions[i].answer).length;

  function scoreMessage() {
    if (score === quizQuestions.length) return '🏆 Perfect score! You know your Bible well!';
    if (score >= 9) return '⭐ Excellent! Keep studying God\'s Word!';
    if (score >= 7) return '👏 Great job! Keep growing in the Word!';
    if (score >= 5) return '📖 Good effort! Keep studying the Scriptures!';
    return '🙏 Keep reading your Bible daily — growth takes time!';
  }

  return (
    <div>
      <HeroSlideshow
        title="Bible Study & Sunday School"
        subtitle="Grow deeper in the Word of God through structured lessons, Sunday school, and interactive quizzes."
      />

      {/* Lessons Section */}
      <section className="section">
        <div className="container">
          <div className="bs-header">
            <div>
              <h2 className="section-title">Study Lessons</h2>
              <p className="section-subtitle">Click any lesson to expand and study</p>
            </div>
            <div className="bs-filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`bs-filter-btn${filter === c ? ' active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="lessons-grid">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`lesson-card${activeLesson === lesson.id ? ' expanded' : ''}`}
              >
                <div
                  className="lesson-card-header"
                  onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                >
                  <span className="lesson-icon">{lesson.icon}</span>
                  <div className="lesson-card-title">
                    <span className="lesson-category">{lesson.category}</span>
                    <h3>{lesson.title}</h3>
                    <span className="lesson-scripture">📜 {lesson.scripture}</span>
                  </div>
                  <span className="lesson-chevron">{activeLesson === lesson.id ? '▲' : '▼'}</span>
                </div>
                {activeLesson === lesson.id && (
                  <div className="lesson-body">
                    <p className="lesson-summary">{lesson.summary}</p>
                    <h4>Key Points:</h4>
                    <ul className="lesson-points">
                      {lesson.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    <div className="lesson-cta">
                      <span>📖 Read: {lesson.scripture}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bible Quiz Section */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Bible Quiz</h2>
          <p className="section-subtitle">Test your Bible knowledge — {quizQuestions.length} questions</p>

          <div className="quiz-box">
            {!quizStarted && !quizDone && (
              <div className="quiz-intro">
                <div className="quiz-intro-icon">📝</div>
                <h3>Ready to Test Your Knowledge?</h3>
                <p>
                  {quizQuestions.length} multiple-choice questions covering the Old Testament,
                  New Testament, and Christian faith. See how well you know God&apos;s Word!
                </p>
                <button className="btn btn-primary quiz-start-btn" onClick={() => setQuizStarted(true)}>
                  Start Quiz
                </button>
              </div>
            )}

            {quizStarted && !quizDone && (
              <div className="quiz-active">
                <div className="quiz-progress-bar">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${((current) / quizQuestions.length) * 100}%` }}
                  />
                </div>
                <p className="quiz-progress-label">Question {current + 1} of {quizQuestions.length}</p>
                <h3 className="quiz-question">{quizQuestions[current].q}</h3>
                <div className="quiz-options">
                  {quizQuestions[current].options.map((opt, i) => {
                    let cls = 'quiz-option';
                    if (selected !== null) {
                      if (i === quizQuestions[current].answer) cls += ' correct';
                      else if (i === selected) cls += ' wrong';
                    }
                    if (selected === i) cls += ' chosen';
                    return (
                      <button key={i} className={cls} onClick={() => selectAnswer(i)} disabled={selected !== null}>
                        <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <div className="quiz-feedback">
                    {selected === quizQuestions[current].answer
                      ? <span className="quiz-correct-msg">✅ Correct! Well done!</span>
                      : <span className="quiz-wrong-msg">❌ Not quite — the correct answer is highlighted.</span>
                    }
                    <button className="btn btn-primary quiz-next-btn" onClick={nextQuestion}>
                      {current + 1 < quizQuestions.length ? 'Next Question →' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {quizDone && (
              <div className="quiz-results">
                <div className="quiz-score-circle">
                  <span className="quiz-score-num">{score}</span>
                  <span className="quiz-score-total">/ {quizQuestions.length}</span>
                </div>
                <h3>{scoreMessage()}</h3>
                <div className="quiz-answers-review">
                  {quizQuestions.map((q, i) => (
                    <div key={i} className={`quiz-review-item ${answers[i] === q.answer ? 'r-correct' : 'r-wrong'}`}>
                      <span>{answers[i] === q.answer ? '✅' : '❌'}</span>
                      <div>
                        <p className="qr-question">{q.q}</p>
                        <p className="qr-answer">Correct: {q.options[q.answer]}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" onClick={resetQuiz} style={{ marginTop: '1.5rem' }}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
