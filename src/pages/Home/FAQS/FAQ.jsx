function FAQ({ question, answer }) {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title font-semibold text-teal-900 md:text-lg lg:text-xl">
        {question}
      </div>
      <div className="collapse-content text-sm lg:text-[16px] text-gray-500/70">
        {answer}
      </div>
    </div>
  );
}
export default FAQ;
