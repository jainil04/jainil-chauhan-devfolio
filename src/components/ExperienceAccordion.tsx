"use client";

// import { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ExperienceItem } from "@/types/types";

type Props = {
  experiences: ExperienceItem[];
};

const ExperienceAccordion = ({ experiences }: Props) => {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  // const toggle = (index: number) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <div className="space-y-10 py-10">
      {experiences.map((exp, index) => {
        // const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-br from-[#0f1117]/30 to-[#1a1f2e]/30 rounded-3xl p-10 shadow-xl max-w-6xl mx-auto transition-all duration-300"
          >
            {/* Left side - text */}
            <div className="flex-1 space-y-4 text-left">
              <h2 className="text-2xl lg:text-3xl font-semibold text-white">
                {exp.title}
              </h2>
              <p className="text-gray-300">{exp.company}</p>
              <p className="text-sm text-gray-300">{exp.date}</p>

              {/* { exp.responsibilities?.length &&
                <button
                onClick={() => toggle(index)}
                className="mt-4 inline-flex items-center gap-2 text-sm text-white border border-white/30 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                {isOpen ? "Hide Details" : "View Details"}
              </button>
              } */}
            </div>

            {/* Right side - expanded content or visual */}
            {/* <div className="flex-1 mt-10 lg:mt-0 lg:ml-10 w-full h-[180px] overflow-hidden">
              <div className="h-full w-full">
                {isOpen && (
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2 overflow-y-auto h-full pr-2">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div> */}
            <div className="flex-1 mt-10 lg:mt-0 lg:ml-10 w-full overflow-hidden">
              <div className="h-full w-full">
                {(
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2 overflow-y-auto h-full pr-2">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ExperienceAccordion;
