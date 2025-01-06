const editorMockData = {
  iterations: [
    {
      iterationName: "Iteration 1",
      iterationContent: "This is the content of iteration 1",
    },
    {
      iterationName: "Iteration 2",
      iterationContent: "This is the content of iteration 2",
    },
    {
      iterationName: "Iteration 3",
      iterationContent: "This is the content of iteration 3",
    },
  ],
  accuracy: [
    {
      parameterName: "Accuracy",
      value: 80,
    },
    {
      parameterName: "Precision",
      value: 70,
    },
    {
      parameterName: "Recall",
      value: 60,
    },
    {
      parameterName: "F1 Score",
      value: 50,
    },
  ],

  editorPost: {
    title: "The Impact of AI on Modern Learning",
    authorName: "Alice Johnson",
    authorProfile: "https://example.com/profiles/alice.jpg",
    authorId: "64dfde16f24b1c0090a7e9d3",
    content:
      "Artificial intelligence is reshaping the education landscape, offering personalized learning experiences...",
    metadata: {
      id: "64dfde16f24b1c0090a7e9d1",
      title: "AI Revolution in Education",
      targetAudience: ["Kids"],
      thumbnailUrl: "https://example.com/thumbnails/ai-education.jpg",
      postType: "article",
      actors: ["John Doe", "Jane Smith"],
      tags: ["AI", "Education", "Technology"],
    },
    iterations: [
      {
        content: "Initial draft content about AI in education...",
        editorPostId: "64dfde16f24b1c0090a7e9d2",
        iterationName: "",
      },
      {
        id: "64dfde16f24b1c0090a7e9d5",
        iterationName: "final draft",
        content:
          "Revised content focusing on real-world applications of AI in education.",
        editorPostId: "64dfde16f24b1c0090a7e9d2",
        createdAt: "2024-12-27T12:00:00.000Z",
        updatedAt: "2024-12-27T12:30:00.000Z",
      },
    ],
    createdAt: "2024-12-27T10:00:00.000Z",
    updatedAt: "2024-12-27T11:00:00.000Z",
  },
};
export default editorMockData;
