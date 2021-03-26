///////////////////////////////POSTS DATA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let postCollection = [];

export const usePostCollection = () => {
  return [...postCollection];
}

// // ALLPOST FETCH CALL
// export const getPosts = () => {
//   const userID = getLoggedInUser().id
//   return fetch(`http://localhost:8088/posts?_expand=user`)
//     .then(response => response.json())
//     .then(parsedResponse => {
//       postCollection = parsedResponse
//       return parsedResponse;
//     })
// }

//ONE POST FETCH CALL (TARGET BY ID)
export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

//FETCH CALL FOR RENDERING POSTS
export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)

  })
    .then(response => response.json())
}

//FETCH CALL FOR DELETING POST (TARGET BY ID)
export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }

  })
    .then(response => response.json())
    .then(getPosts)
}

//FETCH CALL FOR EDITING POST
export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)

  })
    .then(response => response.json())
    .then(getPosts)
}

//GET POSTS WITH USER INFORMATION 
export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}

////////////////////////////////////USERS DATA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let loggedInUser = {}

//FETCH CALL FOR ALL USERS
export const getUsers = () => {
  return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

//CHECKS FOR IF A USER EXISTS
export const loginUser = (userObj) => {
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
      (console.log("parsedUser", parsedUser))
      if (parsedUser.length > 0) {
        setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
      }
      else {
        return false
      }
    })
}


//REGISTER NEW USER
export const registerUser = (userObj) => {
  return fetch(`http://localhost:8088/users`, {
    method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(parsedUser => {
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}

//RETURNS A SINGLE USER
export const getLoggedInUser = () => {
  return { ...loggedInUser };
}

//SETS THE LOGGED IN USER
export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}

//LOGS USER OUT BY SETTING USER TO EMPTY OBJECT
export const logOutUser = () => {
  loggedInUser = {};
}