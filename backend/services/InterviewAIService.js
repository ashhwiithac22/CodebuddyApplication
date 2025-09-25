import OpenAI from 'openai';

class InterviewAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
    });
  }

  async generateInterviewQuestion(domain, previousQuestions = [], difficulty = 'medium') {
    try {
      const prompt = this.buildQuestionPrompt(domain, previousQuestions, difficulty);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a technical interviewer conducting a mock interview. Ask relevant, challenging questions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating interview question:', error);
      return this.getFallbackQuestion(domain, difficulty);
    }
  }

  async evaluateAnswer(question, userAnswer, domain, difficulty = 'medium') {
    try {
      const prompt = this.buildEvaluationPrompt(question, userAnswer, domain, difficulty);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a technical interviewer providing constructive feedback."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.5
      });

      const response = completion.choices[0].message.content;
      
      return {
        score: 75,
        feedback: response,
        strengths: ["Good understanding of concepts"],
        improvements: ["Provide more specific examples"],
        followUpQuestion: this.generateFollowUpQuestion(domain)
      };
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return this.getFallbackEvaluation();
    }
  }

  buildQuestionPrompt(domain, previousQuestions, difficulty) {
    const domainMap = {
      'fullstack': 'Full Stack Development (frontend, backend, databases)',
      'frontend': 'Frontend Development (HTML, CSS, JavaScript, frameworks)',
      'backend': 'Backend Development (APIs, databases, server-side logic)',
      'datascience': 'Data Science & Machine Learning',
      'devops': 'DevOps & Cloud Infrastructure'
    };

    return `Generate a ${difficulty} difficulty interview question about ${domainMap[domain]}. 
    Make it appropriate for a technical interview. Return only the question.`;
  }

  buildEvaluationPrompt(question, userAnswer, domain, difficulty) {
    return `Question: ${question}
    Candidate's Answer: ${userAnswer}
    
    Provide brief constructive feedback on this answer.`;
  }

  generateFollowUpQuestion(domain) {
    const followUps = {
      'fullstack': "How would you optimize this for performance?",
      'frontend': "Can you explain how you would make this responsive?",
      'backend': "What security considerations would you take?",
      'datascience': "How would you validate your approach?",
      'devops': "How would you monitor this in production?"
    };
    
    return followUps[domain] || "Can you tell me more about your experience with this?";
  }

  getFallbackQuestion(domain, difficulty) {
    const questions = {
      'fullstack': "Explain the difference between REST and GraphQL APIs.",
      'frontend': "How do you handle state management in a large application?",
      'backend': "Describe your approach to database optimization.",
      'datascience': "Explain the bias-variance tradeoff.",
      'devops': "How do you ensure high availability in your deployments?"
    };
    
    return questions[domain] || "Tell me about a challenging project you worked on.";
  }

  getFallbackEvaluation() {
    return {
      score: 75,
      feedback: "Good answer. Consider providing more specific examples from your experience.",
      strengths: ["Clear communication", "Good technical understanding"],
      improvements: ["Add more concrete examples", "Discuss trade-offs"],
      followUpQuestion: "Can you provide a specific example from your experience?"
    };
  }
}

export default new InterviewAIService();