const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Distance Calculator</title>
      <style>
        body {
          background-color: white;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 30px;
          font-weight: bold;
        }
        .instruction, .formula {
          font-size: 20px;
          margin: 8px 0;
        }
        input {
          width: 100%;
          font-size: 20px;
          margin-bottom: 10px;
          padding: 4px;
        }
        button {
          background-color: #2196F3;
          color: white;
          font-size: 20px;
          padding: 10px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin-top: 5px;
        }
        .result {
          font-size: 20px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <h1>Distance of (x, y, z) from (0, 0, 0)</h1>
      <div class="instruction">Write the code for this app which calculates</div>
      <div class="formula">d = Math.sqrt(x*x + y*y + z*z)</div>

      <input type="number" id="x" placeholder="x" />
      <input type="number" id="y" placeholder="y" />
      <input type="number" id="z" placeholder="z" />
      
      <button onclick="calculate()">CALCULATE DISTANCE</button>
      
      <div class="result" id="result"></div>

      <script>
        function calculate() {
          const x = parseFloat(document.getElementById('x').value);
          const y = parseFloat(document.getElementById('y').value);
          const z = parseFloat(document.getElementById('z').value);

          if (isNaN(x) || isNaN(y) || isNaN(z)) {
            document.getElementById('result').textContent = 'Please enter valid numbers.';
            return;
          }

          const d = Math.sqrt(x*x + y*y + z*z);
          document.getElementById('result').textContent =
            \`distance to (\${x}, \${y}, \${z}) is d = \${d.toFixed(2)}\`;
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = router;