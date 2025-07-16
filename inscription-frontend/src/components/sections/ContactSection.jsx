import React from 'react';

const ContactSection = () => {
  return (
    <section

      className="relative mt-[-20] pt-60 md:pt-80 pb-40 md:pb-60 bg-cover bg-no-repeat bg-center flex flex-col items-center justify-end"
      style={{ backgroundImage: "url('/assets/images/contact-section-bg.png')" }}
    >

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <h2 className="absolute top-16 left-8 md:top-24 md:left-24 text-4xl md:text-5xl font-bold text-white z-20">
        Contact
      </h2>

      <div className="relative z-40 max-w-5xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">

        <div
          className="relative md:w-1/2 p-4 md:p-8 flex items-center justify-center"
          style={{ backgroundImage: "url('/assets/images/contact-section-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          
          <div className="relative z-10 bg-[#2A3B7C] text-white rounded-lg shadow-lg w-full px-16 py-10 flex flex-col justify-center">
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <span className="text-base">+237 612 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <span className="text-base">contact@igniteacademy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <span className="text-base">Emana, Yaounde, Cameroon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-8 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Ignite Academy"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ex: contact@igniteacademy.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Objet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="L'objet de votre message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Votre message"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#2A3B7C] hover:bg-[#3B4C8D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;