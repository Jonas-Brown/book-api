const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-black px-8 py-6">
            <h1 className="text-3xl font-extrabold text-white text-center">
              About BookInfoApp
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Learn more about the team and purpose behind the app
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              <span className="font-semibold text-black">BookInfoApp</span> is a
              simple and elegant solution for managing your personal or
              institutional book inventory. Whether you're a small library,
              bookstore, or an avid reader, BookInfoApp helps you keep track of
              your collection with ease.
            </p>

            <p>
              The application allows you to add new books, store information
              such as ISBN, author, and category, and even upload book cover
              images for easy recognition. Designed with a user-friendly
              interface and intuitive flow, it aims to reduce the friction of
              book management.
            </p>

            <p>
              This project was built using modern technologies including{" "}
              <span className="font-medium">React, Tailwind CSS</span>, and{" "}
              <span className="font-medium">Spring Boot</span> on the backend.
              It is designed to be scalable, clean, and fast — ensuring you can
              focus on organizing rather than troubleshooting.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Meet the Creator
              </h2>
              <p>
                This app was created by a passionate developer who loves books
                and building useful software. If you’d like to contribute,
                report bugs, or request features, feel free to reach out or
                submit a pull request to the GitHub repo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
