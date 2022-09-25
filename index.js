import reddit from "./redditapi";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get search term
  const searchTerm = searchInput.value;
  //get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get limit
  const searchLimit = document.getElementById("limit").value;
  // check input if empty
  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }
  // to clear input after search
  searchInput.value = "";
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = '<div class="card-columns">';
    // loop through post
    results.forEach((post) => {

      output += `<div class="card">
     <div class="card-body">
  
      <h5 class="card-title">${post.title}</h5>
  
      <p class="card-text">${truncateText(post.selftext, 100)}</p>
  
      <a href="${post.url}" target="_blank" class="btn btn-dark">Read More</a> 
    </div>
  </div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});
// truncate text
function truncateText(text,limit){
    const shortened =text.indexOf('', limit);
    if(shortened ==-1)return text;
    return text.substring(0, shortened);
}