var popupbox=document.querySelector(".popup-box")
var overlay=document.querySelector(".popup-overlay")
function add() {
    popupbox.style.display = "block";
    overlay.style.display = "block";
    popupbox.classList.add("show");
}
var cancel=document.getElementById("cancel-popup")
cancel.addEventListener("click",function(event){
    event.preventDefault()
})
var add_items=document.getElementById("add-books")
add_items.addEventListener("click",function(event){
    event.preventDefault()
})
function hide(){
    popupbox.style.display="none"
    overlay.style.display="none"
}
function remove(event){
    event.target.parentElement.remove()
}
//selecting querry:(container,book-container),id:(book-title-input,book-author-input,book-discription-input)
var container=document.querySelector(".container")
var book_container=document.querySelector(".book-container")
var book_title_input=document.getElementById("book-title-input")
var book_author_input=document.getElementById("book-author-input")
var book_discription_input=document.getElementById("book-discription-input")
add_items.addEventListener("click", function (event) {
    event.preventDefault();
    if (!book_title_input.value || !book_author_input.value || !book_discription_input.value) {
        alert("Please fill in all fields.");
        return;
    }
    var div = document.createElement("div");
    div.innerHTML = `<h2>${book_title_input.value}</h2>
                     <h5>${book_author_input.value}</h5>
                     <p>${book_discription_input.value}</p>
                     <button onclick="remove(event)">Delete</button>`;
    div.setAttribute("class", "book-container");
    container.append(div);

    // Clear input fields
    book_title_input.value = "";
    book_author_input.value = "";
    book_discription_input.value = "";

    // Hide the popup
    hide();
});
//success feedback
add_items.addEventListener("click", function () {
    const feedback = document.createElement("p");
    feedback.textContent = "Book added successfully!";
    feedback.style.color = "green";
    feedback.style.fontWeight = "bold";
    container.prepend(feedback);
    setTimeout(() => feedback.remove(), 3000);
});
// serach books
document.querySelector('.search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Get the input and convert to lowercase
    const books = document.querySelectorAll('.book-container'); // Select all book containers

    books.forEach(book => {
        const title = book.querySelector('h2').textContent.toLowerCase(); // Get the book title
        const author = book.querySelector('h5').textContent.toLowerCase(); // Get the book author

        // Check if the query matches the title or author
        if (title.includes(query) || author.includes(query)) {
            book.style.display = ''; // Show the book if it matches
        } else {
            book.style.display = 'none'; // Hide the book if it doesn't match
        }
    });
});
