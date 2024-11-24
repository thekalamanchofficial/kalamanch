const FEATURED_ARTICLES = [
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    writerProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    writerProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    writerProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    writerProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    writerProfileLink: "/",
    likes: 320,
  },
];

const WRITERS_TO_FOLLOW_MOCK = [
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    writerProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    writerProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    writerProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    writerProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    writerName: "Steve Jobs",
    writerProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
];

// create a dummy data
const ARTICLES_LIST = [
  {
    authorName: "John Doe",
    authorImage: "https://picsum.photos/200",
    authorProfileLink: "https://example.com/profiles/johndoe",
    articleTitle: "The Future of Web Development",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleTags: ["Web Development", "JavaScript", "React"],
    articleImage: "https://picsum.photos/200",
    articleLink: "https://example.com/articles/future-of-web-development",
    articleDecription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleLikes: 150,
    articleComments: 45,
    articleShares: 30,
    articlesBids: 10,
  },
  {
    authorName: "Jane Smith",
    authorImage: "https://picsum.photos/200",
    authorProfileLink: "https://example.com/profiles/janesmith",
    articleTitle: "AI in Healthcare: Opportunities and Challenges",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleTags: ["AI", "Healthcare", "Technology"],
    articleImage: "https://picsum.photos/200",
    articleLink: "https://example.com/articles/ai-healthcare",
    articleDecription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleLikes: 200,
    articleComments: 60,
    articleShares: 40,
    articlesBids: 15,
  },
  {
    authorName: "Michael Lee",
    authorImage: "https://picsum.photos/200",
    authorProfileLink: "https://example.com/profiles/michaellee",
    articleTitle: "Mastering the Art of Remote Work",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleTags: ["Remote Work", "Productivity", "Lifestyle"],
    articleImage: "https://picsum.photos/200",
    articleLink: "https://example.com/articles/remote-work",
    articleDecription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac elementum est. Donec non turpis vitae urna facilisis ultrices. Ut vel urna quis orci dictum viverra a at augue. Suspendisse a pharetra ex. Integer vel dapibus est, nec pharetra turpis. In hac habitasse platea dictumst. Nulla at arcu non velit commodo egestas non ut enim. Aenean id sapien sit amet nulla tempor blandit. Sed malesuada mauris ut elit tempus malesuada.",
    articleLikes: 175,
    articleComments: 50,
    articleShares: 35,
    articlesBids: 20,
  },
];

const staticData = {
  featuredArticles: FEATURED_ARTICLES,
  writersToFollow: WRITERS_TO_FOLLOW_MOCK,
  articlesList: ARTICLES_LIST,
};

export default staticData;
