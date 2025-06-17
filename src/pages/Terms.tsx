
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
          
          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              By accessing and using the Ghana Salary Calculator, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Ghana Salary Calculator 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
              of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Service Availability</h2>
            <p>
              We reserve the right to modify or discontinue the service at any time without notice. We shall not 
              be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Accuracy of Information</h2>
            <p>
              The materials appearing on Ghana Salary Calculator could include technical, typographical, or 
              photographic errors. We do not warrant that any of the materials on its website are accurate, 
              complete, or current.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Privacy Policy</h2>
            <p>
              Your privacy is important to us. We do not collect personal information unless voluntarily provided. 
              Any information collected is used solely for the purpose of providing our services.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Ghana, 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at business@kobydigital.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
