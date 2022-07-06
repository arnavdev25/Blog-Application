import axios from "axios";
export const LOADING = "LOADING";
export const GET_ALL_BLOGS = "GET_ALL_BLOGS";
export const GET_ALL_TRASH_BLOGS = "GET_ALL_TRASH_BLOGS";
export const GET_SINGLE_BLOG = "GET_SINGLE_BLOG";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_LIKES = "GET_LIKES";
export const GET_COMMENTS = "GET_COMMENTS";
export const CATEGORY_BLOGS = "CATEGORY_BLOGS";
export const ERROR = "ERROR";

export const loading = ()=>({
    type: LOADING
})

export const error = ()=>({
    type: ERROR
});

export const getAllBlogs = (payload)=>({
    type: GET_ALL_BLOGS,
    payload
})

export const getOneBlog = (payload)=>({
    type: GET_SINGLE_BLOG,
    payload
})

export const getCategories = (payload)=>({
    type: GET_ALL_CATEGORIES,
    payload
})

export const getUsers = (payload)=>({
    type: GET_ALL_USERS,
    payload
})

export const getLikes = (payload)=>({
    type: GET_LIKES,
    payload
})

export const getComments = (payload)=>({
    type: GET_COMMENTS,
    payload
})

export const cateBlogs = (payload)=>({
    type: CATEGORY_BLOGS,
    payload
})

export const trashBlogs = (payload)=>({
    type: GET_ALL_TRASH_BLOGS,
    payload
})

export const callForAllBlogs = ()=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/blogs`)
    .then(({data})=>dispatch(getAllBlogs(data)))
    .catch((e)=>dispatch(error()))
}

export const callForTrashBlogs = ()=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/blogs/trash`)
    .then(({data})=>dispatch(trashBlogs(data)))
    .catch((e)=>dispatch(error()))
}

export const callForSingleBlog = (id)=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/blogs/${id}`)
    .then(({data})=>dispatch(getOneBlog(data.blog)))
    .catch((e)=>dispatch(error()))
}

export const callForCategories = ()=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/category/`)
    .then(({data})=>dispatch(getCategories(data)))
    .catch((e)=>dispatch(error()))
}

export const callForUsers = ()=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/users`)
    .then(({data})=>dispatch(getUsers(data)))
    .catch((e)=>dispatch(error()))
}

export const callForCreateBlog = (form,cate)=>(dispatch)=>{
    axios.post("http://localhost:8080/blogs/",form)
    .then(({data})=>{
        let blogId = data.blog._id;
        cate.blog=blogId;
        axios.post("http://localhost:8080/category/",cate)
        .then(({data})=>console.log(data));
    })
    .catch((err)=>dispatch(error()))
}

export const callForLikes = (id)=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/likes/${id}`)
    .then(({data})=>dispatch(getLikes(data.total_likes)))
    .catch((e)=>dispatch(error()))
}

export const callForComments = (id)=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/comments/${id}`)
    .then(({data})=>dispatch(getComments(data)))
    .catch((e)=>dispatch(error()))
}

export const callForCategoryBlogs = (name)=>(dispatch)=>{
    dispatch(loading());
    axios.get(`http://localhost:8080/blogs/category/${name}`)
    .then(({data})=>dispatch(cateBlogs(data)))
    .catch((e)=>dispatch(error()))
}

export const callForGiveLikes = (payload)=>(dispatch)=>{
    axios.post(`http://localhost:8080/likes`,payload)
    .then(({data})=>console.log(data))
    .catch((e)=>dispatch(error()))
}

export const postComment = (payload)=>(dispatch)=>{
    axios.post(`http://localhost:8080/comments`,payload)
    .then(({data})=>console.log(data))
    .catch((e)=>dispatch(error()))
}

