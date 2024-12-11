const FEATURED_ARTICLES = [
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    authorProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    authorProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    authorProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    authorProfileLink: "/",
    likes: 320,
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    articleName: "सपनों के परिंदे",
    articleLink: "/",
    authorProfileLink: "/",
    likes: 320,
  },
];

const AUTHOR_TO_FOLLOW_MOCK = [
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    authorProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    authorProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    authorProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    authorProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
  {
    profilePicture: "https://picsum.photos/200",
    authorName: "Steve Jobs",
    authorProfileLink: "/",
    onFollow: () => {
      console.log(`followed writer `);
    },
  },
];

// create a dummy data
const ARTICLES_LIST = [
  {
    id: "1",
    authorId: "663a1f5e9b8f8b001f3e4101",
    authorName: "akshay_tripathi",
    authorProfile: "https://picsum.photos/seed/user1/200/200",

    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ipsum eu luctus malesuada, velit velit ultricies velit, eu bibendum sapien nunc vel lectus. Fusce non velit eu magna ornare tempor. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque semper, sit amet faucibus nunc ullamcorper. Mauris eget mauris tincidunt, iaculis elit vel, volutpat nunc. Vivamus euismod, ipsum eu luctus malesuada, velit velit ultricies velit, eu bibendum sapien nunc vel lectus. Proin auctor, magna a bibendum congue, augue augue tincidunt augue, eget condimentum augue magna vel purus. Sed laoreet, magna a bibendum congue, augue augue tincidunt augue, eget condimentum augue magna vel purus. Nullam dignissim convallis est. Vestibulum mattis tellus ac mauris elementum, vel pharetra ipsum varius. Maecenas euismod, ipsum eu luctus malesuada, velit velit ultricies velit, eu bibendum sapien nunc vel lectus. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem nunc aliquam nunc, vel condimentum nisl enim non metus. Sed laoreet, magna a bibendum congue, augue augue tincidunt augue, eget condimentum augue magna vel purus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.",
    media: {
      thumbnail_picture: ["https://picsum.photos/seed/post1/800/600"],
      thumbnail_content: "Sunset over mountains",
      thumbnail_title: "Tranquil Landscape",
    },
    tags: ["nature", "sunset", "landscape"],
    likeCount: 0,
    comments: [],
  },
  {
    id: "2",
    authorId: "663a1f5e9b8f8b001f3e4102",
    authorName: "sarah_johnson",
    authorProfile: "https://picsum.photos/seed/user2/200/200",

    content:
      "Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Sed augue ipsum, egestas nec, vestibulum et, malesuada non, tellus. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate urna. Nullam dictum felis eu pede mollis pretium.",
    media: {
      thumbnail_picture: ["https://picsum.photos/seed/post2/800/600"],
      thumbnail_content: "Urban cityscape at night",
      thumbnail_title: "City Lights",
    },
    tags: ["city", "urban", "night"],
    likeCount: 0,
    comments: [],
  },
  {
    id: "3",
    authorId: "663a1f5e9b8f8b001f3e4103",
    authorName: "mike_rodriguez",
    authorProfile: "https://picsum.photos/seed/user3/200/200",

    content:
      "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem nunc aliquam nunc, vel condimentum nisl enim non metus. Sed laoreet, magna a bibendum congue, augue augue tincidunt augue, eget condimentum augue magna vel purus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.",
    media: {
      thumbnail_picture: ["https://picsum.photos/seed/post3/800/600"],
      thumbnail_content: "Beach with tropical sunset",
      thumbnail_title: "Paradise Shores",
    },
    tags: ["beach", "sunset", "travel"],
    likeCount: 0,
    comments: [],
  },
  {
    id: "4",
    authorId: "663a1f5e9b8f8b001f3e4104",
    authorName: "emma_lee",
    authorProfile: "https://picsum.photos/seed/user4/200/200",

    content:
      "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate urna. Nullam dictum felis eu pede mollis pretium.",
    media: {
      thumbnail_picture: ["https://picsum.photos/seed/post4/800/600"],
      thumbnail_content: "Mountain hiking trail",
      thumbnail_title: "Mountain Adventures",
    },
    tags: ["hiking", "mountains", "adventure"],
    likeCount: 0,
    comments: [],
  },
  {
    id: "5",
    authorId: "663a1f5e9b8f8b001f3e4105",
    authorName: "david_kim",
    authorProfile: "https://picsum.photos/seed/user5/200/200",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    media: {
      thumbnail_picture: ["https://picsum.photos/seed/post5/800/600"],
      thumbnail_content: "Forest landscape with misty morning",
      thumbnail_title: "Misty Forest",
    },
    tags: ["forest", "nature", "mist"],
    likeCount: 0,
    comments: [],
  },
];

const staticData = {
  featuredArticles: FEATURED_ARTICLES,
  authorToFollow: AUTHOR_TO_FOLLOW_MOCK,
  articlesList: ARTICLES_LIST,
};

export default staticData;
