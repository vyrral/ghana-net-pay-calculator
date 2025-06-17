
import Navigation from "@/components/Navigation";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
          
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about our salary calculator or need assistance? We're here to help!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600">business@kobydigital.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600">+233 274969899</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Hours</h3>
              <div className="text-gray-600 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
