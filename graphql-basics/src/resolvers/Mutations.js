import uuid from "uuid/v4";

export const Mutations = {
  createUser(parent, args, { database, pubSub }, info) {
    const isEmailTaken = database.users.some(
      user => user.email === args.data.email
    );

    if (isEmailTaken) throw new Error("This email is already taken!");

    const newUser = {
      id: uuid(),
      ...args.data
    };

    database.users.push(newUser);

    return newUser;
  },
  createPost(parent, { post }, { database, pubSub }, info) {
    const isUserExist = database.users.some(users => users.id === post.author);

    if (!isUserExist) throw new Error("User not found!");

    const newPost = {
      id: uuid(),
      ...post
    };

    database.posts.push(newPost);

    if (post.isPublished)
      pubSub.publish("post", {
        post: {
          mutation: "CREATED",
          data: newPost
        }
      });

    return newPost;
  },
  createComment(parent, args, { database, pubSub }, info) {
    const isUserExist = database.users.some(
      users => users.id === args.comment.author
    );
    const isPostExist = database.posts.some(
      post => post.id === args.comment.post && post.isPublished
    );

    if (!isUserExist) throw new Error("User not found!");
    if (!isPostExist) throw new Error("Post not found!");

    const newComment = {
      id: uuid(),
      ...args.comment
    };

    database.comments.push(newComment);

    //! Using the channel "key" and returning the subscription defined "comment"
    pubSub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: "CREATED",
        data: newComment
      }
    });

    return newComment;
  },
  deleteUser(parent, args, { database }, info) {
    const userIndex = database.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) throw new Error("User not found!");

    const deletedUser = database.users.splice(userIndex, 1);

    database.posts = database.posts.filter(post => {
      const hasRealtivePosts = post.author === args.id;

      if (hasRealtivePosts) {
        database.comments = database.comments.filter(
          comment => comments.post !== post.id
        );
      }

      return !hasRealtivePosts;
    });

    database.comments = database.comments.filter(
      comment => comment.author !== args.id
    );

    return deletedUser[0];
  },
  deletePost(parent, args, { database, pubSub }, info) {
    const postIndex = database.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) throw new Error("Post not found!");

    const [post] = database.posts.splice(postIndex, 1);

    if (post.isPublished) {
      pubSub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post
        }
      });
    }
    database.comments = database.comments.filter(
      comment => comment.post !== args.id
    );

    return post;
  },
  deleteComment(parent, args, { database, pubSub }, info) {
    const commentIndex = database.posts.findIndex(
      comment => comment.id === args.id
    );

    if (commentIndex === -1) throw new Error("Comment not found!");

    const [deletedComment] = database.comments.splice(commentIndex, 1);

    pubSub.publish(`comment ${deletedComment.post}`, {
      mutation: "DELETED",
      data: deletedComment
    });

    return deletedComment;
  },
  updateUser(parent, { id, data }, { database }, info) {
    const currentUser = data.users.find(user => user.id === id);

    if (!currentUser) throw new Error("User not found!");

    if (typeof data.email === "string") {
      const isEmailTaken = database.users.some(
        user => user.email === data.email
      );

      if (isEmailTaken) throw new Error("Email is already taken!");

      user.email === data.email;
    }

    if (typeof data.name === "string") user.name === data.name;

    if (data.age !== undefined) user.age = data.age;

    return currentUser;
  },
  updatePost(parent, { id, post }, { database, pubSub }, info) {
    const currentPost = database.posts.find(post => post.id === id);
    const originalPost = { ...currentPost };

    if (!currentPost) throw new Error("Post not found!");

    if (typeof currentPost.title === "string") currentPost.title = post.title;

    if (typeof currentPost.name === "string") currentPost.body === post.body;

    if (currentPost.isPublished !== "boolean") {
      currentPost.isPublished = post.isPublished;

      if (originalPost.isPublished && !post.isPublished) {
        pubSub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost
          }
        });
      } else if (!originalPost.isPublished && post.isPublished) {
        pubSub.publish("post", {
          post: {
            mutation: "CREATED",
            data: currentPost
          }
        });
      }
    } else if (post.isPublished) {
      pubSub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: currentPost
        }
      });
    }
    return currentPost;
  },
  updateComment(parent, { id, comment }, { database, pubSub }, info) {
    const currentComment = database.comments.find(comment => comment.id === id);

    if (!currentComment) throw new Error("Comment not found!");

    if (typeof currentComment.text === "string")
      currentPost.text = comment.text;

    pubSub.publish(`comment ${currentComment.post}`, {
      mutation: "UPDATED",
      data: currentComment
    });

    return currentComment;
  }
};
