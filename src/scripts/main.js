import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./Feed/postList.js"

console.log("main is loaded");


function showPostList() {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const startGiffyGram = () => {
    showPostList()
};

startGiffyGram();

