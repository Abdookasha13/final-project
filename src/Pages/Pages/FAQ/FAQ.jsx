import { useState } from "react";
import FaqsBox from "../../../Components/FaqsBox/FaqsBox";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  const arr = [
    {
      question: t("faq.question1"),
      answer:
        t("faq.answer1"),
      imgUrl: "https://ordainit.com/html/educate/assets/img/faq/thumb-1.jpg",
    },
    {
      question: t("faq.question2"),
      answer:
        t("faq.answer2"),
      imgUrl: "https://ordainit.com/html/educate/assets/img/faq/thumb-2.jpg",
    },
    {
      question: t("faq.question3"),
      answer:
        t("faq.answer3"),
      imgUrl: "https://ordainit.com/html/educate/assets/img/faq/thumb-2.jpg",
    },
    {

      question: t("faq.question4"),
      answer:
        t("faq.answer4"),
      imgUrl: "https://ordainit.com/html/educate/assets/img/faq/thumb-2.jpg",
    },
    {
      question: t("faq.question5"),
      answer:
        t("faq.answer5"),
      imgUrl: "https://ordainit.com/html/educate/assets/img/faq/thumb-2.jpg",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="py-5 my-5">
        {arr.map((faq, index) => (
          <FaqsBox
            key={index}
            question={faq.question}
            answer={faq.answer}
            imgUrl={faq.imgUrl}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </>
  );
}

export default FAQ;
