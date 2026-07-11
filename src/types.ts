export interface Question {
  id: string;
  questionEn: string;
  questionHi: string;
  optionsEn: [string, string, string, string];
  optionsHi: [string, string, string, string];
  correctAnswer: "A" | "B" | "C" | "D";
  explanationEn: string;
  explanationHi: string;
  subject: string;
  topic: string;
  examTags: string[];
  year?: string;
  likes: number;
  dislikes: number;
  likesCount?: number;
  dislikesCount?: number;
}

export interface MockTest {
  id: string;
  titleEn: string;
  titleHi: string;
  subject: string;
  exam: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  questions: Question[];
  isPreviousYear: boolean;
  year?: string;
}

export interface LiveTestConfig {
  resultDate: string;
  test: MockTest;
}

export interface UserStats {
  name: string;
  avatarUrl: string;
  email: string;
  rank: number;
  xp: number;
  level: number;
  streak: number;
  attempted: number;
  accuracy: number; // percentage
  weeklyRank: number;
  bookmarks: string[]; // question ids
  notes: Record<string, string>; // questionId -> note text
  history: {
    testId: string;
    testTitle: string;
    date: string;
    score: number;
    totalMarks: number;
    accuracy: number;
    timeSpent: string;
  }[];
  earnedBadges: {
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
    iconName: string;
  }[];
}

export interface FAQItem {
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

export interface Testimonial {
  name: string;
  examCleared: string;
  quoteEn: string;
  quoteHi: string;
  avatarUrl: string;
  rank: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  examsCleared: string;
  streak: number;
}
