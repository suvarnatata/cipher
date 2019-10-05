/** TODO: Create url that will pass cipher selected and key input */


/** This will allow user to tweet out their coded message, and allow others
 *  to click the link to decrypt the message without having to search for the
 *  cipher or key */


/**
 * @param str
 * @returns {Array|{index: number, input: string}|*}
 */
function isAlpha(str) {
    var regex = /[A-Za-z]/;
    return str.match(regex);
}


/**
 * Method that returns the alphabet position of character
 * @param letter
 * @returns {*}
 */
function alphabetPosition(letter) {
    if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
        return letter.charCodeAt(0) - 97;
    }
    else if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
        return letter.charCodeAt(0) - 65;
    }
    else {
        return letter.charCodeAt(0);
    }
}


/**
 * Method to rotate the character
 * @param char
 * @param rot
 * @returns {string}
 */
function rotateCharacter(char, rot, encrypt) {

    // Alphabet position based on 0-25 (26 characters)
    var c = alphabetPosition(char);

    if (char == char.toUpperCase()) {
        // if encrypt than add rotation
        if (encrypt == true) {
            return String.fromCharCode(((c + rot) % 26) + 65);
        } else {
            if (rot == rot && c <= (rot - 1)) {
                return String.fromCharCode(((c - rot) % 26) + 65 + 26);
            }
            else {
                return String.fromCharCode(((c - rot) % 26) + 65);
            }

        }

    }
    else if (char == char.toLowerCase()) {
        if (encrypt == true) {
            return String.fromCharCode(((c + rot) % 26) + 97);
        } else {
            if (rot == rot && c <= (rot - 1)) {
                return String.fromCharCode(((c - rot) % 26) + 97 + 26);
            }
            else {
                return String.fromCharCode(((c - rot) % 26) + 97);
            }

        }

    }
    else {
        return String.fromCharCode(c);
    }

}


/**
 * Method to encrypt/decrypt substitution cipher
 * @param text
 * @param rot
 * @returns {string}
 */
function caesarCipher(text, rot, encrypt) {
    var encryptedMessage = [];
    for (var i = 0; i < text.length; i++) {
        if (isAlpha(text[i])) {
            encryptedMessage.push(rotateCharacter(text[i], rot, encrypt));
        }
        else {
            encryptedMessage.push(text[i]);
        }
    }
    return encryptedMessage.join('');
}


/**
 * Method to encrypt / decrypt vigenere cipher text
 *
 * @param text
 * @param key
 * @returns {string}
 */
function vigenereCipher(text, key, encrypt) {
    var encryptedMessage = [];
    var idx = 0;
    var i = 0;

    // var keyString = text.replace(/[a-z]/gi, c => key[i++ % key.length]);  ES6
    var keyString = text.replace(/[a-z]/gi, function (c) {
        return c == ' ' ? c : key[i++ % key.length]
    }); // ES5
    // var keyString = text.replace(/[a-z]/gi, (a, b) => a == ' ' ? a : key[i++ % key.length]);

    while (idx < text.length) {
        if (isAlpha(text[idx])) {
            encryptedMessage.push(rotateCharacter(text[idx], alphabetPosition(keyString[idx]), encrypt));
        }
        else {
            encryptedMessage.push(text[idx])
        }
        idx++;
    }

    return encryptedMessage.join('');
}


/**
 * Method for modal windows
 */
function modals() {

    // Set display to none -- allowing for fade-in and on click events
    $('.modal').css('display', 'none');

    // On 'About' nav click
    $('#about').on('click', function () {
        $('#aboutModal').addClass('is-active').fadeIn(500);
        $('body').addClass('stop-scroll');
    });

    // On background click remove is-active class + set display
    $('.modal-background').on('click', function () {
        $('#aboutModal').removeClass('is-active');
        $('body').removeClass('stop-scroll');
        $('.modal').css('display', 'none');
    });

    // On modal close click remove is-active class + set display
    $('.mod-close').on('click', function () {
        $('#aboutModal').removeClass('is-active');
        $('body').removeClass('stop-scroll');
        $('.modal').css('display', 'none');
    });

}


/**
 * Method to alert users with notifications
 */
function alerts() {

    // Alert Warning
    // On exit click remove alert
    $('.del-warn').on('click', function () {
        $('#notify').css('visibility', 'hidden');
    });

    // On text area focus add animation class to notification alert
    $('#enText').on('focus', function () {
        $('#notify').addClass('fadeInLeft');
    });
}


/**
 * Method to mimic typing
 */
function typeOut() {

    var text = "Send hidden messages...";
    // Array of speed
    var speedArr = [170, 180, 195, 200, 215];
    // Choose a speed at random
    var rand = speedArr[Math.floor(Math.random() * speedArr.length)];
    //text is split up to letters
    $.each(text.split(''), function (i, letter) {

        //we add rand*i ms delay to each letter
        setTimeout(function () {

            //we add the letter to the text div
            $('#texttype').html($('#texttype').html() + letter);

        }, rand * i);
    });

}

/**
 * Method to mimic cursor blink
 */
function cursorBlink() {

    // Set the timeout to a 1.2s
    setTimeout(function () {

        // Fade cursor out and back in
        $('#cursor').fadeOut('fast').fadeIn('fast');

    }, 500);

}

/**
 * Method to scroll-to-point on page
 */
function scroll() {

    // On "Encrypt" nav button click
    $('.nav-encrypt-btn').on('click', function () {

        // Scroll animation to input section
        $("html,body").animate({
            scrollTop: 200
        }, 600);


        // Flashes the input section
        $('#encrypt-sec').fadeTo(1000, 0.25, function () {
            $(this).fadeTo(800, 1);
        });

    });
}

/**
 * Method to check if screen size has changed
 */
function screenChange() {
    if ($(window).width() < 769) {

    }
    else {

    }
}


/**
 * TODO: Vigenere key block - rotation (string and rotation key)
 */

/**
 * Method for displaying text = key
 */
function keyBlock() {
    $('#vig-section').hide();

    var abcplain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    $('.abc-plaintext').append(abcplain.split('').join(' '));
    $('.abc-cipher').append(abcplain.split('').join(' '));


    var plainkey = document.getElementById('plain-key-title');
    var cipherkey = document.getElementById('cipher-key-title');

    var c = ''; // variable to hold return cipher key


    var clickCounter = 0;

    // On Choose Cipher drop down change
    $('#cipherSelect').on('change', function () {
        // Show Key Select DD
        $(this).removeClass('is-danger');
        $('.h-select').css("visibility", "hidden");
        $('.fa-warning').css('visibility', 'hidden');

        // $('#key-col').attr('style', 'display: block!important');

        $('#plain-key-title').html("Substitution Key:");
        $('#cipher-key-title').html("Ciphertext:");

        // $('#enText').val(''); // PLaintext textarea
        $('#msgdisplay').val(''); // Cipher textarea
        var value = $(this).val();

        $('.abc-cipher').text(''); // clear current text in cipher key block


        var sub1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        var sub2 = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        var subArray = sub1.concat(sub2);

        var randSub = subArray[Math.floor(Math.random() * subArray.length)];

        if (value == "caesar") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val('3').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Caesar Cipher / Key-' + $('#subSelect').val());

            c = keyChange(abcplain, $('#subSelect').val());
            $('.abc-cipher').append(c);

        }
        else if (value === "rot13") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val('13').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('ROT' + $('#subSelect').val());

            c = keyChange(abcplain, $('#subSelect').val());
            $('.abc-cipher').append(c);

        }
        else if (value === "substitution") {
            $('#vig-section').fadeOut('fast').hide();
            $('#vigenere-input').hide('fast');

            $("#sub-section").fadeIn('slow').show('slow');

            $('#key-col').show('slow');

            $('#subSelect').val(randSub).prop('selected', true)

            plainkey.append('Plaintext');
            cipherkey.append('Key-' + randSub);

            c = keyChange(abcplain, randSub);
            $('.abc-cipher').append(c);

        }
        else if (value === "vigenere") {
            $("#sub-section").fadeOut('fast').hide();

            // Dynamically creates Vigenere table
            if (clickCounter <= 0) {
                makeTable();
                clickCounter++;
            }

            $('#vig-section').fadeIn('slow').show();

            $('#key-col').hide('fast');

            $('#vigenere-input').show('slow');

            document.getElementById('vigenereKey').value = "";

            plainkey.append('Plaintext');

            $('#vigenereKey').removeClass('is-danger');

            // vigenere text warning
            $('.v-text').css('visibility', 'hidden');
            // icon warning
            $('.v-warn').css('visibility', 'hidden');

        }

    });


    // On Substitution Key Change
    $('#subSelect').on('change', function () {

        $('#plain-key-title').html("Substitution Key:");
        $('#cipher-key-title').html("Ciphertext:");

        var value = $(this).val();

        $('.abc-cipher').text(''); // clear current text in cipher key block

        if (value === '3') {

            $('#cipherSelect').val('caesar').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Caesar Cipher / Key-' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);


        }
        else if (value === '13') {

            $('#cipherSelect').val('rot13').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('ROT' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);

        }
        else if (value >= '1' || value < '3' || value > '3' || value <= '12') {
            $('#cipherSelect').val('substitution').prop('selected', true);

            plainkey.append('Plaintext');
            cipherkey.append('Key-' + value);

            c = keyChange(abcplain, value);
            $('.abc-cipher').append(c);

        }
    });

    var timer;
    var previousVal = $('#vigenereKey').val();
    $('#vigenereKey').keyup(function () {
        var currentVal = $(this).val();
        //$('.abc-cipher').text(''); // clear current text in cipher key block
        $('#cipher-key-title').html("Ciphertext:");

        clearTimeout(timer);
        timer = setTimeout(function () {
            if (currentVal != previousVal) {
                cipherkey.append('Vigenere Cipher / Key-' + currentVal);

                currentVal = currentVal.replace(/\s/g, ''); // remove white space to allow multiple words
                c = vigKeyBlock(abcplain, currentVal);

                $('.abc-cipher').append(c);
            }
        }, 500);

    });

}

// TODO: Fix vigenere key display from "ABCDEF" to actual beginning of user entered string - up to 24 characters ...

/**
 * Method to change the key display for  Substitution
 *
 * @param abc
 * @param idx
 * @returns {string}
 */
function keyChange(abc, idx) {
    var answer = abc.slice(idx) + abc.slice(0, idx);
    return answer.split('').join(' ');
}


/**
 * Method to change the key display for vigenere
 *
 * @param abc
 * @param vigKey
 * @returns {string}
 */
function vigKeyBlock(abc, vigKey) {
    var idx = 0;
    var i = 0;
    var keyblock = [];

    vigKey = vigKey.toUpperCase();

    var keyString = abc.replace(/[a-z]/gi, function (c) {
        return c == '' ? c : vigKey[i++ % vigKey.length]
    }); // ES5


    while (idx < abc.length) {
        keyblock.push(keyString[idx])
        idx++;

    }

    // keyblock type is object - set to string
    var newKey = String(keyblock);

    return newKey.split('').join('').replace(/,/g, ' ');

}


/**
 * Method for progress bar animation
 */
function loader() {

    var progress = document.getElementById("progbar");

    progress.style.display = "block";

    var width = 10;
    var id = setInterval(frame, 1);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            progress.style.width = 0;
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }

}


/**
 * Method to check if string is all letters
 *
 * @param str
 * @returns {boolean}
 */
function allLetters(str) {
    str = str.replace(/\s/g, '');
    var letters = /^[A-Za-z]+$/g;
    if (str.match(letters)) {
        return true;
    }
}


/**
 * Method to create drop down of nums 1-25
 */
function createDropDown() {
    var openOption = '<option';
    var valueOpen = ' value="';
    var valueClose = '">';
    var closeOption = '</option>';
    var optionList1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
    var optionList2 = ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];

    var options = optionList1.concat(optionList2);

    $('#subSelect').each(function () {
        for (key in options) {
            if (options.hasOwnProperty(key)) {
                $(this).append(openOption + valueOpen + options[key] + valueClose + options[key] + closeOption);
            }
        }
    });
}


/**
 * Method to dynamically create Vigenere table
 */
function makeTable() {
    var abcArray = [];
    abcArray.push([' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    abcArray.push(['A', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    abcArray.push(['B', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']);
    abcArray.push(['C', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B']);
    abcArray.push(['D', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C']);
    abcArray.push(['E', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D']);
    abcArray.push(['F', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E']);
    abcArray.push(['G', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F']);
    abcArray.push(['H', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
    abcArray.push(['I', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    abcArray.push(['J', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
    abcArray.push(['K', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
    abcArray.push(['L', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
    abcArray.push(['M', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']);
    abcArray.push(['N', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']);
    abcArray.push(['O', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']);
    abcArray.push(['P', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']);
    abcArray.push(['Q', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']);
    abcArray.push(['R', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
    abcArray.push(['S', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']);
    abcArray.push(['T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S']);
    abcArray.push(['U', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']);
    abcArray.push(['V', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']);
    abcArray.push(['W', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']);
    abcArray.push(['X', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']);
    abcArray.push(['Y', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X']);
    abcArray.push(['Z', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']);

    var table = document.createElement('table');
    table.className = 'center-table';

    var columnCount = abcArray[0].length;

    var row = table.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement('td');
        headerCell.innerHTML = abcArray[0][i];
        row.appendChild(headerCell);
    }


    for (var j = 1; j < abcArray.length; j++) {
        row = table.insertRow(-1);
        for (var k = 0; k < columnCount; k++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = abcArray[j][k];
        }
    }

    var divTable = document.getElementById('tableresult');
    //divTable.innerHTML = "";
    divTable.appendChild(table);

}


/**
 *  Method to display new header ever n seconds
 */
function recurseHeader() {
    var obj = {
        "sub": [
            {
                title: "Substitution Cipher",
                description: "A Substitution cipher is a method of encoding [substituting] every plaintext character into a ciphertext character"
            }
        ],
        "vig": [
            {
                title: "Vigenère Cipher",
                description: "Vigenère cipher is a method of encoding alphabetic plaintext by using a series of substitution ciphers" +
                " based on the letters of a keyword. It's a form of polyalphabetic substitution."
            }
        ]

    };

    var objKeys = Object.keys(obj);
    var numOfKeys = Object.keys(obj).length;
    var index = 0;

    setInterval(function() {
        //$('#intervalDiv').text(obj[objKeys[index]][0].title + " " + obj[objKeys[index]][0].description);

        $("#title, #description").fadeOut(400, function () {
            $('#title').text(obj[objKeys[index]][0].title).fadeIn(400);
            $('#description').text(obj[objKeys[index]][0].description).fadeIn(400);
        });
        index = (index + 1) % numOfKeys;
    }, 16000); // Every 16 seconds fade out text and fade in new text
}

$(document).ready(function () {

    var arr = ["#f00", "#ff0", "#f0f", "#f66"];


    (function recurse(counter) {
        // get the colour
        var color = arr[counter];
        // animate it
        $('#testInterval').delay('1200').animate({
            backgroundColor: color
        }, 600);
        // delete the value to save memory
        delete arr[counter];
        // add the value at the end of the array
        arr.push(color);
        // run it again for the next number
        setTimeout(function() {
            recurse(counter + 1);
        }, 200);
// start it for the first number.
    })(0);

    recurseHeader();

    /** Nav drop Down toggle */

    var toggle = $('.nav-toggle');
    var menu = $('#nav-menu');

    $(toggle).on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('is-active');
        menu.toggleClass('is-active');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav').length) {
            if (menu.is(":visible") && menu.hasClass('is-active')) {
                $(menu).toggleClass('is-active');
                $(toggle).toggleClass('is-active');
            }
        }
    });
    /** End Drop Down Nav functionality **/


    // Dynamically creates select dd options
    createDropDown();

    setTimeout(function () {
        typeOut();
    }, 1000);

    setTimeout(function () {
        setInterval(cursorBlink, 1750);
    }, 2750);

    $('#progbar').hide();


    scroll();    // Scroll animation function
    alerts();    // Alert Function
    modals();    // Modal Function
    keyBlock();  // Key Block Change function - changes keys grid
    screenChange(); // Screen size change

    // On text area focus add animation class to notifcation alert
    $('#enText').on('focus', function () {
        $('#notify').addClass('flash');
    });


    // in text area - on change validate whether anything has been entered by the user
    $('#enText').keyup(function () {
        if ($(this) > '0') {
            $(this).removeClass('is-danger');
            // Text Warning
            $('.h-text').css('visibility', 'hidden');
            // Text icon warning
            $('.t-warn').css('visibility', 'hidden');
        }
    });

    // TODO On keyup if there are numbers still in input keep warning /error messages
    $('#vigenereKey').keyup(function () {
        if ($(this) > '0' || ($(this) > '0' && allLetters($(this).val()))) {
            $(this).removeClass('is-danger');
            // vigenere text warning
            $('.v-text').css('visibility', 'hidden');
            // icon warning
            $('.v-warn').css('visibility', 'hidden');
        }
    });

    // Text
    var s = document.getElementById('enText');

    // Textarea to display encrypted/decrypted message
    var textDisplayMsg = document.getElementById('msgdisplay');


    $('#encryptMessage').on('click', function () {
        var encrypt = true;

        // Checks to make sure cipher dd is selected
        if (document.getElementById('cipherSelect').value === "none") {
            var cipherDDL = $('#cipherSelect');
            // Add red border class
            cipherDDL.addClass('is-danger');
            // Select DD text warning
            $('.h-select').css("visibility", "visible");
            // Select DD icon warning
            $('.s-warn').css('visibility', 'visible');
        }
        else if (document.getElementById('cipherSelect').value === 'vigenere' && document.getElementById('vigenereKey').value.length <= 0) {
            document.getElementById('v-err-text').innerHTML = "You must enter a key <i class='fa fa-warning v-warn'></i>";

            // vigenere input warning
            $('.v-text').css('visibility', 'visible');
            // icon warning
            $('.v-warn').css('visibility', 'visible');
            // Add danger class to input field
            $('#vigenereKey').addClass('is-danger');


        } else if (document.getElementById('cipherSelect').value === 'vigenere' && document.getElementById('vigenereKey').value.length > 0 && !allLetters(document.getElementById('vigenereKey').value)) {
            //alert("working");
            document.getElementById('v-err-text').innerHTML = "You must enter only letters <i class='fa fa-warning v-warn'></i>";

            // vigenere input warning
            $('.v-text').css('visibility', 'visible');
            // icon warning
            $('.v-warn').css('visibility', 'visible');
            // Add danger class to input field
            $('#vigenereKey').addClass('is-danger');
        }
        // Checks to make sure textarea has text
        else if (document.getElementById('enText').value < '0') {
            // alert("Text area is empty!");
            var txtArea = $('#enText');
            // Add red border class
            txtArea.addClass('is-danger');
            // Text Warning
            $('.h-text').css('visibility', 'visible');
            // Text icon warning
            $('.t-warn').css('visibility', 'visible');

        }
        // If textarea has text do....
        else if (document.getElementById('enText') >= '1') {
            var cipherSelected = document.getElementById('cipherSelect').value;

            if (cipherSelected == 'caesar' || cipherSelected == 'substitution' || cipherSelected == 'rot13') {
                loader();
                textDisplayMsg.value = caesarCipher(document.getElementById('enText').value, parseInt(document.getElementById('subSelect').value), encrypt);

            } else if (cipherSelected == 'vigenere') {
                loader();
                var vkey = document.getElementById('vigenereKey').value;
                vkey = vkey.replace(/\s/g, '');

                textDisplayMsg.value = vigenereCipher(document.getElementById('enText').value, vkey, encrypt);
            }

        }


        // TODO: If user enters text before selecting a cipher, keep text in textarea rather than clear
        // TODO: Use counter to stop clearing of substitution rotation and cipher drop downs if user has not run program


    });


    $('#decryptMessage').on('click', function () {
        var encrypt = false;

        // Checks to make sure cipher dd is selected
        if (document.getElementById('cipherSelect').value === "none") {
            var cipherDDL = $('#cipherSelect');
            // Add red border class
            cipherDDL.addClass('is-danger');
            // Select DD text warning
            $('.h-select').css("visibility", "visible");
            // Select DD icon warning
            $('.s-warn').css('visibility', 'visible');
        }
        // Checks to make sure textarea has text
        else if (document.getElementById('enText').value < '0') {
            // alert("Text area is empty!");
            var txtArea = $('#enText');
            // Add red border class
            txtArea.addClass('is-danger');
            // Text Warning
            $('.h-text').css('visibility', 'visible');
            // Text icon warning
            $('.t-warn').css('visibility', 'visible');

        }
        // If textarea has text do....
        else if (document.getElementById('enText') >= '1') {
            var cipherSelected = document.getElementById('cipherSelect').value;

            if (cipherSelected == 'caesar' || cipherSelected == 'substitution' || cipherSelected == 'rot13') {
                loader();
                textDisplayMsg.value = caesarCipher(document.getElementById('enText').value, parseInt(document.getElementById('subSelect').value), encrypt);

            } else if (cipherSelected == 'vigenere') {
                loader();
                var vkey = document.getElementById('vigenereKey').value;
                vkey = vkey.replace(/\s/g, '');
                textDisplayMsg.value = vigenereCipher(document.getElementById('enText').value, vkey, encrypt);


            }
        }

        // TODO: If user enters text before selecting a cipher, keep text in textarea rather than clear
        // TODO: Use counter to stop clearing of substitution rotation and cipher drop downs if user has not run program


    });


    // On cancel click - clear all selected elements + textarea
    $('#clearCancel').on('click', function () {
        $('#subSelect').val('none');
        $('#cipherSelect').val('none');
        $('#enText').val(''); // clear current text in cipher key block
        $('#msgdisplay').val(''); // clear the encrypted/decrypt message display field
        $('#vigenereKey').val('');
    });


});