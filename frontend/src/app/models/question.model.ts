export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  defaultCode: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodeSubmission {
  code: string;
  questionId: number;
  language: string;
}

export interface CodeResult {
  passed: boolean;
  output: string;
  error?: string;
  testCases: TestCaseResult[];
}

export interface TestCaseResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
}