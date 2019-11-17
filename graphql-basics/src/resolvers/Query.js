const Query = {
  users(parent, args, { database }, info) {
    if (!args.query) return users;

    return database.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { database }, info) {
    return database.posts;
  },
  comments(parent, args, { database }, info) {
    return database.comments;
  }
};

export { Query as default };
