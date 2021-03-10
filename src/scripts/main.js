import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./Feed/postList.js"
import { NavBar } from "./nav/NavBar.js" 
import { Footer } from "./Footer/Footer.js"

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
    showFooter();
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}

startGiffyGram();

