/**
 * Test Page for encrypt decrypt
 */


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

console.log("key 1");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 1, true));
console.log("Decrypting....");
console.log(caesarCipher("bcdefghijklmnopqrstuvwxyza", 1, false));

console.log("");

console.log("key 2");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 2, true));
console.log("Decrypting....");
console.log(caesarCipher("cdefghijklmnopqrstuvwxyzab", 2, false));

console.log("");

console.log("key 3");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 3, true));
console.log("Decrypting....");
console.log(caesarCipher("defghijklmnopqrstuvwxyzabc", 3, false));

console.log("");

console.log("key 4");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 4, true));
console.log("Decrypting....");
console.log(caesarCipher("efghijklmnopqrstuvwxyzabcd", 4, false));

console.log("");

console.log("key 5");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 5, true));
console.log("Decrypting....");
console.log(caesarCipher("fghijklmnopqrstuvwxyzabcde", 5, false));

console.log("");

console.log("key 6");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 6, true));
console.log("Decrypting....");
console.log(caesarCipher("ghijklmnopqrstuvwxyzabcdef", 6, false));


console.log("");

console.log("key 7");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 7, true));
console.log("Decrypting....");
console.log(caesarCipher("hijklmnopqrstuvwxyzabcdefg", 7, false));

console.log("");

console.log("key 8");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 8, true));
console.log("Decrypting....");
console.log(caesarCipher("ijklmnopqrstuvwxyzabcdefgh", 8, false));

console.log("");

console.log("key 9");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 9, true));
console.log("Decrypting....");
console.log(caesarCipher("jklmnopqrstuvwxyzabcdefghi", 9, false));

console.log("");

console.log("key 10");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 10, true));
console.log("Decrypting....");
console.log(caesarCipher("klmnopqrstuvwxyzabcdefghij", 10, false));

console.log("");

console.log("key 11");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 11, true));
console.log("Decrypting....");
console.log(caesarCipher("lmnopqrstuvwxyzabcdefghijk", 11, false));

console.log("");

console.log("key 12");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 12, true));
console.log("Decrypting....");
console.log(caesarCipher("mnopqrstuvwxyzabcdefghijkl", 12, false));

console.log("");

console.log("key 13");
console.log(caesarCipher("abcdefghijklmnopqrstuvwxyz", 13, true));
console.log("Decrypting....");
console.log(caesarCipher("nopqrstuvwxyzabcdefghijklm", 13, false));

console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");

console.log("key 1");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1, true));
console.log("Decrypting....");
console.log(caesarCipher("BCDEFGHIJKLMNOPQRSTUVWXYZA", 1, false));

console.log("");

console.log("key 2");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2, true));
console.log("Decrypting....");
console.log(caesarCipher("CDEFGHIJKLMNOPQRSTUVWXYZAB", 2, false));

console.log("");

console.log("key 3");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 3, true));
console.log("Decrypting....");
console.log(caesarCipher("DEFGHIJKLMNOPQRSTUVWXYZABC", 3, false));

console.log("");

console.log("key 4");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4, true));
console.log("Decrypting....");
console.log(caesarCipher("EFGHIJKLMNOPQRSTUVWXYZABCD", 4, false));

console.log("");

console.log("key 5");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5, true));
console.log("Decrypting....");
console.log(caesarCipher("FGHIJKLMNOPQRSTUVWXYZABCDE", 5, false));

console.log("");

console.log("key 6");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6, true));
console.log("Decrypting....");
console.log(caesarCipher("GHIJKLMNOPQRSTUVWXYZABCDEF", 6, false));


console.log("");

console.log("key 7");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 7, true));
console.log("Decrypting....");
console.log(caesarCipher("HIJKLMNOPQRSTUVWXYZABCDEFG", 7, false));

console.log("");

console.log("key 8");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8, true));
console.log("Decrypting....");
console.log(caesarCipher("IJKLMNOPQRSTUVWXYZABCDEFGH", 8, false));

console.log("");

console.log("key 9");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 9, true));
console.log("Decrypting....");
console.log(caesarCipher("JKLMNOPQRSTUVWXYZABCDEFGHI", 9, false));

console.log("");

console.log("key 10");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10, true));
console.log("Decrypting....");
console.log(caesarCipher("KLMNOPQRSTUVWXYZABCDEFGHIJ", 10, false));

console.log("");

console.log("key 11");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 11, true));
console.log("Decrypting....");
console.log(caesarCipher("LMNOPQRSTUVWXYZABCDEFGHIJK", 11, false));

console.log("");

console.log("key 12");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 12, true));
console.log("Decrypting....");
console.log(caesarCipher("MNOPQRSTUVWXYZABCDEFGHIJKL", 12, false));

console.log("");

console.log("key 13");
console.log(caesarCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 13, true));
console.log("Decrypting....");
console.log(caesarCipher("NOPQRSTUVWXYZABCDEFGHIJKLM", 13, false));

console.log("\n\n");

console.log("*****   VIGENER CIPHER *****")
console.log("Key boom");
console.log(vigenereCipher("The crow flies at midnight", "boom", true));
console.log("Decrypting....");
console.log(vigenereCipher("Uvs osck rmwse bh auebwsih", "boom", false));