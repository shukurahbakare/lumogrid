import { faq } from "@/lib/faq";
import React, { useEffect, useRef } from "react";
import { FaRegCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const FAQs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (current: HTMLDetailsElement) => {
    if (!containerRef.current) return;
    const allDetails = containerRef.current.querySelectorAll("details");

    allDetails.forEach((detail) => {
      if (detail !== current && detail.open) {
        detail.removeAttribute("open");
      }
    });
  };

  useEffect(() => {
    const details = containerRef.current?.querySelectorAll("details") || [];

    details.forEach((detail) => {
      const content = detail.querySelector(".content") as HTMLDivElement;
      if (!content) return;

      const setMaxHeight = () => {
        if (detail.open) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0px";
        }
      };

      detail.addEventListener("toggle", setMaxHeight);
      setMaxHeight();
    });
  }, []);

  return (
    <div ref={containerRef} className="mt-10">
      {faq.map((item, index) => (
        <details
          key={index}
          className="group border-b border-green-300 py-4 transition-all duration-300"
          onToggle={(e) => handleToggle(e.currentTarget)}
        >
          <summary className="flex justify-between items-start cursor-pointer list-none">
            <div className="flex items-start gap-4">
              <FaRegCircle className="text-green-500 mt-1 flex-shrink-0" />
              <h3 className="text-lg font-semibold">{item.question}</h3>
            </div>

            <MdKeyboardArrowDown
              className={`
                   text-2xl text-green-600 transition-transform duration-300 mt-1
                   group-open:rotate-180
                 `}
            />
          </summary>

          <div
            className="content ml-8 overflow-hidden transition-all duration-500 ease-in-out max-h-0"
            style={{ maxHeight: "0px" }}
          >
            <p className="text-gray-700 py-3">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default FAQs;
