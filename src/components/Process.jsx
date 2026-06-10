const steps = [
  {
    number: 1,
    title: "Identification of Transactions",
    description:
      "Recognize and identify all financial transactions that occur within the business. This includes sales, purchases, expenses.",
  },
  {
    number: 2,
    title: "Posting to Ledgers",
    description:
      "The general ledger contains all the accounts used by the business and summarizes the financial activity.",
  },
  {
    number: 3,
    title: "Post-Closing Trial Balance",
    description:
      "Verify that all temporary accounts have been closed and that the post-closing trial balance is in balance.",
  },
];

const StepCard = ({ number, title, description }) => (
  <div>
    <div className="w-11 h-11 rounded-full shadow-lg border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-base mb-4 bg-white">
      {number}
    </div>
    <h3 className="text-lg md:text-3xl font-normal text-[#1a1a2e] mb-2">
      {title}
    </h3>
    <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
  </div>
);

export default function Process() {
  return (
    <section className="bg-white py-20 px-4 sm:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Top row: heading + description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start mb-8">
          <div>
            <p className="text-xl text-[#38b6ff] mb-4">Process</p>
            <h2 className="text-4xl md:text-6xl font-normal text-[#1a1a2e]  ">
              How It Works
            </h2>
          </div>
          <p className="text-xl text-gray-700 pt-0 md:pt-2">
            The process of accounting involves a series of systematic steps to
            record, analyze, and report financial transactions. Here is an
            overview of the accounting process:
          </p>
        </div>

        {/* Divider: full-width gray line + right-side blue accent */}
        <div className="relative mb-10">
          <div className="w-full h-px bg-gray-200" />
          <div className="absolute top-0 right-0 w-1/2 h-0.5 bg-blue-600" />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>

      </div>
    </section>
  );
}