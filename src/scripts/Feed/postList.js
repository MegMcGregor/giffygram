import { Post } from "./post.js";

export const PostList = (allPosts) => {
	let postHTML = "";
		for (const postObject of allPosts) {
			postHTML += Post(postObject)
		}
		return postHTML;
	
}

//PostList is a function that takes allPosts as parameter.
//allPosts becomes function that declares an empty HTML string then loops through all postsObjects and returns HTML.