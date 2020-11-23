const reqHandler = function (req,res) {


    console.log("Logging")

    const url = req.url;

    if (url === '/'){

        res.write('<html>');
        res.write('<body> <form action="/create-user" method="POST"> <input type="text" name="message" > </input> <button type="submit"> Send </button> </form> </body>')
        res.write('</html>');
        return res.end();
    } 

    if (url === '/users' && req.method ==='GET'){
        res.write('<html>');
        res.write('<ul> <li> User1</li> <li> User2 </li> </ul>');
        res.write('</html>');
        return res.end();
    }

    if (url === "/create-user" && req.method === "POST") {
        const body = [];
        req.on('data' , (chunk) => {
            body.push(chunk); 

        });

        req.on('end', () => {

            const parsedBody = Buffer.concat(body).toString();

            const message = parsedBody.split("=")[1];
            console.log("Received data : "+ message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }}

module.exports = reqHandler;