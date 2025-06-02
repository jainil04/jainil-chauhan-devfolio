export default function Projects() {
  return (
    <section id="projects" className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add your project cards or details here */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Project Title</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Short project description goes here.</p>
          <a href="#" className="text-blue-600 hover:underline">View Details</a>
        </div>
      </div>
    </section>
  );
}
