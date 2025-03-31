let randomCountryElement = document.querySelector('#random-country-display');
let userAnswerElement = document.querySelector('#user-answer-entry');
let submitButton = document.querySelector('#submit-user-answer');
let resultTextElement = document.querySelector('#game-result');

console.log(countriesAndCodes)

let currentCountry = null; //this holds the current country

//this brings up a random country and resets UI
function loadRandomCountry() {
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length);
    currentCountry = countriesAndCodes[randomIndex];
    randomCountryElement.textContent = currentCountry.name;
    userAnswerElement.value = "";
    resultTextElement.textContent = "";
}

loadRandomCountry(); //loads random country upon page load

// this handles the submission of the user's answer
submitButton.addEventListener('click', function() {
    let userAnswer = userAnswerElement.value.trim();
    if (!userAnswer) {
        alert("Please enter an answer.");
        return;
    }
    let url = 'https://api.worldbank.org/v2/country/' + currentCountry.twoLetterCode + '?format=json';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (!data[1] || data[1].length === 0) {
                throw new Error("Invalid response from API");
            }
            let capitalCity = data[1][0].capitalCity;
            if (userAnswer.toLowerCase() === capitalCity.toLowerCase()) {
                resultTextElement.textContent = 'Correct! The capital of ' + currentCountry.name + ' is ' + capitalCity + '.';
            } else {
                resultTextElement.textContent = 'Wrong - the capital of ' + currentCountry.name + ' is ' + capitalCity + '.';
            }
        })
        .catch(function(error) {
            alert("Error fetching data from World Bank API: " + error);
        });
});

let playAgainButton = document.querySelector('#play-again');
if (playAgainButton) {
    playAgainButton.addEventListener('click', function() {
        loadRandomCountry();
    });
}