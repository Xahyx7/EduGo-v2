// state/state.js

export const appState = {
  subjects: [
    {
      id: "math",
      name: "maths",
      totalUnits: 5,
      completedUnits: 3,
      timeSpent: 2
    }
  ],

  // ✅ goals MUST be an array
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

  sessions: []
};
