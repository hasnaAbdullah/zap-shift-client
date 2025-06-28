import React, { useEffect, useRef, useState } from "react";

const stepsData = [
  {
    title: "প্রথম সপ্তাহ",
    description:
      "আমরা এই সপ্তাহে দুটি মডিউল শেষ করবো এবং রিয়াক্ট এর বেসিক জিনিসগুলো সম্পর্কে জানবো।",
    tags: ["রিয়াক্ট কি", "রিয়াক্ট কিভাবে কাজ করে", "জেএসএক্স"],
  },
  {
    title: "দ্বিতীয় সপ্তাহ",
    description: "স্টেট ম্যানেজমেন্ট ও প্রপস ড্রিলিং করবো।",
    tags: [],
  },
  {
    title: "তৃতীয় সপ্তাহ",
    description:
      "API ডেটা ফেচ, useEffect, ও অন্যান্য React Hook নিয়ে কাজ করবো।",
    tags: [],
  },
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-start relative pl-10 border-l-2 border-blue-500 space-y-10">
      {stepsData.map((step, index) => (
        <div
          key={index}
          ref={(el) => (stepRefs.current[index] = el)}
          data-index={index}
          className="relative"
        >
          {/* Circle */}
          <div
            className={`absolute -left-5 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
              ${
                activeStep === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-500 border-blue-500 bg-white"
              }`}
          >
            {index + 1}
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-white mb-1">
            {step.title}
          </h3>
          <p className="text-gray-300 mb-2">{step.description}</p>
          {step.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag, i) => (
                <span
                  key={i}
                  className="border border-cyan-400 text-cyan-400 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
