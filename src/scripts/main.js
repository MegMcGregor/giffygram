import { getPosts, getUsers, usePostCollection } from "./data/DataManager.js"
import { PostList } from "./Feed/postList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./Footer/Footer.js"

console.log("main is loaded");

//defines the element that will be listening for events.
const applicationElement = document.querySelector(".giffygram");

//adds event listener to the entiremain;
//takes click and event() as arguments;
//defines target element and gives instructions for what to do.
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        console.log("You clicked on logout")
    }
})


applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        console.log(`You clicked the pen`)
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "home") {
        console.log(`You clicked the peanut butter`)
    }
})

applicationElement.addEventListener("click", (event) => {

    if (event.target.id.startsWith("edit")) {
        console.log("post clicked", event.target.id.split("--"))
        console.log("the id is", event.target.id.split("--")[1])
    }
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        //invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`);
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost;
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}







//function that prints post lists to dom by finding element on DOM and inserting post list. 
//selects place on DOM for post to appear
//Invokes getPosts() pulling data from JSON server 
//Places allPosts into the element's inner HTML. 
//PostList() is a function that takes allPosts as parameter, then declares an empty HTML string and loops through all postsObjects returning HTML.

function showPostList() {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

const showFooter = () => {
    const navElement = document.querySelector("footer");
    navElement.innerHTML = Footer();
}

//a function that renders all HTML for the site when invoked.
const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooter();
}

startGiffyGram();



