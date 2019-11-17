const User = {
  posts(parent, args, { database }, info) {
    return database.posts.filter(post => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, { database }, info) {
    return database.comments.filter(comment => {
      return comment.author === parent.id;
    });
  }
};

export { User as default };
