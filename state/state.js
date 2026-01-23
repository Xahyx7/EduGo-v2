// state/state.js

export const appState = {
  subjects: [],
  goals: [
  {
    id: "g1",
    subjectId: "math",
    subjectName: "maths",
    topic: "Trigonometry",
    type: "time",
    target: 25,
    progress: 10,
    completed: false
  },
  {
    id: "g2",
    subjectId: "math",
    subjectName: "maths",
    topic: "Algebra",
    type: "units",
    target: 2,
    progress: 1,
    completed: false
  }
],

  sessions: [],

  goals: {
    dailyMinutes: 60,
    weeklyMinutes: 300
  }
};
