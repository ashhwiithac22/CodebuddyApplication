//frontend/src/app/models/topic.model.ts
export interface Topic {
  id: number;
  name: string;
  category: string;
  description: string;
  hints: string[];
  snippets: string[];
  solved: number;
  total: number;
}

export interface TopicProgress {
  topicId: number;
  solved: number;
  total: number;
  lastPracticed: Date;
}