import { createServer } from "http";
import { promises as fs } from "fs";

const styles = [
  "./styles/content/index.css",
  "./styles/footer.css",
  "./styles/header.css",
  "./styles/index.css",
  "./styles/menu.css"
];

Promise.all(styles.map(s => fs.readFile(s)))
  .then(s => s.join("\n\n"))
  .then(style => {
    const server = createServer((req, res) => {
      res.end(`
        <html>
          <head>
            <style>
              * {
                margin: 0;
                padding: 0;
              }
            </style>
          </head>
          <body>
            <iframe id="frame" src="https://is.cuni.cz/studium" style="width: 100vw; height: 100vh;border: none"></iframe>
            <script type="text/javascript">
              const iframe = document.getElementById("frame").contentWindow;
              console.log(iframe.addEventListener);

              const a = () => {

              };
              setTimeout(a, 5000);

              const onload = () => {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(document.createTextNode(\`${style}\`));
                console.log(iframe.head);
                iframe.document.head.appendChild(style);
  
                const meta = document.createElement("meta");
                meta.setAttribute("name", "viewport");
                meta.setAttribute("content", "width=device-width, initial-scale=1");
                iframe.head.appendChild(meta);
  
                if(iframe.querySelector("#stev_role_icons.anonym")) {
                  iframe.body.classList.add("body-with-login");
                }
              }

              
            </script>
          </body>
        </html>
      `);
    });

    server.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  });
