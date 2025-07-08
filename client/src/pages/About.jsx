import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 text-gray-800">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">About Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold">BookVerse</span>, your trusted destination to discover, explore, and purchase books across genres and languages. We aim to make reading more accessible, enjoyable, and rewarding.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-blue-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Mission</h2>
        <p>
          At BookVerse, our mission is to ignite the love for reading by providing a seamless platform that connects readers with their favorite books. Whether you're a student, a casual reader, or a book collector — we've got something for everyone.
        </p>
      </section>

      {/* Vision Section */}
      <section className="bg-green-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-green-700 mb-3">Our Vision</h2>
        <p>
          We envision a world where knowledge is freely explored, stories are widely shared, and readers from every corner can access books in their preferred language and format.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-semibold text-purple-700 mb-3">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Wide selection of books in multiple languages</li>
          <li>Easy-to-use online cart and wishlist system</li>
          <li>Admin features to manage and edit books</li>
          <li>Secure and user-friendly platform</li>
          <li>Passionate team that loves books as much as you do!</li>
        </ul>
      </section>

      {/* Final Note */}
      <section className="text-center pt-6">
        <p className="text-gray-600 italic">
          Thank you for being a part of our reading community. Together, let’s turn every page with purpose.
        </p>
      </section>
    </div>
  );
};

export default About;
