import HowWeWork from "../components/HowweWork";
import OurValues from "../components/OurValues";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";

export default function AboutPage() {
  return (
    <>
    <div>
      {/* HERO SECTION */}
      <div
        className="relative flex items-center justify-center flex-col text-center px-5 py-16 md:py-24"
        style={{
          background:
            "linear-gradient(rgba(15,30,60,0.62), rgba(15,30,60,0.62)), url('/images/bg.webp') center/cover no-repeat",
          minHeight: 540,
        }}
      >
        <h2 className="text-white font-medium text-8xl mb-8">
          About Us
        </h2>
        <p className="text-white/85 text-xl max-w-md">
          Accounting data is often used by governments and policymakers for
          economic planning and analysis.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-20 sm:px-16">
        
        {/* ✅ Using a 12-column grid for precise, balanced width control */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* ✅ Text takes up 7 out of 12 columns (~58% width) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="text-[#38b6ff] text-2xl font-medium mb-6">
              About Us
            </p>
            <h2 className="text-gray-900 font-normal text-5xl mb-5 tracking-wide ">
              Navigating The World Of Accounting For Financial Clarity And
              Success
            </h2>
            <p className="text-black text-xl mb-8 leading-relaxed">
              Record each transaction in the accounting system. This is
              typically done through a process called bookkeeping, where
              transactions are entered into journals or ledgers. Common tools
              include accounting software or manual accounting records.
            </p>
            <button className="border-2 border-[#38b6ff] text-white bg-[#38b6ff] hover:bg-blue-50 hover:text-[#38b6ff] text-xl font-medium px-8 py-3 rounded-full transition-colors w-fit">
              Request a Consultation
            </button>
          </div>

          {/* ✅ Image takes up 5 out of 12 columns (~42% width) - perfectly balanced */}
          <div
            className="md:col-span-5 w-full "
            style={{
              background: "url('/images/about1.jpg') center/cover no-repeat",
              minHeight: 580, 
              height: "100%",
            }}
          ></div>
        </div>
      </div>
    </div>
  
    <OurValues/>
      <HowWeWork/>
    <Testimonials/>
    <Process/>
    </>
  );
}