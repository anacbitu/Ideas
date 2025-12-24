
import { ModuleData, ModuleId } from './types';

export const APP_NAME = "Bora falar Português!";

export const MODULES: ModuleData[] = [
  {
    id: ModuleId.INTRO,
    title: "How to Introduce Yourself",
    description: "Learn to say hi and introduce yourself to Brazilians.",
    icon: "👋",
    color: "bg-green-500",
    vocabulary: [
      { portuguese: "Oi", english: "Hi" },
      { portuguese: "Olá", english: "Hello" },
      { portuguese: "Meu nome é...", english: "My name is..." },
      { portuguese: "Prazer em conhecer", english: "Nice to meet you" }
    ],
    phrases: [
      { portuguese: "Oi, tudo bem?", english: "Hi, how are you?" },
      { portuguese: "Olá, eu sou o John.", english: "Hello, I am John." }
    ],
    dialogue: [
      { speaker: "João", text: "Oi! Tudo bem? Qual o seu nome?", translation: "Hi! How are you? What's your name?" },
      { speaker: "Você", text: "Olá! Meu nome é David. E o seu?", translation: "Hello! My name is David. And yours?" },
      { speaker: "João", text: "Meu nome é João. Prazer!", translation: "My name is João. Pleasure!" }
    ]
  },
  {
    id: ModuleId.AGE,
    title: "Saying Your Age",
    description: "Numbers and basic personal stats.",
    icon: "🎂",
    color: "bg-blue-500",
    vocabulary: [
      { portuguese: "Anos", english: "Years" },
      { portuguese: "Quantos?", english: "How many?" },
      { portuguese: "Idade", english: "Age" }
    ],
    phrases: [
      { portuguese: "Eu tenho trinta anos.", english: "I am thirty years old." },
      { portuguese: "Quantos anos você tem?", english: "How old are you?" }
    ],
    dialogue: [
      { speaker: "Maria", text: "Eu tenho vinte e cinco anos. E você?", translation: "I am 25 years old. And you?" },
      { speaker: "Você", text: "Eu tenho trinta e dois anos.", translation: "I am 32 years old." }
    ]
  },
  {
    id: ModuleId.OCCUPATION,
    title: "What You Do",
    description: "Daily occupation and general life status.",
    icon: "👔",
    color: "bg-yellow-500",
    vocabulary: [
      { portuguese: "Estudante", english: "Student" },
      { portuguese: "Profissão", english: "Profession" },
      { portuguese: "Atualmente", english: "Currently" }
    ],
    phrases: [
      { portuguese: "O que você faz da vida?", english: "What do you do for a living?" },
      { portuguese: "Eu sou engenheiro.", english: "I am an engineer." }
    ],
    dialogue: [
      { speaker: "Bia", text: "Oi David! O que você faz da vida?", translation: "Hi David! What do you do for a living?" },
      { speaker: "Você", text: "Eu sou designer gráfico. E você?", translation: "I'm a graphic designer. And you?" }
    ]
  },
  {
    id: ModuleId.LOCATION,
    title: "Where You Live",
    description: "Cities, countries, and home locations.",
    icon: "🏠",
    color: "bg-purple-500",
    vocabulary: [
      { portuguese: "Cidade", english: "City" },
      { portuguese: "País", english: "Country" },
      { portuguese: "Moro", english: "I live" }
    ],
    phrases: [
      { portuguese: "Onde você mora?", english: "Where do you live?" },
      { portuguese: "Eu moro em Nova York.", english: "I live in New York." }
    ],
    dialogue: [
      { speaker: "Carlos", text: "Você é americano? Onde você mora?", translation: "Are you American? Where do you live?" },
      { speaker: "Você", text: "Sim! Eu moro em Chicago.", translation: "Yes! I live in Chicago." }
    ]
  },
  {
    id: ModuleId.LIVING,
    title: "Who You Live With",
    description: "Family, roommates, and domestic life.",
    icon: "👨‍👩-👧‍👦",
    color: "bg-red-500",
    vocabulary: [
      { portuguese: "Família", english: "Family" },
      { portuguese: "Sozinho", english: "Alone" },
      { portuguese: "Com quem?", english: "With whom?" }
    ],
    phrases: [
      { portuguese: "Eu moro com minha esposa.", english: "I live with my wife." },
      { portuguese: "Você mora com quem?", english: "Who do you live with?" }
    ],
    dialogue: [
      { speaker: "Ana", text: "Você mora sozinho?", translation: "Do you live alone?" },
      { speaker: "Você", text: "Não, eu moro com meus pais e meu irmão.", translation: "No, I live with my parents and my brother." }
    ]
  },
  {
    id: ModuleId.HOBBIES,
    title: "Hobbies & Leisure",
    description: "Talking about what you love to do.",
    icon: "🎸",
    color: "bg-indigo-500",
    vocabulary: [
      { portuguese: "Gostar", english: "To like" },
      { portuguese: "Tempo livre", english: "Free time" },
      { portuguese: "Esporte", english: "Sport" }
    ],
    phrases: [
      { portuguese: "Eu gosto de tocar violão.", english: "I like to play guitar." },
      { portuguese: "Quais são seus hobbies?", english: "What are your hobbies?" }
    ],
    dialogue: [
      { speaker: "Pedro", text: "O que você gosta de fazer no final de semana?", translation: "What do you like to do on the weekend?" },
      { speaker: "Você", text: "Eu gosto de ir à praia e ler livros.", translation: "I like going to the beach and reading books." }
    ]
  },
  {
    id: ModuleId.ROUTINE,
    title: "Daily Routine",
    description: "Morning to night activities.",
    icon: "⏰",
    color: "bg-orange-500",
    vocabulary: [
      { portuguese: "Acordar", english: "To wake up" },
      { portuguese: "Trabalhar", english: "To work" },
      { portuguese: "Cedo", english: "Early" }
    ],
    phrases: [
      { portuguese: "Eu acordo às sete da manhã.", english: "I wake up at 7 AM." },
      { portuguese: "Minha rotina é bem agitada.", english: "My routine is quite busy." }
    ],
    dialogue: [
      { speaker: "Lucia", text: "A que horas você começa a trabalhar?", translation: "What time do you start working?" },
      { speaker: "Você", text: "Eu começo às nove horas.", translation: "I start at 9 o'clock." }
    ]
  },
  {
    id: ModuleId.DREAMS,
    title: "Future Dreams",
    description: "Aspirations and goals in life.",
    icon: "✨",
    color: "bg-pink-500",
    vocabulary: [
      { portuguese: "Sonho", english: "Dream" },
      { portuguese: "Viajar", english: "To travel" },
      { portuguese: "Futuro", english: "Future" }
    ],
    phrases: [
      { portuguese: "Meu sonho é morar no Brasil.", english: "My dream is to live in Brazil." },
      { portuguese: "Eu quero aprender português fluente.", english: "I want to learn fluent Portuguese." }
    ],
    dialogue: [
      { speaker: "Gabriel", text: "Qual é o seu maior sonho hoje?", translation: "What is your biggest dream today?" },
      { speaker: "Você", text: "Eu sonho em conhecer o mundo todo.", translation: "I dream of seeing the whole world." }
    ]
  }
];
