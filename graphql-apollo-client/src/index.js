import ApolloBoost, { gql } from "apollo-boost";

const ApolloClient = new ApolloBoost({
  uri: "http://localhost:4000"
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

ApolloClient.query({
  query: getUsers
}).then(response => {
  let html;

  response.data.users.forEach(user => {
    html += `
        <div>
            <h3 style="padding-bottom: 2em;">${user.name}</h3>
        </div>
      `;
  });

  document.getElementById("users").innerHTML = html;
});

const getPosts = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`;

ApolloClient.query({
  query: getPosts
}).then(response => {
  let html;

  response.data.posts.forEach(post => {
    html += `
        <div>
            <h3 style="padding-bottom: 2em;">${post.name}</h3>
        </div>
			`;
  });

  document.getElementById("posts").innerHTML = html;
});
