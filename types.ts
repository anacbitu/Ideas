
export enum ModuleId {
  INTRO = 'intro',
  AGE = 'age',
  OCCUPATION = 'occupation',
  LOCATION = 'location',
  LIVING = 'living',
  WORK = 'work',
  HOBBIES = 'hobbies',
  ROUTINE = 'routine',
  TASTES = 'tastes',
  DREAMS = 'dreams'
}

export interface LessonPart {
  portuguese: string;
  english: string;
  context?: string;
}

export interface DialogueExchange {
  speaker: string;
  text: string;
  translation: string;
}

export interface ModuleData {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  color: string;
  vocabulary: LessonPart[];
  phrases: LessonPart[];
  dialogue: DialogueExchange[];
}

export interface UserProgress {
  completedModules: ModuleId[];
}
