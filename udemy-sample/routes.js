const fs = require ('fs');


const reqHandler = (req, res) => {



if (req.url === '/') {

    res.write('<html>');
    res.write('<head><title>My first page </title> </head>');
    res.write('<body> <form action="/message" method="POST"> <input type ="text" name="msg"> <button type="submit">Send </button> </form> </body>')
    res.write('</html>');
    return res.end();

} 

if (req.url === '/message' && req.method === 'POST') {

        const body = [];
        req.on('data' , (chunk) => {
            console.log(chunk);
            body.push(chunk); 

        });

        req.on('end', () => {

            const parsedBody = Buffer.concat(body).toString();
            console.log("ParsedBody : " + parsedBody);

            const message = parsedBody.split("=")[1];
    console.log(message+ "!");
            fs.writeFileSync("message.txt", message);

        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

}
res.setHeader("Content-Type", "text/html");
res.write("<h1>This is the response !!</h1>");
res.end();
};

module.exports = reqHandler;