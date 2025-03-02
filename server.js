import http from 'http';
import fs from 'fs';
import path from 'path';
import { WebSocketServer } from 'ws';

const port = process.env.PORT || 3010;
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Coding</title>
</head>
<body>
    <script>
        const ws = new WebSocket('ws://localhost:${port}');
        ws.onopen = () => {
            console.log('Connected');
        };
        ws.onmessage = (event) => {
            // const script = document.getElementById('p5script');
            // if (script) {
            //     script.remove();
            // }
            // const newScript = document.createElement('script');
            // newScript.id = 'p5script';
            // newScript.innerHTML = event.data;
            // document.body.appendChild(newScript);
            // console.log('Received: ', event.data);
            location.reload();

        };
        ws.onclose = () => {
            console.log('Disconnected');
        };

        fetch('/update').then(response => response.json()).then(data => {
            const script = document.createElement('script');
            script.id = 'p5script';
            script.innerHTML = atob(data.split(',')[1]);
            document.body.appendChild(script);
        });

    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js"></script>
</body>
</html>`

const allFilesPath = [];
const ignorePathsFile = ".ignorewatcher"
const ignorePaths = fs.readFileSync(`./${ignorePathsFile}`, 'utf8').trim().split('\n');

function getAllFilesPath(currentPath){
    const files = fs.readdirSync(currentPath);
    files.forEach(file => {
        if(ignorePaths.includes(file)){
            return;
        }
        const filePath = path.join(currentPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFilesPath(filePath);
        }
        else {
            if (path.extname(filePath) === '.js'){
                const fileUpdatedTime = fs.statSync(filePath).mtime;
                allFilesPath.push([filePath, fileUpdatedTime]);
            }
        }
    });
}
getAllFilesPath('./');
allFilesPath.sort((a, b) => b[1] - a[1]);

const server = http.createServer((req, res) => {
    
    if (req.url === '/update') {
        res.setHeader('Content-Type', 'text/plain');
        const fileData = fs.readFileSync(allFilesPath[0][0], 'utf8');
        res.end(JSON.stringify(`data:text/javascript;base64,${Buffer.from(fileData).toString('base64')}`));
    }else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    }
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    fs.watch('./', { recursive: true }, (eventType, filename) => {
        if (filename && path.extname(filename) === '.js') {
            if(ignorePaths.includes(filename)){
                return;
            }
            console.log(`The file ${filename} was changed!`);
            if (allFilesPath.includes(filename)){
                allFilesPath.splice(allFilesPath.indexOf(filename), 1);
                allFilesPath.unshift([filename, fs.statSync(filename).mtime]);
            } else{
                allFilesPath.unshift([filename, fs.statSync(filename).mtime]);
            }
            
            const fileData = fs.readFileSync(allFilesPath[0][0], 'utf8');
            ws.send(fileData);
            return;
            // const scriptPath = filename;
            // fs.writeFileSync(`./index.html`, html(scriptPath));
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

