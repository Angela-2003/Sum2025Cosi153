const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Color Buttons</title>
      <style>
        body {
          background-color: white;
          font-family: Arial, sans-serif;
          padding: 10px;
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: space-between;
        }
        
        #root {
            flex: 1; /* Allows #root to fill remaining space if body has other elements */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .container {
            flex: 1; /* Fills available space */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .top-row {
            display: flex;
            flex-direction: row; /* Row layout for top buttons, matches RN */
            justify-content: space-between; /* Space between buttons, matches RN */
            margin-top: -20px; /* Matches RN negative margin */
            gap: 0px; /* Explicitly no gap, as per RN */
        }

        .button-common {
            flex: 1; /* Each button takes equal space, matches RN */
            padding: 10px; /* Internal spacing, matches RN */
            display: flex; /* Use flex to center text */
            align-items: center; /* Center text vertically, matches RN */
            justify-content: center; /* Center text horizontally, matches RN */
            border-radius: 3px; /* Rounded corners, matches RN */
            cursor: pointer;
            border: none; /* No default border for buttons */
            margin: 0px; /* Small margin between buttons for subtle separation, as RN had no gap but visually separated buttons */
            box-sizing: border-box; /* Include padding in width calculation */
        }

        .full-width-button {
            width: 100%; /* Full width for bottom buttons, matches RN */
            padding: 10px; /* Same padding for bottom buttons, matches RN */
            margin-top: 0px; /* Matches RN's marginTop: 0 for stacked buttons */
            display: flex;
            align-items: center; /* Center text vertically, matches RN */
            justify-content: center; /* Center text horizontally, matches RN */
            border-radius: 3px; /* Rounded corners, matches RN */
            cursor: pointer;
            border: none;
            box-sizing: border-box; /* Include padding in width calculation */
        }

        .button-text {
            color: white; /* White text, matches RN */
            font-weight: normal; /* Thickness of text, matches RN */
            font-size: 20px; /* Size of the text in the buttons, matches RN */
        }

        .blue-bg { background-color: blue; }
        .red-bg { background-color: red; }
        .green-bg { background-color: green; }

        .middle-section {
            flex: 1; /* Take all the space between top and bottom, matches RN */
            display: flex;
            flex-direction: column; /* Allows vertical centering if content grows */
            justify-content: flex-start; /* Text on top of the container, matches RN */
            margin-top: 40px; /* Matches RN margin */
            align-items: center; /* Center horizontally, matches RN */
            text-align: center; /* Ensure text itself is centered */
        }

        .middle-text {
            font-size: 25px; /* Larger text, matches RN */
            font-weight: bold; /* Bold, matches RN */
            text-align: center; /* Center align, matches RN */
        }

        .bottom-buttons-container {
          margin-bottom: 0px;
          display: flex;
          flex-direction: column;
        }

      </style>
    </head>
    <body>
      <div class="top-row">
        <button class="button-common blue-bg" onclick="logColor('blue')">
          <span class="button-text">BLUE BUTTON</span>
        </button>
        <button class="button-common red-bg" onclick="logColor('red')">
          <span class="button-text">RED BUTTON</span>
        </button>
        <button class="button-common green-bg" onclick="logColor('green')">
          <span class="button-text">GREEN BUTTON</span>
        </button>
      </div>

      <div class="middle-section">
        <span class="middle-text">Write the code for this screen</span>
      </div>

      <div class="bottom-buttons-container">
        <button class="full-width-button blue-bg" onclick="logColor('blue')">
          <span class="button-text">BLUE BUTTON</span>
        </button>
        <button class="full-width-button red-bg" onclick="logColor('red')">
          <span class="button-text">RED BUTTON</span>
        </button>
        <button class="full-width-button green-bg" onclick="logColor('green')">
          <span class="button-text">GREEN BUTTON</span>
        </button>
      </div>

      <script>
        function logColor(color) {
          console.log(color + ' button pressed');
          alert(color + ' button pressed');
        }
      </script>
    </body>
    </html>
  `);
});

module.exports = router;