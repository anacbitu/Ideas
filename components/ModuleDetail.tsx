
import React, { useState } from 'react';
import { ModuleData } from '../types';
import TTSButton from './TTSButton';

interface ModuleDetailProps {
  module: ModuleData;
  onBack: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, onBack }) => {
  const [tab, setTab] = useState<'vocab' | 'phrases' | 'dialogue'>('vocab');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Modules
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className={`${module.color} p-8 text-white`}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{module.icon}</span>
            <h2 className="text-3xl font-bold font-header">{module.title}</h2>
          </div>
          <p className="text-white/80 max-w-lg">{module.description}</p>
        </div>

        <div className="flex border-b border-gray-100">
          {(['vocab', 'phrases', 'dialogue'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-4 text-sm font-semibold transition-all ${tab === t ? 'text-green-600 border-b-2 border-green-600 bg-green-50/30' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t === 'vocab' ? 'Vocabulary' : t === 'phrases' ? 'Key Phrases' : 'Dialogue'}
            </button>
          ))}
        </div>

        <div className="p-8">
          {tab === 'vocab' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.vocabulary.map((v, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-bold text-lg text-gray-800">{v.portuguese}</p>
                    <p className="text-gray-500 text-sm">{v.english}</p>
                  </div>
                  <TTSButton text={v.portuguese} />
                </div>
              ))}
            </div>
          )}

          {tab === 'phrases' && (
            <div className="space-y-4">
              {module.phrases.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-xl font-medium text-gray-800 mb-1">{p.portuguese}</p>
                    <p className="text-gray-500 italic">"{p.english}"</p>
                  </div>
                  <TTSButton text={p.portuguese} />
                </div>
              ))}
            </div>
          )}

          {tab === 'dialogue' && (
            <div className="space-y-6">
              {module.dialogue.map((d, i) => (
                <div key={i} className={`flex flex-col ${d.speaker === 'Você' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${d.speaker === 'Você' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-xs opacity-70 mb-1 font-bold">{d.speaker}</p>
                    <p className="text-lg mb-2">{d.text}</p>
                    <div className="h-px bg-current opacity-20 mb-2"></div>
                    <p className="text-sm italic opacity-80">{d.translation}</p>
                    <div className="mt-2 flex justify-end">
                      <TTSButton text={d.text} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-green-100 p-6 rounded-3xl border border-green-200 flex items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
          💡
        </div>
        <div>
          <h4 className="font-bold text-green-800">Pro Tip</h4>
          <p className="text-green-700 text-sm">Brazilians love when you try! Don't worry about being perfect, just keep practicing these phrases and you'll do great.</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
