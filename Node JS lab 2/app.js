const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    switch (req.url) {
        case "/":
            var list = require("./todos.json");
            res.setHeader("content-type","text/html");
            res.statusCode=200;
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <a class="navbar-brand" href="/">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/">List</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../astronomy">astronomy</a>
                </li>
            </ul>
        </div>
    </nav>
</div>
<div id="body">
</div>
<script>
let list =${JSON.stringify(list)};
let body_list =document.getElementById("body");
let ul = document.createElement("ul");
body_list.appendChild(ul);

for (let i = 1; i <= list.length; i++)
{
    let li = document.createElement("li");
    li.innerHTML = list[i].title;
    ul.appendChild(li);
}

</script>
</body>
</html>   
            `);

            break;
        case "/home":
            const home= fs.readFileSync('./pages/home.html')
            res.setHeader("content-type","text/html");
            res.statusCode=200;
            res.end(home);
            break;

        case "/images/astronomy.jpg":
            res.setHeader("content-type","text/html");
            res.statusCode=200;
            const image = fs.readFileSync('./images/astronomy.jpg');
    
            res.end(image);            
            break;

        case "/astronomy":
            const astronomy= fs.readFileSync('./pages/astronomy.html')
            res.setHeader("content-type","text/html");
            res.statusCode=200;
            res.end(astronomy);
            break;
        case "/astronomy/download":
            const readStream = fs.createReadStream("./images/astronomy.jpg");
            res.setHeader('Content-Type','octet/stream');
            readStream.pipe(res);
           
            return res.on("end",()=>{res.end();})
        case "/main.css":
            res.statusCode = 200;
            res.end(`
      font-google-primary: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap';
      font-google-secondary: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
      
      
      font-size-small: 0.875em;
      
      image-width: 768px;
      
      dl-gradient-right: linear-gradient(90deg, rgba(0,0,0,0.04) 20%, rgba(255,255,255,0) 0%);
      
      body-background-color: $platinum;
      body-text-color: $nero;
    }`); 
    break;     
        default:
            res.statusCode=404;
            res.end("<h1>Page not found</h1>")
    }


});

// function downloadImage(url, filepath) {
//     return new Promise((resolve, reject) => {
//         client.get(url, (res) => {
//             if (res.statusCode === 200) {
//                 res.pipe(fs.createWriteStream(filepath))
//                     .on('error', reject)
//                     .once('close', () => resolve(filepath));
//             } else {
//                 res.resume();
//                 reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

//             }
//         });
//     });
// }

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});