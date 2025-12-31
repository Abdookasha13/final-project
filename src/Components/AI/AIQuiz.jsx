
import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const AIQuiz = ({ lessonContent, lessonTitle, token, lang = "en" }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const API_BASE = "http://localhost:1911";

  const generateQuiz = async () => {
    setLoading(true);
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
      alert("Error generating quiz");
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

  if (!quiz) {
    return (
      <button
        onClick={generateQuiz}
        disabled={loading}
        className="btn btn-primary mt-4"
        style={{ width: "100%" }}
      >
        {loading ? (
          <>
            <Loader size={18} className="me-2" /> Generating Quiz...
          </>
        ) : (
          "📝 Generate AI Quiz"
        )}
      </button>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / quiz.length) * 100);

  return (
    <div className="mt-4 p-4 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
      <h5 className="mb-4">
        <span style={{ color: "#0ab99d" }}>🤖</span> AI-Generated Quiz
      </h5>

      {quiz.map((question, qIdx) => (
        <div key={qIdx} className="mb-4 p-3 bg-white rounded border">
          <p className="fw-bold mb-3">
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
                    onChange={() => handleAnswerSelect(qIdx, oIdx)}
                    className="form-check-input"
                    disabled={showResults}
                  />
                  <label
                    htmlFor={`option-${qIdx}-${oIdx}`}
                    className={`form-check-label d-flex align-items-center gap-2 ${
                      showCorrect ? "text-success fw-bold" : ""
                    } ${showWrong ? "text-danger" : ""}`}
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
              style={{ backgroundColor: "#e7f3f0", borderLeft: "4px solid #0ab99d" }}
            >
              <small className="text-muted">
                <strong>💡 Explanation:</strong> {question.explanation}
              </small>
            </div>
          )}
        </div>
      ))}

      <div className="mt-4">
        {!showResults ? (
          <button onClick={() => setShowResults(true)} className="btn btn-success w-100">
            Submit Quiz
          </button>
        ) : (
          <>
            <div
              className="alert alert-info mb-3"
              role="alert"
              style={{
                backgroundColor: percentage >= 70 ? "#d4edda" : "#fff3cd",
                borderColor: percentage >= 70 ? "#c3e6cb" : "#ffeaa7",
              }}
            >
              <strong>Score: {score} / {quiz.length}</strong>
              <p className="mb-0 mt-2">
                {percentage >= 70
                  ? "✅ Great job! You passed!"
                  : "📚 Keep practicing!"}
              </p>
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: percentage >= 70 ? "#28a745" : "#ffc107",
                  }}
                ></div>
              </div>
            </div>
            <button
              onClick={generateQuiz}
              className="btn btn-primary w-100"
            >
              Generate New Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIQuiz;



