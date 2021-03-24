import { getUsers, getPosts, usePostCollection, getLoggedInUser, createPost, deletePost, getSinglePost, logOutUser } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./Feed/postEdit.js"
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js"


const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");

////////////////////////////EVENT LISTENERS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//LOGOUT BUTTON
applicationElement.addEventListener("click", (event) => {
	if (event.target.id === "logout") {
		logOutUser();
		sessionStorage.clear();
		checkForUser()
	}
})

//LOGIN BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__Submit") {
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		//login user imported from datamanager checks for if the user exists
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionsStorage.setItem("user", JSON.stringify(dbUserObj));
					startGiffyGram();
				}
				else {
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	}
})

//REGISTER SUBMIT BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
		const UserObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value
		}
		registerUser(userObject)
		.then(dbUserObj => {
			sessionStorage.setItem("user", JSON.stringify(dbUserObj));
			startGiffyGram();
		})
	}
})

//SUBMIT NEW POST BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value

		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: Date.now()
		}

		createPost(postObject)
			.then(response => {
				console.log("what is the new post response", response)
				showPostList();
			})
	}
})

//EDIT BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
		const postId = event.target.id.split("__")[1];
		getSinglePost(postId)
			.then(response => {
				showEdit(response);
			})
	}
})

//UPDATE AFTER EDITING BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
		const postId = event.target.id.split("__")[1];
		//collect all the details into an object
		const title = document.querySelector("input[name='postTitle']").value
		const url = document.querySelector("input[name='postURL']").value
		const description = document.querySelector("textarea[name='postDescription']").value
		let timestamp = document.querySelector("input[name='postTime']").value

		const postObject = {
			title: title,
			imageURL: url,
			description: description,
			userId: getLoggedInUser().id,
			timestamp: parseInt(timestamp),
			id: parseInt(postId)
		}

		updatePost(postObject)
			.then(response => {
				showPostList();
			})
	}
})

//DELETE BUTTON
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		deletePost(postId)
			.then(response => {
				showPostList();
			})
	}
})

//CANCEL BUTTON
applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
	}
})


//DROPDOWN MENU FOR YEAR
applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNumber = parseInt(event.target.value)
		console.log(`User wants to see posts since ${yearAsNumber}`)
		showFilteredPosts(yearAsNumber);
	}
})

////////////////////////FUNCTIONS FOR RENDERING TO DOM\\\\\\\\\\\\\\\\\\\\\\\\\\\

const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
}

const showFilteredPosts = (year) => {
	const epoch = Date.parse(`01/01/${year}`);

	const filteredData = usePostCollection().filter(singlePost => {
		if (singlePost.timestamp >= epoch) {
			return singlePost
		}
	})
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = PostList(filteredData);
}

const showPostList = () => {
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

const showNavBar = () => {
	const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
	const footerElement = document.querySelector("footer");
	footerElement.innerHTML = Footer();
}

const showPostEntry = () => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}


///////////////////////////LOGIN & REGISTER FUNCTIONS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionsStorage.getItem("user")));
		startGiffyGram();
	} else {
		showLogInRegister();
	}
}

const showLogInRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}

///////////////////////////////////START GIFFYGRAM\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const startGiffyGram = () => {
	showNavBar();
	showPostEntry()
	showPostList();
	showFooter();
}

startGiffyGram();