const http = require('http');
const fs = require('fs');
const url = require('url');

const home = fs.readFileSync('Home.html');
const libraries = fs.readFileSync('library.html');
const profile = fs.readFileSync('profile.html');
const about = fs.readFileSync('about.html');

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    if(url == 'Home.html'){
        res.end(home);
    }else if(url == 'library.html'){
        res.end(libraries);
    }else if(url == 'profile.html'){
        res.end(profile);
    }else if(url == 'about.html'){
        res.end(about);
    }else{
        res.statusCode = 404;
        res.end('404 file not found');
    }
})

server.listen(8000,'127.0.0.1', ()=>{
    console.log(`server is listening on port 8000`)
})