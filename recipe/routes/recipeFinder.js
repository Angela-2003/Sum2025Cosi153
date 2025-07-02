const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Meal Finder</title>
    <style>
        /* Global styles and container setup to mimic React Native's flex: 1 */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif; /* Using Inter font */
            box-sizing: border-box; /* Include padding in element's total width and height */
        }
        body {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 16px; /* Matches RN container padding */
            height: 100vh; /* Ensures body takes full viewport height */
        }

        /* Header style */
        .header {
            font-size: 40px; /* Matches RN header fontSize */
            font-weight: normal; /* Matches RN header fontWeight */
            margin-bottom: 20px; /* Matches RN header marginBottom */
        }

        /* Inline Row (Label + Input) style */
        .inline-row {
            flex-direction: row; /* Matches RN inlineRow flexDirection */
            align-items: center; /* Matches RN inlineRow alignItems */
            margin-bottom: 16px; /* Matches RN inlineRow marginBottom */
        }

        /* Label style */
        .label {
            font-size: 18px; /* Matches RN label fontSize */
            margin-right: 8px; /* Matches RN label marginRight */
        }

        /* Input style */
        .inline-input {
            flex: 1; /* Matches RN inlineInput flex */
            font-size: 18px; /* Matches RN inlineInput fontSize */
            padding: 8px; /* Padding inside the input */
            border: none;
            outline: none;
        }

        /* Card styles for each meal item */
        .card {
            display: flex;
            flex-direction: row; /* Matches RN card flexDirection */
            justify-content: center; /* Matches RN card justifyContent */
            align-items: center; /* Matches RN card alignItems */
            background-color: #FFDAB9; /* Matches RN card backgroundColor */
            border-color: #000; /* Matches RN card borderColor */
            border-width: 3px; /* Matches RN card borderWidth */
            border-style: solid; /* Needs explicit style for border-width to work */
            padding: 12px; /* Matches RN card padding */
            margin-bottom: 12px; /* Matches RN card marginBottom */
        }

        /* Inner card content (text + image) style */
        .inner {
            display: flex;
            flex-direction: row; /* Matches RN inner flexDirection */
            align-items: center; /* Matches RN inner alignItems */
            width: 100%; /* Ensure inner div takes full width of card */
        }

        /* Card text (meal name) style */
        .card-text {
            flex: 1; /* Matches RN cardText flex */
            font-size: 18px; /* Matches RN cardText fontSize */
            text-align: center; /* Matches RN cardText textAlign */
            margin-bottom: 40px; /* Matches RN cardText marginBottom */
            margin-top: 0; /* Remove default paragraph margin */
            word-break: break-word; /* Ensure long names wrap */
        }

        /* Card image style */
        .card-image {
            width: 60px; /* Matches RN cardImage width */
            height: 60px; /* Matches RN cardImage height */
            margin-left: 50px; /* Matches RN cardImage marginLeft */
            object-fit: cover; /* Ensures image covers the area without distortion */
        }

        /* Loading indicator style */
        .loading-indicator {
            text-align: center;
            margin-top: 20px; /* Matches RN ActivityIndicator margin */
            font-size: 24px;
            color: #555;
        }

        /* Styles for the list container (equivalent to FlatList contentContainerStyle) */
        #mealListContainer {
            flex: 1; /* Allows the list to take remaining vertical space */
            overflow-y: auto; /* Enables scrolling for the list */
            padding-bottom: 16px; /* Matches RN FlatList contentContainerStyle paddingBottom */
        }
    </style>
</head>
<body>
    <h1 class="header">Meal Finder</h1>

    <div class="inline-row">
        <label for="ingredientInput" class="label">Main Ingredient:</label>
        <input type="text" id="ingredientInput" class="inline-input" value="beef" />
    </div>

    <div id="loadingIndicator" class="loading-indicator" style="display: none;">
        Loading meals...
    </div>

    <div id="mealListContainer">
        <!-- Meal cards will be rendered here by JavaScript -->
    </div>

    <script>
        const ingredientInput = document.getElementById('ingredientInput');
        const mealListContainer = document.getElementById('mealListContainer');
        const loadingIndicator = document.getElementById('loadingIndicator');

        let currentIngredient = ingredientInput.value; // Initialize with default 'beef'

        // Function to fetch meals from the API
        const getMeals = async (query) => {
            if (!query) {
                mealListContainer.innerHTML = ''; // Clear list if query is empty
                return;
            }

            loadingIndicator.style.display = 'block'; // Show loading indicator
            mealListContainer.innerHTML = ''; // Clear previous results

            try {
                const url = \`https://www.themealdb.com/api/json/v1/1/filter.php?i=\${encodeURIComponent(query)}\`;
                const res = await fetch(url);
                const json = await res.json();

                const meals = json.meals || [];
                renderMeals(meals); // Render the fetched meals
            } catch (e) {
                console.error("Error fetching meals:", e);
                mealListContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">Failed to load meals. Please try again.</p>';
            } finally {
                loadingIndicator.style.display = 'none'; // Hide loading indicator
            }
        };

        // Function to render meal items into the DOM
        const renderMeals = (meals) => {
            if (meals.length === 0) {
                mealListContainer.innerHTML = '<p style="text-align: center; margin-top: 20px;">No meals found for this ingredient.</p>';
                return;
            }

            meals.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const inner = document.createElement('div');
                inner.className = 'inner';

                const cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = item.strMeal;

                const cardImage = document.createElement('img');
                cardImage.className = 'card-image';
                cardImage.src = item.strMealThumb;
                cardImage.alt = item.strMeal; // Add alt text for accessibility
                // Fallback for broken images (optional, but good practice)
                cardImage.onerror = function() {
                    this.onerror=null; // Prevent infinite loops
                    this.src='https://placehold.co/60x60/cccccc/333333?text=No+Image'; // Placeholder
                };

                inner.appendChild(cardText);
                inner.appendChild(cardImage);
                card.appendChild(inner);
                mealListContainer.appendChild(card);
            });
        };

        // Event listener for input changes (to update currentIngredient state)
        ingredientInput.addEventListener('input', (event) => {
            currentIngredient = event.target.value;
        });

        // Event listener for Enter key press on the input field (onSubmitEditing equivalent)
        ingredientInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if input is inside a form
                getMeals(currentIngredient.trim());
            }
        });

        // Initial load of meals when the page loads (useEffect equivalent)
        document.addEventListener('DOMContentLoaded', () => {
            getMeals(currentIngredient);
        });
    </script>
</body>
</html>
    `);
});

module.exports = router;