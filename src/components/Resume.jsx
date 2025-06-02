export default function Resume() {
  return (
    <section id="resume" className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Resume</h2>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        {/* Add your resume details here */}
        <p className="mb-4">Download my resume or view my experience and education below.</p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mb-6 inline-block">Download Resume (PDF)</a>
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Experience</h3>
          <ul className="list-disc pl-5">
            <li>Job Title 1 - Company 1 (Year - Year)</li>
            <li>Job Title 2 - Company 2 (Year - Year)</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2">Education</h3>
          <ul className="list-disc pl-5">
            <li className="md:underline">Degree - School (Year)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
