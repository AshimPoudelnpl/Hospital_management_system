import React, { useState } from "react";
import { useSendContactMutation } from "@Redux/features/contactSlice.js";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sendContact, { isLoading }] = useSendContactMutation();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContact(form).unwrap();
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* LEFT SIDE */}
      <div className="lg:w-1/2 bg-gray-100 p-8 lg:p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          NEED HELP? WE ARE HERE.
        </h1>
        <div className="w-20 h-1 bg-blue-600 mb-6"></div>
        <p className="text-gray-600 mb-8">
          Call us at the number below or fill out the form to hear back from us.
        </p>
        <div className="space-y-4 mb-8">
          <p className="flex items-center text-gray-700">
            <FaPhoneAlt className="text-blue-600 mr-3" /> 081-5403520
          </p>
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-blue-600 mr-3" /> Kohalpur Nepal
          </p>
          <p className="flex items-center text-gray-700">
            <FaEnvelope className="text-blue-600 mr-3" /> swastikhospital@gmail.com
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Kohalpur,Nepal&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/2 bg-gray-100 p-8 lg:p-12 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg border border-gray-300 rounded-lg p-8 shadow-lg space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
