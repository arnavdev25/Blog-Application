import {
  CATEGORY_BLOGS,
  ERROR,
  GET_ALL_BLOGS,
  GET_ALL_CATEGORIES,
  GET_ALL_TRASH_BLOGS,
  GET_ALL_USERS,
  GET_COMMENTS,
  GET_LIKES,
  GET_SINGLE_BLOG,
  LOADING,
} from "./actions";

const iniState = {
  loading: false,
  error: false,
  allBlogs: [],
  trash: [],
  singleBlog: [],
  categories: [],
  users: [],
  likes: 0,
  commentCount: 0,
  comments: [],
  categoryBlogs: []
};

export const blogReducer = (state = iniState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BLOGS:
      return {
        ...state,
        loading: false,
        error: false,
        allBlogs: payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        allBlogs: [],
      };
    case GET_ALL_TRASH_BLOGS:
      return {
        ...state,
        loading: false,
        error: false,
        trash: payload,
      };
    case GET_SINGLE_BLOG:
      return {
        ...state,
        loading: false,
        error: false,
        singleBlog: payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: false,
        categories: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        error: false,
        users: payload,
      };
    case GET_LIKES:
      return {
        ...state,
        loading: false,
        error: false,
        likes: payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        loading: false,
        error: false,
        commentCount: payload.total,
        comments: payload.comments,
      };
    case CATEGORY_BLOGS:
      return {
        ...state,
        loading: false,
        error: false,
        categoryBlogs: payload
      };
    default:
      return state;
  }
};
