import { useState } from "react";
import BusinessGrow from "../components/Businessgrow";
import FAQ from "../components/FAQ";

const teamMembers = [
  {
    name: "Theresa Webb",
    role: "Bookkeeper",
    photo: "/images/t1.webp",
  },
  {
    name: "Nansi Link",
    role: "Auditor",
    photo: "/images/t2.webp",
  },
  {
    name: "Jessica Robinson",
    role: "Accountant",
    photo: "/images/t3.webp",
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#374151" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="#374151" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="#374151" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
      <path
        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OurTeam() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      

   
      <div
        className="flex flex-col items-center justify-center text-center px-5 py-16"
        style={{
          background:
            "linear-gradient(rgba(10,22,50,0.60), rgba(10,22,50,0.60)), url('/images/bgteam.webp') center/cover no-repeat",
          minHeight: 540,
        }}
      >
        <h1
          className="text-white font-medium mb-8 text-7xl"
        
        >
          Our Team
        </h1>
        <p className="text-white/80 text-xl max-w-xl font-medium ">
          Accounting data is often used by governments and policymakers for economic planning and analysis.
        </p>
      </div>

      {/* ── TEAM SECTION ── */}
      <div className="bg-white py-20 px-6 sm:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#38b6ff] font-medium text-xl mb-8 tracking-wide">Our Team</p>
          <h2
            className="text-center text-6xl font-medium text-blue-950 mb-12"
            
          >
            Our Experienced Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col">
                {/* Photo card with social icons */}
                <div
                  className="relative  overflow-hidden"
                  style={{ height: 430 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `url('${member.photo}') top center/contain no-repeat`,
                    }}
                  />
                  {/* Social icons — absolute bottom right */}
                  <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                      <InstagramIcon />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                      <FacebookIcon />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mt-3">
                  <p className="text-2xl font-medium text-blue-950">{member.name}</p>
                  <p className="text-md text-gray-800 mt-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BusinessGrow/>
      <FAQ/>
    </>
    
  );
}