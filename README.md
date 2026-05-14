this project was kind of made in a hurry, so lots of things are broken. i do intend on slowly fixing them in the upcoming days. for now ig a (broken) MVP is there

notably, the ui is absolute garbage

i intended for the current one to be temporary, and later replace it using tailwindcss, but i never got round to it

also, ig i messed up somewhere in using states for the frontend, cuz u need to reload to see the question or make it update

# setup instructions:


download everything

make a .env file in the backend folder, and put gemini api key into it

cd into backend, and use npm install, then type node index.js. if you get the "gemini is facing high volume" error, wait a while and try again

cd into frontend/my-app and use npm install, then type npm run dev

go to http://localhost:5173/, sign up and try out the game. as long as you are logged in, your score will keep getting updated, so you can rise up the leaderboard

