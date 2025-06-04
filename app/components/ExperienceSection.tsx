import React from "react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
        <h2 className="text-5xl mb-8">
          Experience
        </h2>
     <div className="flex flex-col items-center justify-between mb-8">
      <div className="space-y-12">
        {/* Experience Item */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Senior Frontend Developer</h3>
            <p className="text-lg text-[var(--color-secondary)]">Company Name</p>
            <p className="text-sm opacity-70">2020 - Present</p>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4">
              Led the development of multiple web applications using React, TypeScript, and modern frontend technologies. 
              Collaborated with cross-functional teams to deliver high-quality products.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Architected and implemented responsive web applications</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Optimized application performance and reduced load times by 40%</li>
            </ul>
          </div>
        </div>

        {/* Experience Item */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Frontend Developer</h3>
            <p className="text-lg text-[var(--color-secondary)]">Previous Company</p>
            <p className="text-sm opacity-70">2018 - 2020</p>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4">
              Developed and maintained web applications using modern JavaScript frameworks.
              Worked closely with designers to implement pixel-perfect interfaces.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Built reusable component libraries</li>
              <li>Implemented responsive designs for mobile and desktop</li>
              <li>Integrated REST APIs and third-party services</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
