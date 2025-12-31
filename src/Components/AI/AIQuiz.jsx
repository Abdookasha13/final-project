import React, { useState } from "react";
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
        style={{
          padding: "10px 20px",
          backgroundColor: "#0ab99d",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.9rem",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <>
            <Loader
              size={16}
              style={{
                display: "inline-block",
                animation: "spin 1s linear infinite",
              }}
            />
            {lang === "ar" ? "التحضير..." : "Preparing..."}
          </>
        ) : (
          <>📝 {lang === "ar" ? "ابدأ الاختبار" : "Start Quiz"}</>
        )}
      </button>
    );
  }

  // Full quiz view
  if (!quiz) {
    return (
      <div className="mt-4">
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <AlertCircle size={18} className="me-2" />
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}
        <button
          onClick={generateQuiz}
          disabled={loading}
          className="btn btn-primary w-100"
          style={{ fontSize: "1rem", padding: "10px" }}
        >
          {loading ? (
            <>
              <Loader
                size={18}
                className="me-2"
                style={{
                  display: "inline-block",
                  animation: "spin 1s linear infinite",
                }}
              />
              {lang === "ar" ? "جاري التحضير..." : "Preparing Quiz..."}
            </>
          ) : (
            <>📝 {lang === "ar" ? "ابدأ الاختبار" : "Start Quiz"}</>
          )}
        </button>
      </div>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / quiz.length) * 100);
  const isPassed = percentage >= PASSING_SCORE;

  return (
    <div
      className="mt-4 p-4  w-100"
      // style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* <div className="mb-4">
        <h5 className="fw-semibold mb-1">
          {lang === "ar" ? "التطبيق والتقييم" : "Practice & Assessment"}
        </h5>
        <small className="text-muted">
          {lang === "ar"
            ? "اختبر فهمك للمحتوى قبل المتابعة"
            : "Check your understanding before moving on"}
        </small>
      </div> */}

      {error && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <AlertCircle size={18} className="me-2" />
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {quiz.map((question, qIdx) => (
        <div key={qIdx} className="mb-4 p-3 bg-white rounded border">
          <p className="fw-bold mb-3" style={{ fontSize: "1.05rem" }}>
            {qIdx + 1}. {question.question}
          </p>

          <div className="ms-3">
            {question.options.map((option, oIdx) => {
              const isCorrect = oIdx === question.correctAnswer;
              const userSelected = userAnswers[qIdx] === oIdx;
              const showCorrect = showResults && isCorrect;
              const showWrong = showResults && userSelected && !isCorrect;

              return (
                <div key={oIdx} className="form-check mb-2">
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
                    className="form-check-input"
                    disabled={showResults}
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    htmlFor={`option-${qIdx}-${oIdx}`}
                    className={`form-check-label d-flex align-items-center gap-2 ${
                      showCorrect ? "text-success fw-bold" : ""
                    } ${showWrong ? "text-danger" : ""}`}
                    style={{
                      cursor: showResults ? "default" : "pointer",
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: showCorrect
                        ? "#d4edda"
                        : showWrong
                        ? "#f8d7da"
                        : "transparent",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {option}
                    {showCorrect && <CheckCircle size={16} />}
                    {showWrong && <XCircle size={16} />}
                  </label>
                </div>
              );
            })}
          </div>

          {showResults && (
            <div
              className="mt-3 p-3 rounded"
              style={{
                backgroundColor: "#e7f3f0",
                borderLeft: "4px solid #10b981",
              }}
            >
              <small className="text-muted">
                <strong>💡 {lang === "ar" ? "شرح" : "Explanation"}:</strong>{" "}
                {question.explanation}
              </small>
            </div>
          )}
        </div>
      ))}

      <div className="mt-4 ">
        {!showResults ? (
          <button
            onClick={handleSubmit}
            className="btn  w-25 "
            style={{
              padding: "12px",
              fontSize: "1rem",
              backgroundColor: "#0ab99d",
            }}
          >
            {lang === "ar" ? "تسليم الاختبار" : "Submit Quiz"}
          </button>
        ) : (
          <>
            <div
              className="alert mb-3 p-3"
              role="alert"
              style={{
                backgroundColor: isPassed ? "#d4edda" : "#fff3cd",
                borderColor: isPassed ? "#c3e6cb" : "#ffeaa7",
                border: "2px solid",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong style={{ fontSize: "1.1rem" }}>
                  {lang === "ar" ? "درجتك" : "Score"}: {score} / {quiz.length}
                </strong>
                <span style={{ fontSize: "1.2rem" }}>
                  {isPassed ? "✅" : "📚"}
                </span>
              </div>

              <p className="mb-2">
                {isPassed
                  ? lang === "ar"
                    ? "🎉 ممتاز! لقد نجحت!"
                    : "🎉 Great! You Passed!"
                  : lang === "ar"
                  ? `⚠️ تحتاج لـ ${PASSING_SCORE}% للمتابعة (درجتك: ${percentage}%)`
                  : `⚠️ You need ${PASSING_SCORE}% to continue (Your score: ${percentage}%)`}
              </p>

              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: isPassed ? "#28a745" : "#ffc107",
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>

            {!isPassed && (
              <button
                onClick={generateQuiz}
                className="btn btn-warning w-100 mb-2"
                style={{ padding: "12px", fontSize: "1rem" }}
              >
                {lang === "ar" ? "حاول مرة أخرى" : "Try Again"}
              </button>
            )}

            {isPassed && (
              <div
                className="p-3 rounded-3 mt-3"
                style={{
                  backgroundColor: "#e7f3f0",
                  borderLeft: "4px solid #10b981",
                }}
              >
                {lang === "ar"
                  ? "🎉 أحسنت! يمكنك المتابعة للدرس التالي"
                  : "🎉 Great job! You can now move to the next lesson"}
              </div>
            )}

            {isPassed && (
              <button
                onClick={generateQuiz}
                className="btn btn-primary w-100"
                style={{ padding: "12px", fontSize: "1rem" }}
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
