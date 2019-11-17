const Comment = {
  author(parent, args, { database }, info) {
    return database.users.find(user => {
      return user.id === parent.author;
    });
  },
  post(parent, args, { database }, info) {
    return database.posts.find(post => {
      return post.id === parent.post;
    });
  }
};

export { Comment as default };
