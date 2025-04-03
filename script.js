// Load posts from localStorage or use default posts
const posts = JSON.parse(localStorage.getItem("blogPosts")) || [
    {
        title: "My First Blog Post",
        content: "Welcome to my blog! This is my first post.",
        image: "https://via.placeholder.com/600"
    }
];

// Function to save posts to localStorage
function savePosts() {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// Function to display posts
function loadPosts() {
    const blogContainer = document.getElementById("blog-posts");
    blogContainer.innerHTML = ""; // Clear previous posts

    posts.forEach((post, index) => {
        let article = document.createElement("article");
        article.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.image}" alt="Blog Image" class="blog-image">
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Delete Post</button>
        `;
        blogContainer.appendChild(article);
    });
}

// Function to handle file uploads and convert to Base64
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => console.log("Error:", error);
}

// Function to add a new post
function addPost() {
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const imageInput = document.getElementById("post-image");

    if (titleInput.value && contentInput.value) {
        const file = imageInput.files[0];

        if (file) {
            // Convert image to Base64 before saving
            getBase64(file, (base64Image) => {
                posts.push({
                    title: titleInput.value,
                    content: contentInput.value,
                    image: base64Image
                });

                savePosts();
                titleInput.value = "";
                contentInput.value = "";
                imageInput.value = "";
                toggleNewPostForm(); // Hide the form after adding the post
                loadPosts();
            });
        } else {
            // If no image is selected, use a default placeholder
            posts.push({
                title: titleInput.value,
                content: contentInput.value,
                image: "https://via.placeholder.com/600"
            });

            savePosts();
            titleInput.value = "";
            contentInput.value = "";
            toggleNewPostForm(); // Hide the form after adding the post
            loadPosts();
        }
    } else {
        alert("Please enter both title and content.");
    }
}

// Function to delete a post
function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1); // Remove post from the array
        savePosts(); // Save updated posts to localStorage
        loadPosts(); // Reload posts
    }
}

// Toggle New Post form visibility
function toggleNewPostForm() {
    const newPostForm = document.getElementById("add-post");
    if (newPostForm.style.display === "none" || newPostForm.style.display === "") {
        newPostForm.style.display = "block";
    } else {
        newPostForm.style.display = "none";
    }
}

// Load posts when the page loads
document.addEventListener("DOMContentLoaded", loadPosts);
