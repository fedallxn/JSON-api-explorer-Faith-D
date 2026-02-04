//ALL MY HTML IDs!! and a fecthPromise (didn't know if that was applicable here???)
const fetchPromise = fetch("https://jsonplaceholder.typicode.com/posts");
const posts = document.getElementById("postList");
const fetchBtn = document.getElementById("fetchButton");
const formData = document.getElementById("postForm");
const successMssg = document.getElementById("formSuccess");
const formErr = document.getElementById("formError");
const fetchErr = document.getElementById("error");

//GET endpoint -- retrieves list of posts by title and body
fetchPromise.then(function(response) {
    return response.json();
})
.then(function (json) {
    console.log(json);

        fetchBtn.addEventListener("click", () => {
        let renderedPosts = '';
        //Only wanted to access the title and body of each post
        json.forEach(({title, body}, index) => {
            renderedPosts += `
            <li> <b>Post ${index + 1} -- Title:</b> <i>${title}</i> </li>
            <li> ${body} </li>`
        });
    posts.innerHTML = renderedPosts;
    })
})
.catch(err => {
    //displays a message if there was an issue while tring to fetch data
    fetchErr.innerHTML = "Error while fetching data..."
    console.error("Oops: ", err);
})

//POST endpoint -- mock submitting a new post! Shows in console but can't be retrieved by "Fetch Posts" btn
formData.addEventListener("submit", (event) => {
    event.preventDefault(); //prevent my page from automatically reloading

    const formTitle = document.getElementById("titleInput").value;
    const formBody = document.getElementById("bodyInput").value;

    //lil loading message! The fetching is rather fast so it only shows up for a split second
    successMssg.innerHTML = "Sending in progress..."

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: formTitle,
            body: formBody,
            userID: 1,
        }),
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        //successfully sent!
        successMssg.innerHTML = "Post sent successfully! Thank you!";
        formData.reset(); //clears the input fields in the form instead of manually resetting each field
    })
    .catch(err => {
        //displays an error if there was an issue with sending the post
        formErr.innerHTML = "Error while sending post. Try again.";
        console.error("Opps: ", err);
    })
});