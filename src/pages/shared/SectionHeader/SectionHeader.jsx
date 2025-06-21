function SectionHeader({ title, desc }) {
  return (
    <div className="text-center mb-10 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-100">
        {title}
      </h2>
      <p className=" text-gray-400 max-w-[720px] mx-auto">{desc}</p>
    </div>
  );
}

function SectionHeader2({ title, desc }) {
  return (
    <div className="text-center mb-10 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-teal-950">
        {title}
      </h2>
      <p className=" text-gray-400 max-w-[720px] mx-auto">{desc}</p>
    </div>
  );
}
export { SectionHeader, SectionHeader2 };
