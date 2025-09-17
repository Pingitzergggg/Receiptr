function countChars(input : string, char : string) : number {
    if (char.length != 1) {
        throw 'char length must be 1!';
    }
    const chars : string[] = input.split('');
    let containsChar : boolean = false;
    let countChar : number = 0;
    for (let ch in chars) {
        if (chars[ch] == char) {
            containsChar = true;
            countChar++;
        }
    }

    return countChar;
}

function checkInjection(input : string) : boolean {
    if (input.includes(' ') || input.includes(';')) {
        throw 'Field cannot contain \' \' and \';\' characters!';
    } else {
        return true;
    }
}

export function stringNormalize(input : string) : string {
    const getNFD : string = input.normalize('NFD');
    return getNFD.replace(/[\u0300-\u036f]/g, '');
}

function mailValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (input.length != 0 && input.length <=45) {
            const counter : number = countChars(input, '@');
            if (counter == 1) {
                const domain : string = input.split('@')[1];
                if (countChars(domain, '.') >= 1) {
                    return true;
                } else {
                    throw 'Email format not valid!';
                }
            } else {
                throw 'Email format not valid!';
            }
        } else {
            throw 'Field length is not in supported range!'
        }
    } else {
        return false;
    }
}

//48-57
function phoneValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (4 < input.length && input.length < 16) {
            const digits : string[] = input.split('');
            let currentAscii : number = 0;
            for (let dg in digits) {
                currentAscii = digits[dg].charCodeAt(0);
                if (!(currentAscii >= 48 && currentAscii <= 57)) {
                    throw 'Field must contain ASCII letters only!';
                }
            }
            return true;
        } else {
            throw 'Digit length is not in supported range!';
        } 
    } else {
        return false;
    }
}

//65-90 | 97-122
function nameValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (input.length <= 45 && input.length >= 2) {
            const chars : string[] = input.split('');
            let currentAscii : number = 0;
            for (let ch in chars) {
                currentAscii = chars[ch].charCodeAt(0);
                if (!((currentAscii >= 65 && currentAscii <= 90) || (currentAscii >= 97 && currentAscii <= 122))) {
                    throw 'Field must contain ASCII letters only!';
                }
            }
        return true;
        } else {
            throw 'Field length is not in supported range!';
        }
    } else {
        return false;
    }
}

//32-64, 91-96, 123-126 special chars
function passwordValidator(input : string) : boolean {
    let hasSpecialKey : boolean = false;
    if (checkInjection(input)) {
        if (input.length >= 15 && input.length <=50) {
            const chars : string[] = input.split('');
            let currentAscii : number = 0;
            for (let ch in chars) {
                currentAscii = chars[ch].charCodeAt(0);
                if (currentAscii >= 32 && currentAscii <= 126) {
                    if (!(currentAscii >= 65 && currentAscii <= 90) && !(currentAscii >= 97 && currentAscii <= 122)) {
                        hasSpecialKey = true;
                    }
                } else {
                    throw 'Field must contain ASCII letters only!';
                }
            }
        } else {
            throw 'Password length must be between 15 and 50';
        }
    } else {
        return false;
    }

    if (hasSpecialKey) {
        return hasSpecialKey;
    } else {
        throw 'Password must contain at least one special character or number!'
    }
}

export type inputType = "NAME" | "EMAIL" | "TEL" | "PASSWORD";
export function stringValidate(command : inputType, input : string) : boolean {
    if (command == "NAME") {
        return nameValidator(input);
    } else if (command == "EMAIL") {
        return mailValidator(input);
    } else if (command == "TEL") {
        return phoneValidator(input);
    } else if (command == "PASSWORD") {
        return passwordValidator(input);
    } else {
        throw 'You must provide command type!';
    }
}