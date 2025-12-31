import { useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Loader, AlertCircle } from "lucide-react";
import "./AIQuiz.css";

const AIQuiz = ({
  lessonContent,
  lessonTitle,
  token,
  lang = "en",
  onQuizComplete,
  isCompact = false,
}) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:1911";
  const PASSING_SCORE = 70;

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_BASE}/quiz/generate`,
        { lessonContent, lessonTitle, lang },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      setQuiz(res.data.quiz);
      setUserAnswers({});
      setShowResults(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error generating quiz";
      setError(lang === "ar" ? "خطأ في تحميل الاختبار" : errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const calculateScore = () => {
    let score = 0;
    quiz?.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    const answeredAll = quiz.every((_, idx) => userAnswers[idx] !== undefined);

    if (!answeredAll) {
      setError(
        lang === "ar"
          ? "يجب الإجابة على جميع الأسئلة"
          : "Please answer all questions"
      );
      return;
    }

    setShowResults(true);
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    if (onQuizComplete) {
      onQuizComplete(percentage >= PASSING_SCORE, percentage);
    }
  };

  // Compact mode - Just show button
  if (isCompact && !quiz) {
    return (
      <button
        onClick={generateQuiz}
        disabled={loading}
        className="quiz-compact-btn"
      >
        {loading ? (
          <>
            <Loader size={16} className="quiz-loader" />
            {lang === "ar" ? "التحضير..." : "Preparing..."}
          </>
        ) : (
          <>{lang === "ar" ? "ابدأ الاختبار" : "Start Quiz"}</>
        )}
      </button>
    );
  }

  // Full quiz view
  if (!quiz) {
    return (
      <div className="mt-4">
        {error && (
          <div className="quiz-alert quiz-alert-danger" role="alert">
            <AlertCircle size={18} />
            {error}
            <button
              type="button"
              className="quiz-alert-close"
              onClick={() => setError(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <button
          onClick={generateQuiz}
          disabled={loading}
          className="quiz-start-btn w-100"
          style={{ fontSize: "1rem", padding: "12px" }}
        >
          {loading ? (
            <>
              <Loader size={18} className="quiz-loader" />
              {lang === "ar" ? "جاري التحضير..." : "Preparing Quiz..."}
            </>
          ) : (
            <>{lang === "ar" ? "ابدأ الاختبار" : "Start Quiz"}</>
          )}
        </button>
      </div>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / quiz.length) * 100);
  const isPassed = percentage >= PASSING_SCORE;

  return (
    <div className="ai-quiz-container mt-4 w-100">
      {error && (
        <div className="quiz-alert quiz-alert-warning" role="alert">
          <AlertCircle size={18} />
          {error}
          <button
            type="button"
            className="quiz-alert-close"
            onClick={() => setError(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {quiz.map((question, qIdx) => (
        <div key={qIdx} className="quiz-question-container">
          <p className="quiz-question-number">
            {qIdx + 1}. {question.question}
          </p>

          <div className="quiz-options">
            {question.options.map((option, oIdx) => {
              const isCorrect = oIdx === question.correctAnswer;
              const userSelected = userAnswers[qIdx] === oIdx;
              const showCorrect = showResults && isCorrect;
              const showWrong = showResults && userSelected && !isCorrect;

              return (
                <div
                  key={oIdx}
                  className={`quiz-option-wrapper ${
                    showCorrect ? "quiz-option-correct" : ""
                  } ${showWrong ? "quiz-option-wrong" : ""}`}
                >
                  <input
                    type="radio"
                    name={`question-${qIdx}`}
                    id={`option-${qIdx}-${oIdx}`}
                    value={oIdx}
                    checked={userSelected}
                    onChange={() => {
                      handleAnswerSelect(qIdx, oIdx);
                      setError(null);
                    }}
                    className="quiz-option-input"
                    disabled={showResults}
                  />
                  <label
                    htmlFor={`option-${qIdx}-${oIdx}`}
                    className={`quiz-option-label ${
                      showResults ? "quiz-option-disabled" : ""
                    }`}
                  >
                    {option}
                    {showCorrect && (
                      <CheckCircle size={16} className="quiz-option-icon" />
                    )}
                    {showWrong && (
                      <XCircle size={16} className="quiz-option-icon" />
                    )}
                  </label>
                </div>
              );
            })}
          </div>

          {showResults && (
            <div className="quiz-explanation">
              <span className="quiz-explanation-label">
                {lang === "ar" ? "شرح" : "Explanation"}:
              </span>
              {question.explanation}
            </div>
          )}
        </div>
      ))}

      <div className="quiz-button-section">
        {!showResults ? (
          <button onClick={handleSubmit} className="quiz-submit-btn">
            {lang === "ar" ? "تسليم الاختبار" : "Submit Quiz"}
          </button>
        ) : (
          <>
            <div
              className={`quiz-results-card ${
                isPassed ? "quiz-results-passed" : "quiz-results-failed"
              }`}
            >
              <div className="quiz-results-header">
                <strong className="quiz-score-display">
                  {lang === "ar" ? "درجتك" : "Score"}: {score} / {quiz.length}
                </strong>
              </div>

              <p className="quiz-results-message">
                {isPassed
                  ? lang === "ar"
                    ? "ممتاز! لقد نجحت!"
                    : "Great! You Passed!"
                  : lang === "ar"
                  ? `تحتاج لـ ${PASSING_SCORE}% للمتابعة (درجتك: ${percentage}%)`
                  : `You need ${PASSING_SCORE}% to continue (Your score: ${percentage}%)`}
              </p>

              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>
            </div>

            {!isPassed && (
              <button
                onClick={generateQuiz}
                className="quiz-action-btn quiz-retry-btn"
              >
                {lang === "ar" ? "حاول مرة أخرى" : "Try Again"}
              </button>
            )}

            {isPassed && (
              <div className="quiz-success-message">
                {lang === "ar"
                  ? "أحسنت! يمكنك المتابعة للدرس التالي"
                  : "Great job! You can now move to the next lesson"}
              </div>
            )}

            {isPassed && (
              <button
                onClick={generateQuiz}
                className="quiz-action-btn quiz-new-quiz-btn"
              >
                {lang === "ar" ? "اختبار جديد" : "New Quiz"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIQuiz;
