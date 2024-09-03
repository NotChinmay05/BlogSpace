import express from "express";
import bodyParser from "body-parser";

// create backend express
const app = express();
const port = 3000;
const blogPosts = []  // temporary blog storage

// Middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

// Get Home page
app.get("/", (req, res)=>{
    res.render("index.ejs", {
        blogPosts: blogPosts
    })
})

// Get Posts Page
app.get("/posts", (req, res)=>{
    res.render("posts.ejs", {
        blogPosts: blogPosts
    })
})

// Get Create Page
app.get("/create", (req, res)=>{
    res.render("create.ejs")
})

// Post new Post
app.post("/post", (req,res)=>{
    req.body["blog-date"] = new Date().toJSON().slice(0, 10)
    blogPosts.unshift(req.body)

    res.redirect("/posts")
})

// Post a delete request 
app.post("/delete", (req,res)=>{
    // deletes the index of the post, saved as name on the button of the post
    blogPosts.splice(Number(req.body.postValue), 1)
    res.redirect("/posts")
})

// Post a patch/edit request 
app.post("/edit", (req,res)=>{
    // goes to edit page with the respective inputs fields entered with post details  
    var post = blogPosts[Number(req.body.postValue)]
    res.render("editPost.ejs", {
        creatorName: post["creator-name"],
        blogTitle: post["blog-title"],
        blogContent: post["blog-content"]
    })

    // once the page is rendered the post is removed from array and then submitted back by post request on "/post" with new details
    blogPosts.splice(Number(req.body.postValue), 1)
})

app.listen(3000, ()=>{
    console.log(`Listening to Port ${port}`)
})