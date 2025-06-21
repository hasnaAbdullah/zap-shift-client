import React from "react";
import { SectionHeader2 } from "../../shared/SectionHeader/SectionHeader";
import FAQ from "./FAQ";

const faqData = [
  {
    question: "How long does parcel delivery take?",
    answer:
      "Delivery usually takes 24–72 hours depending on the location. Express delivery within Dhaka is completed within 4–6 hours.",
  },
  {
    question: "Can I track my parcel in real-time?",
    answer:
      "Yes, we offer live parcel tracking so you can monitor your shipment's journey from pickup to delivery.",
  },
  {
    question: "Do you offer Cash on Delivery (COD) service?",
    answer:
      "Yes, we provide 100% cash on delivery service across Bangladesh, ensuring secure and reliable payment handling.",
  },
  {
    question: "What should I do if my parcel is delayed?",
    answer:
      "If your parcel is delayed, please contact our 24/7 support center. We'll assist you with real-time updates and solutions.",
  },
];

function FAQS() {
  return (
    <section className="max-w-5xl mx-auto my-24">
      <SectionHeader2
        title="Frequently Asked Question (FAQ)"
        desc="Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!"
      />
      <div className="space-y-5 ">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold text-teal-900 md:text-lg lg:text-xl">
            How does this posture corrector work?
          </div>
          <div className="collapse-content text-sm lg:text-[16px] text-gray-500/70 ">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>

        {faqData.map((faq, index) => (
          <FAQ key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

export default FAQS;
