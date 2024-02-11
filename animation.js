// List of sentences
var _CONTENT = [
    "Will you be my Valentine's?"
];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
function Type() {
    // Get substring with 1 characater added
    var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (text === _CONTENT[_PART]) {
        // Hide the cursor
        _CURSOR.style.display = 'none';

        clearInterval(_INTERVAL_VAL);
        setTimeout(function () {
            _INTERVAL_VAL = setInterval(Delete, 50);
        }, 1000);
    }
}

// Implements deleting effect
function Delete() {
    // Get substring with 1 characater deleted
    var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX--;

    // If sentence has been deleted then start to display the next sentence
    if (text === '') {
        clearInterval(_INTERVAL_VAL);

        // If current sentence was last then display the first one, else move to the next
        if (_PART == (_CONTENT.length - 1))
            _PART = 0;
        else
            _PART++;

        _PART_INDEX = 0;

        // Start to display the next sentence after some time
        setTimeout(function () {
            _CURSOR.style.display = 'inline-block';
            _INTERVAL_VAL = setInterval(Type, 100);
        }, 200);
    }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

document.querySelector('.btn-yes').addEventListener('click', function () {
    window.location.href = 'https://forms.gle/6W6dzMmW6JbydyBY9'; // Change this URL to your desired destination
});

const noButton = document.querySelector('.btn-no');
const container = document.querySelector('.button-container');

document.addEventListener('mousemove', function (event) {
    const noButtonRect = noButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const noButtonX = noButtonRect.left + noButtonRect.width / 2;
    const noButtonY = noButtonRect.top + noButtonRect.height / 2;
    const distance = Math.sqrt(Math.pow(noButtonX - mouseX, 2) + Math.pow(noButtonY - mouseY, 2));

    if (distance < 200) { // If mouse comes within 200px of the No button
        let newX, newY;
        do {
            newX = Math.random() * (container.clientWidth - noButton.clientWidth);
            newY = Math.random() * (container.clientHeight - noButton.clientHeight);
            // Check if new position is further away
        } while (Math.abs(newX - noButtonX) < 100 && Math.abs(newY - noButtonY) < 100);

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }
});