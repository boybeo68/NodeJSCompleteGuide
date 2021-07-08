const http = require('http');
const fs = require('fs');
const server =  http.createServer((req,res)=>{

    // console.log({url: req.url});
    const url = req.url ;
    const method = req.method;
    if (url === '/') {
        res.write(`<head>
        </head>
        <body>
            <h1>Input form </h1>
            <form action="/message" method="POST">
                <input type="text" name="message" id="message">
                <input type="submit" value="Send">
            </form>
        </body>
        </html>`);
        return res.end()
    }
    if (url === '/message' && method ==='POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            fs.writeFileSync('message.txt',  parseBody.split('=')[1])
            console.log('parseBody', parseBody);
            res.statusCode = 302;
            res.setHeader('Location','/')
            return res.end()
        })
       

    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html lang="en">

    <head>
        <title>Document</title>
    </head>
    
    <body>
        <h1>helo node js</h1>
    </body>
    
    </html>`)
    res.end()
    // process.exit()
})
server.listen(3000)
