// Post() is a function that takes postObject and converts it to an html representaion.

export const Post = (postObject) => {
  return `
    <section class="post">
      <header>
          <h2 class="post__title">${postObject.title}</h2>
      </header>
      <img class="post__image" src="${postObject.imageURL}" alt="${postObject.description}"/>
      <div><button id="edit--${postObject.id}--forfun">Edit</button></div>
      <button id="delete__${postObject.id}">Delete</button>
    </section>
  `
}
