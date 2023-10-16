const NEWS_API =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=44eca781d6fb4e2da8fd8e7969b3b375";
const posts = document.getElementById("posts");

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.send();
}

const hydratePosts = (postsData) => {
  postsData.forEach((post) => {
    const date = new Date(post.publishedAt);
    const card = document.createElement("a");
    card.href = post.url;
    card.classList.add("card");
    card.innerHTML = `
    <div class="imageWrapper">
    <img
      src="${
        post.urlToImage ||
        "https://img.freepik.com/premium-photo/creative-glowing-blue-breaking-news-pattern-background-with-globe-headline-communication-global-world-concept-3d-rendering_670147-21161.jpg"
      }"
      alt=${post.title}"
    />
  </div>
  <div class="textWrapper">
    <h2 class="card_title">
      ${post.title}
    </h2>
    <span class="card_date">${new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(date)}</span>
    <div class="card_description">
      ${post.content || "No Content Available"}
    </div>
    <p class="card_authors">
      <strong>Authors: </strong
      ><span
        >${post.author || "Unknown"}</span
      >
    </p>
  </div>
    `;
    posts.appendChild(card);
  });
};

getJSON(NEWS_API, (json) => {
  hydratePosts(json.articles);
});
