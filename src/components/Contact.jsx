export default function Contact() {
  return (
    <section id="contact" className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <form className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
          <input className="w-full p-2 border rounded" type="text" id="name" name="name" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
          <input className="w-full p-2 border rounded" type="email" id="email" name="email" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor="message">Message</label>
          <textarea className="w-full p-2 border rounded" id="message" name="message" rows={4} required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Send</button>
      </form>
    </section>
  );
}
