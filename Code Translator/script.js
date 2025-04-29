function generateCode() {
    const codeType = document.getElementById("codeType").value;
    const text = document.getElementById("text").value;
    let result = "";

    switch (codeType) {
        case "morse":
            result = textToMorse(text);
            break;
        case "rot13":
            result = rot13(text);
            break;
        case "tapcode":
            result = textToTapCode(text);
            break;
        default:
            result = "Invalid code type";
    }

    document.getElementById("result").textContent = result;
}

function textToMorse(text) {
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '0': '-----', ' ': ':'
    };

    const sanitizedText = text.toUpperCase();
    let morseCode = '';
    for (let i = 0; i < sanitizedText.length; i++) {
        const char = sanitizedText[i];
        if (morseCodeMap[char]) {
            morseCode += morseCodeMap[char] + ' / ';
        }
    }
    return morseCode;
}

function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
        const offset = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - offset + 13) % 26 + offset);
    });
}

function textToTapCode(text) {
    const tapCodeMap = {
        'A': '1 1', 'B': '1 2', 'C': '1 3', 'K': '1 3', 'D': '1 4', 'E': '1 5',
        'F': '2 1', 'G': '2 2', 'H': '2 3', 'I': '2 4', 'J': '2 5',
        'L': '3 1', 'M': '3 2', 'N': '3 3', 'O': '3 4', 'P': '3 5',
        'Q': '4 1', 'R': '4 2', 'S': '4 3', 'T': '4 4', 'U': '4 5',
        'V': '5 1', 'W': '5 2', 'X': '5 3', 'Y': '5 4', 'Z': '5 5',
        ' ': ':'
    };

    const sanitizedText = text.toUpperCase();
    let tapCode = '';
    for (let i = 0; i < sanitizedText.length; i++) {
        const char = sanitizedText[i];
        if (tapCodeMap[char]) {
            tapCode += tapCodeMap[char] + '/';
        }
    }
    return tapCode;
}

function copyToClipboard() {
    let text = document.querySelector('#result').innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copied to clipboard!");
        })
        .catch((error) => {
            console.error("Copy failed:", error);
        });
     }