
const { resolve } = require('path');
const nodeHtmlToImage = require('node-html-to-image');

const variables = require(resolve('src', 'variables'));

if (!variables.heading1 || !variables.heading2) {
  return;
}


nodeHtmlToImage({
  quality: 100,
  output: resolve('dist', 'image.png'),
  html:`
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono" rel="stylesheet">
      <style>
          html, body {
          width:1200px;
          height:627px;
          }
          body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          }
          header {
          text-align: center;
          }
          h1,
          h2
          {
          font-family: "Cutive Mono", monospace;
          margin: 0;
          padding: 0;
          }
          h1 {
          font-size: 3rem;
          color: #000;
          }
          h2{font-size: 1.8rem; color: #666; margin-top: 8px;}
      </style>
    </head>
    <body>
      <header>
          <h1>${variables.heading1}</h1>
          <h2>${variables.heading2}</h2>
      </header>
    </body>
    </html>
  `
});

