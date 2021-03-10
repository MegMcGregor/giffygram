import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./Feed/postList.js"
import { NavBar } from "./nav/NavBar.js"

console.log("main is loaded");


function showPostList() {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const startGiffyGram = () => {
    showPostList();
    showNavBar();
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

startGiffyGram();

