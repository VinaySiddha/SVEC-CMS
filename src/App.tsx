import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingChatWidgets from './components/FloatingChatWidgets';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Examinations from './pages/Examinations';
import Departments from './pages/Departments';
import CSEDepartment from './pages/departments/CSE';
import CSTDepartment from './pages/departments/CST';
import ECEDepartment from './pages/departments/ECE';
import MechDepartment from './pages/departments/Mechanical';
import CivilDepartment from './pages/departments/Civil';
import EEEDepartment from './pages/departments/EEE';
// New specialized department pages
import CSEAIDepartment from './pages/departments/CSEAI';
import CSEDSDepartment from './pages/departments/CSEDS';
import AIMLDepartment from './pages/departments/AIML';
import ECTDepartment from './pages/departments/ECT';
import BSHDepartment from './pages/departments/BSH';
import MBADepartment from './pages/departments/MBA';
import RDInnovation from './pages/RDInnovation';
import Infrastructure from './pages/Infrastructure';
import Placements from './pages/Placements';
import Library from './pages/Library';
import Contact from './pages/Contact';
import Admissions from './pages/Admissions';
// Administration pages
import DirectorTechnical from './pages/administration/DirectorTechnical';
import Principal from './pages/administration/Principal';
import Deans from './pages/administration/Deans';
import HeadOfDepartments from './pages/administration/HeadOfDepartments';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) return <Loader onLoadingComplete={handleLoadingComplete} />;

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-[#FFF8F0]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/examinations" element={<Examinations />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/cse" element={<CSEDepartment />} />
            <Route path="/departments/cst" element={<CSTDepartment />} />
            <Route path="/departments/ece" element={<ECEDepartment />} />
            <Route path="/departments/mech" element={<MechDepartment />} />
            <Route path="/departments/civil" element={<CivilDepartment />} />
            <Route path="/departments/eee" element={<EEEDepartment />} />
            {/* New specialized department routes */}
            <Route path="/departments/cse-ai" element={<CSEAIDepartment />} />
            <Route path="/departments/cse-ds" element={<CSEDSDepartment />} />
            <Route path="/departments/aiml" element={<AIMLDepartment />} />
            <Route path="/departments/ect" element={<ECTDepartment />} />
            <Route path="/departments/bsh" element={<BSHDepartment />} />
            <Route path="/departments/mba" element={<MBADepartment />} />
            {/* Administration routes */}
            <Route path="/administration/director-technical" element={<DirectorTechnical />} />
            <Route path="/administration/principal" element={<Principal />} />
            <Route path="/administration/deans" element={<Deans />} />
            <Route path="/administration/hod" element={<HeadOfDepartments />} />
            <Route path="/rd-innovation" element={<RDInnovation />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Chat Widgets */}
        <FloatingChatWidgets />
      </div>
    </Router>
  );
}

export default App;
