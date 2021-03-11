// fetching users from server
export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
};

// fetching posts
export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(response => response.json())
};

// fetching user object
const loggedInUser = {
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

// fuction that returns logged in user
export const getLoggedInUser = () => {
	return loggedInUser;
}


