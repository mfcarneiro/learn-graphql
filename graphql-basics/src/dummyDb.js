const users = [
  {
    id: "1",
    name: "Matheus",
    email: "matheus@gmail.com",
    age: 25
  },
  {
    id: "2",
    name: "Jess",
    email: "jess@gmail.com",
    age: 22
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@gmail.com",
    age: 18
  }
];

const posts = [
  {
    id: "1",
    author: "1",
    title: "GraphQL 101",
    body: "This is how to use GraphQL",
    isPublished: true
  },
  {
    id: "2",
    author: "2",
    title: "GraphQL 201",
    body: "This is how to use GraphQL post",
    isPublished: true
  },
  {
    id: "3",
    author: "3",
    title: "GraphQL with Javascript",
    body: "This is how to use GraphQL with javascript",
    isPublished: false
  }
];

const comments = [
  {
    id: "1",
    text: "GraphQL rulezz",
    author: "1",
    post: "1"
  },
  {
    id: "2",
    text: "GraphQL oh my!",
    author: "2",
    post: "1"
  },
  {
    id: "3",
    text: "GraphQL with Javascript yea!",
    author: "1",
    post: "2"
  },
  {
    id: "4",
    text: "GraphQL with Javascript awesome",
    author: "3",
    post: "3"
  }
];

const database = {
  users,
  posts,
  comments
};

export { database as default };
