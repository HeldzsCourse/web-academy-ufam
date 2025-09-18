export default function template(body) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="container">
    <h2 class="space-mono-bold">GERADOR DE LOREM IPSUM!</h2>
    
    <form method="get" action="/">
      <label for="num-p">Parágrafos: </label>
      <input type="number" id="num-p" name="p">
      <button type="submit">Gerar</button>
    </form>

    <div class="content">
      ${body}
    </div>
  </div>
</body>
</html>
  `;
}
