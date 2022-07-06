const express = require("express");
const env = require("dotenv");
const connection = require("./db");
const passport = require('passport');
let GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const session = require("express-session");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const likeRoutes = require("./routes/likesRouter");
const commentRoutes = require("./routes/commentsRouter");
const categoryRoutes =  require("./routes/categoryRoutes");
const { default: axios } = require("axios");
// require("dotenv").config();
const CLIENT_ID = "948a7d9167377daf905e";
const CLIENT_SECERET = "a34d7f6ff947db513fdf3224a4d686f3f8d8a856";

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((obj,done)=>{
  done(null,obj)
})

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSeceret: CLIENT_SECERET,
  callbackURL: "http://localhost:8080/api/auth/github"
},(accessToken,refreshToken,profile,done)=>{
  process.nextTick(()=>{
    console.log(profile);
    return done(null,profile)
  })
}))

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
 })
);
app.use(passport.initialize());
app.use(passport.session());

env.config({path:"./config.env"});

app.use("/blogs", blogRoutes);
app.use("/users",userRoutes);
app.use("/likes",likeRoutes);
app.use("/comments",commentRoutes);
app.use("/category",categoryRoutes);


// let accessToken = "";
// app.get('/api/auth/github',async (req,res)=>{
//   const requestToken = req.query.code; //used to get access token
//   //Access token are different for every users
//   //Store access token into db
//   console.log("Login Success",requestToken);
//   if(req.query.error){
//     return res.send("error occured" + req.query.error_description);
//   }
//   const response = await axios.post('https://github.com/login/oauth/access_token',
//   {},
//   {
//     params:{
//       client_id: "948a7d9167377daf905e",
//       client_server: "a34d7f6ff947db513fdf3224a4d686f3f8d8a856",
//       code: requestToken
//     }
//   })
//   console.log(response);
//   accessToken = response.data.access_token;
//   console.log(accessToken);
//   res.send(`Login Successfully! ${accessToken}`)
// })
app.get("/",(req,res)=>{
  res.send("Login")
})
app.get('/api/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
  });

app.get('/api/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(process.env.PORT,(req, res) => {
  try {
    connection();
  } catch (error) {
    console.log(error);
  }
  console.log(`Successfully started at PORT ${process.env.PORT}`);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
