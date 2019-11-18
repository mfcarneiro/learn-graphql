const Subscriptions = {
  comment: {
    subscribe(parent, { postId }, { pubSub, database }, info) {
      const post = database.post.find(
        post => post.id === postId && post.isPublished
      );

      if (!post) throw new Error("Post not found!");

      return pubSub.asyncInterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { pubSub }, info) {
      return pubSub.asyncInterator("post");
    }
  }
};

export { Subscriptions as default };
