const Post = {
  author(parent, args, { database }, info) {
    return database.users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { database }, info) {
    return database.comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
};

export { Post as default };
