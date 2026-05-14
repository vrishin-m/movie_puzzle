const { createClient } = require('@supabase/supabase-js');

const port = 3000
const express = require("express");
const cors = require("cors");
const app = express()

require('dotenv').config({ override: true });

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'User created successfully', data });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  res.json({ 
    message: 'Login successful', 
    token: data.session.access_token 
  });
});


const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = user;
  next();
};


app.post('/posts', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; 

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, user_id: userId }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Post created', post: data });
});


app.get('/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
   
  if (error) return res.status(400).json({ error: error.message });
  res.json({ posts: data });
});





send_puzzle("easy");

