const fs = require('fs');


const handlerfunction=(req, res)=>{

    const url = req.url;
    const method = req.method;

    if (url === '/') {

        fs.readFile("./data.txt", "utf-8", (err, data) => {
            res.write("<html>");
            res.write("<head><title>message</title></head>");
            res.write(`<body><h1>${data}</h1></body>`);
            res.write(`<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">send</button></input></form></body>`);
            res.write("</html>");

            return res.end();
        });

    }

    else if (url === "/message" && method === "POST") {
    const body = [];
        
        req.on("data", (chunk) => {
            body.push(chunk);
            console.log("body=", body.toString("utf-8").split("=")[1]);

        });


       return req.on("end", () => {
        const message = body.toString("utf-8").split("=")[1];


            fs.writeFile("./data.txt", message, () => {

                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();
            })
        });
    };

}


module.exports = handlerfunction;