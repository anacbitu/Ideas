
import React, { useState } from 'react';
import { MODULES } from './constants';
import { ModuleData } from './types';
import Layout from './components/Layout';
import ModuleDetail from './components/ModuleDetail';
import LiveConversation from './components/LiveConversation';

const App: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [showPractice, setShowPractice] = useState(false);

  const handleGoHome = () => {
    setSelectedModule(null);
    setShowPractice(false);
  };

  return (
    <Layout onGoHome={handleGoHome}>
      {!selectedModule && !showPractice && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-header text-gray-900 mb-4 tracking-tight">
              Bora falar <span className="text-green-600">Português?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Master the basics of Brazilian Portuguese with bite-sized modules and real AI conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className="group relative bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 text-left overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className={`${module.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-header">{module.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{module.description}</p>
                <div className="flex items-center text-green-600 font-bold text-sm">
                  Start Learning
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ))}
            
            {/* Live Practice Card */}
            <button
              onClick={() => setShowPractice(true)}
              className="group relative bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all text-left overflow-hidden flex flex-col h-full transform hover:-translate-y-1 lg:col-span-2"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 text-white">
                🎙️
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-header">Live Speaking Lab</h3>
              <p className="text-white/80 text-sm mb-6 flex-grow">
                Practice what you've learned with our friendly AI coach in real-time. No judgment, just learning!
              </p>
              <div className="bg-white text-green-700 px-4 py-2 rounded-full font-bold text-sm self-start group-hover:bg-green-50 transition-colors">
                Try Speaking Now
              </div>
            </button>
          </div>
        </div>
      )}

      {selectedModule && (
        <ModuleDetail 
          module={selectedModule} 
          onBack={() => setSelectedModule(null)} 
        />
      )}

      {showPractice && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button 
            onClick={() => setShowPractice(false)}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Modules
          </button>
          <LiveConversation />
        </div>
      )}
    </Layout>
  );
};

export default App;
