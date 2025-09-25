export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  totalScore: number;
  streak: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}