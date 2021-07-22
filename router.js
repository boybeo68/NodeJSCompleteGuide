const fs = require('fs');
const requestHandle  = (req, res) =>{
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
      return  req.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            fs.writeFile('message.txt',  parseBody.split('=')[1], err => {
                console.log('parseBody', parseBody);
                res.statusCode = 302;
                res.setHeader('Location','/')
                return res.end()
            })
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
}
module.exports = requestHandle;
// module.exports = {
//     halde: requestHandle,
//     someText: 'Here is some text',
// }
// module.exports.handle = requestHandle;
// module.exports.someText = 'Some text';
// exports.handle = requestHandle;
// exports.someText = 'Some text'