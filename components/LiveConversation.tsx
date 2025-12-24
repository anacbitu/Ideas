
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { encodeAudio, decodeBase64, decodeAudioData } from '../geminiService';

const LiveConversation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
  }, []);

  const startSession = async () => {
    try {
      setError(null);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Live connected');
            setIsActive(true);
            
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmData = encodeAudio(new Uint8Array(int16.buffer));
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                  media: { data: pcmData, mimeType: 'audio/pcm;rate=16000' } 
                });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const decoded = decodeBase64(audioData);
              const buffer = await decodeAudioData(decoded, ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.onended = () => sourcesRef.current.delete(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.outputTranscription) {
                setTranscriptions(prev => [...prev.slice(-4), `AI: ${message.serverContent?.outputTranscription?.text}`]);
            }
            if (message.serverContent?.inputTranscription) {
                setTranscriptions(prev => [...prev.slice(-4), `You: ${message.serverContent?.inputTranscription?.text}`]);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live error', e);
            setError("Connection error. Please try again.");
            cleanup();
          },
          onclose: () => {
            console.log('Live closed');
            cleanup();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: 'You are a friendly Brazilian person named Thiago. You are helping an American learn Portuguese. Speak primarily in Portuguese, but if they are confused, give brief English tips. Encourage them to practice introducing themselves, saying their age, and their hobbies.',
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start session. Check microphone permissions.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border-4 border-green-500/10">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold font-header text-gray-800 mb-2">Voice Practice with Thiago</h3>
        <p className="text-gray-500">Practice your Portuguese in real-time. Thiago is a patient listener!</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 min-h-[200px] mb-8 border border-gray-100 flex flex-col justify-end gap-2">
        {transcriptions.length === 0 && !isActive && <p className="text-gray-400 text-center italic">Start the session to begin talking...</p>}
        {transcriptions.map((t, i) => (
          <p key={i} className={`text-sm ${t.startsWith('AI:') ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
            {t}
          </p>
        ))}
        {isActive && <div className="flex gap-1 items-center justify-center p-4">
            <div className="w-1 h-4 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-6 bg-green-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-1 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>}
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

      <div className="flex justify-center">
        {!isActive ? (
          <button 
            onClick={startSession}
            className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Start Conversation
          </button>
        ) : (
          <button 
            onClick={cleanup}
            className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            End Session
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveConversation;
