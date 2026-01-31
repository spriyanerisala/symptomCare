import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold pl-10">SymptomCare+</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>

        <Link to="/appointment" className="hover:text-gray-200">Appointment</Link>
        <Link to="/doctors" className="hover:text-gray-200">
  Doctors
</Link>
<Link to="/ai-symptoms" className="hover:text-gray-200">
  AI Symptoms Checker
</Link>
      </div>
    </nav>
  );
};

export default Navbar;
