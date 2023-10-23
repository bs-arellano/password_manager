// Define the input data
const texts = [];
const specialchars = ["@", "$", "!", "#", "%", "&", "(", ")", "0", "3", "8", "<", "|"];
const punctuation = ["<§>", "*", "+", "-", ":", "\"", "/", "\\", "~", "?", "[", "]", "{", "}", "$", "!", "#", "%", "&", "(", ")", "_", "<", "|"];
const numbers = [0, 1];

// Define a function to capitalize some letters randomly
function capitalizeRandomly(input) {
    const letters = input.split('');
    for (let i = 0; i < letters.length; i++) {
        if (Math.random() < 0.5) {
            letters[i] = letters[i].toUpperCase();
        }
    }
    return letters.join('');
}

function generarStringAleatorio(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
}

// Define a function to generate a random password
function generateRandomPassword() {
    const string1 = texts[Math.floor(Math.random() * texts.length)];
    const string2 = texts[Math.floor(Math.random() * texts.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];

    let finalString = string1 + string2;

    finalString = capitalizeRandomly(finalString);

    // Replace alphabets with special characters
    const alphabets = ['a', 's', 'i', 'r', 'x', 'q', 'c', 'j', 'o', 'e', 'b', 'k', '1'];
    for (const letter of alphabets) {
        const randomSpecialChar = specialchars[Math.floor(Math.random() * specialchars.length)];
        finalString = finalString.replace(new RegExp(letter, 'g'), randomSpecialChar);
    }

    // Randomly insert the number
    const position = Math.floor(Math.random() * 3); // 0: beginning, 1: middle, 2: end
    if (position === 0) {
        finalString = number + finalString;
    } else if (position === 1) {
        const middle = Math.floor(finalString.length / 2);
        finalString = finalString.slice(0, middle) + number + finalString.slice(middle);
    } else {
        finalString = finalString + number;
    }

    // Append a random special character from punctuation
    const randomPunctuation = punctuation[Math.floor(Math.random() * punctuation.length)];
    finalString += randomPunctuation;

    const length = finalString.length;

    // Ensure the password length is at least 8 characters
    if (length < 8) {
        const diff = 8 - length;
        for (let i = 0; i < diff; i++) {
            const randomSpecialChar = specialchars[Math.floor(Math.random() * specialchars.length)];
            finalString += randomSpecialChar;
        }
    }

    return finalString;
}

const utils = {
    passwordGenerator: (req, res) => {
        for (var i = 0; i < 10; i++) {
            texts.push(generarStringAleatorio(20))
        }
        const { len, upper, special_chars } = req.body;
        let generated_password = ''
        let valide = true
        do {
            generated_password += generateRandomPassword();
            if (!upper) {
                generated_password = generated_password.replace(/[A-Z]/g, '');
            } else {
                if (!/[A-Z]/.test(generated_password)) {
                    valide = false;
                }
            }
            if (!special_chars) {
                for (var i = 0; i < specialchars.length; i++) {
                    var caracter = specialchars[i];
                    generated_password = generated_password.split(caracter).join('');
                }
            } else {
                for (var i = 0; i < specialchars.length; i++) {
                    var caracter = specialchars[i];
                    if (!generated_password.includes(caracter)) {
                        valide = false;
                        break;
                    }
                }
            }
        } while (generated_password.length < len && valide)
        if (generated_password.length > len) {
            generated_password = generated_password.slice(0, len)
        }
        res.status(200).json({ generated_password })
    }
}

module.exports = utils