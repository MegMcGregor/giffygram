import { getUsers, getPosts, usePostCollection, getLoggedInUser, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";



const applicationElement = document.querySelector(".giffygram");
const footerElement = document.querySelector("footer");


applicationElement.addEventListener("click", (event) => {
	console.log('click edit');
	
	if (event.target.id.startsWith("edit")) {
		console.log("post clicked", event.target.id.split("--"));
		console.log("zero index value", event.target.id.split("--")[0]);
		console.log("one index value, the id is", event.target.id.split("--")[1]);
	}
})

applicationElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
	  const yearAsNumber = parseInt(event.target.value)
	  console.log(`User wants to see posts since ${yearAsNumber}`)
	  showFilteredPosts(yearAsNumber);
	}
  })

  applicationElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
	}
  })
  
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

const startGiffyGram = () => {
	showNavBar();
	showPostEntry()
	showPostList();
	showFooter();
}

startGiffyGram();