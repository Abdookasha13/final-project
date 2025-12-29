import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaTimes, FaRobot } from "react-icons/fa";
import { SiChatbot } from "react-icons/si";
import "./ChatWidget.css";
import { useTranslation } from "react-i18next";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question) return;

    const userMsg = { from: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1911/ai/auto-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const aiMsg = {
        from: "ai",
        text: data.answer || t("chatWidget.errorDefault"),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: t("chatWidget.errorConnection"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => setOpen((v) => !v);
  const closeChat = () => setOpen(false);

  return (
    <div className="chat-wrapper">
      <button
        className={`chat-toggle ${open ? "active" : ""}`}
        onClick={toggleChat}
        aria-label={
          open ? t("chatWidget.toggleClose") : t("chatWidget.toggleOpen")
        }
      >
        {open ? <FaTimes /> : <SiChatbot />}
      </button>

      {open && (
        <div
          className="chat-box"
          role="dialog"
          aria-label={t("chatWidget.assistantTitle")}
        >
          <div className="chat-header">
            <div className="chat-header-left">
              <span className="chat-avatar">
                <FaRobot />
              </span>
              <div className="chat-header-content">
                <div className="chat-title">
                  {t("chatWidget.assistantTitle")}
                </div>
                <div className="chat-subtitle">
                  {t("chatWidget.assistantSubtitle")}
                </div>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={closeChat}
              aria-label={t("chatWidget.closeButton")}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-body">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-title">
                  {t("chatWidget.welcomeTitle")}
                </div>
                <p className="chat-welcome-text">
                  {t("chatWidget.welcomeText")}
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg-${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-msg chat-msg-ai typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <textarea
              placeholder={t("chatWidget.inputPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label={t("chatWidget.sendButton")}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
