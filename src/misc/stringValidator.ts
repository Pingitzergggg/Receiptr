import CurrencyCodes from "./CurrencyCodes.json" assert {type: 'json'};

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

function onlyContainsNumbers(input : string) : boolean {
    const inputArr = input.split('');
    for (let i of inputArr) {
        const currentAscii = i.charCodeAt(0);
        if (!(currentAscii >= 48 && currentAscii <= 57)) {
            return false
        }
    }
    return true;
}

export function checkInjection(input : string) : boolean {
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
    input = stringNormalize(input);
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
                    throw 'Field must contain numbers only!';
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
    input = stringNormalize(input);
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

function cardNumberValidator(input : string) : boolean {
    if (checkInjection(input)) {
        const inputArr = input.split('');
        if (onlyContainsNumbers(input)) {
            if (inputArr.length % 4 === 0) {
                return true;
            } else {
                throw 'Field length not sufficient!';
            }
        } else {
            throw 'Field must contain numbers only!';
        }
    } else {
        return false;
    }
}

function expiryDateValidator(input : string) : boolean {
    if (checkInjection(input)) {
        const inputArr = input.split('');
        if (inputArr.includes('/')) {
            const currentDate = new Date;
            const month = Number(inputArr.join('').split('/')[0]);
            const year = Number(inputArr.join('').split('/')[1]);
    
            if (isNaN(month) || isNaN(year)) {
                throw 'Invalid character!';
            } else {
                if (month > 12 || month < 1) {
                    throw 'Invalid month!';
                } else if (Number('20'+year) < currentDate.getFullYear() || (Number('20'+year) == currentDate.getFullYear() && month <= currentDate.getMonth() + 1)) {
                    throw 'Card expired!'
                } else {
                    return true;
                }
            }
        } else {
            throw 'Enter valid format!';
        }
    } else {
        return false;
    }
}

function cvcValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (onlyContainsNumbers(input)) {
            if (input.length != 3) {
                throw 'Enter valid format!'
            } else {
                return true;
            }
        } else {
            throw 'Enter valid format!'
        }
    } else {
        return false;
    }
}

function priceValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (/^[0-9]*[.]?[0-9]+$/.test(input)) return true;
        throw "Enter valid format!"
    } else {
        return false;
    }
}

function currencyValidator(input : string) : boolean {
    if (checkInjection(input)) {
        type codeType = {
                    cc : string,
                    symbol : string,
                    name : string
        };
        const codes : codeType[] = CurrencyCodes;
        for (let i = 0; i < codes.length; i++) {
            if (codes[i].cc === input.toUpperCase()) return true;
        }
        throw "Code not valid!";
    } else {
        return false;
    }
}

function dateValidator(input : string) : boolean {
    const date : Date = new Date(input);
    const stripper : RegExp = /[12][0-9]{3}-[10][0-9]-[1230][0-9]/;
    const stringDate : string = date.toISOString();
    const now : Date = new Date;
    if (date > now) throw "Invalid date!";
    if (!stringDate.match(stripper)) throw "Invalid format!";
    if (checkInjection(stringDate.match(stripper)![0])) {
        return true;
    } else {
        return false;
    }
}

function colorValidator(input : string) : boolean {
    if (checkInjection(input)) {
        const hexaChecker : RegExp = /^#[a-fA-F0-9]{6}$/;
        if (hexaChecker.test(input)) return true;
        throw "Invalid format!";
    } else {
        return false;
    }
}

export type inputType = "NAME" | "EMAIL" | "TEL" | "PASSWORD" | "CARD" | "EXPIRY" | "CVC" | "PRICE" | "CURRENCY" | "CREATION" | "COLOR";
export function stringValidate(command : inputType, input : string) : boolean {
    switch (command) {
        case "NAME":
            return nameValidator(input);
        case "EMAIL":
            return mailValidator(input);
        case "TEL":
            return phoneValidator(input);
        case "PASSWORD":
            return passwordValidator(input);
        case "CARD":
            return cardNumberValidator(input);
        case "EXPIRY":
            return expiryDateValidator(input);
        case "CVC":
            return cvcValidator(input);
        case "PRICE":
            return priceValidator(input);
        case "CURRENCY":
            return currencyValidator(input);
        case "CREATION":
            return dateValidator(input);
        case "COLOR":
            return colorValidator(input);
        default:
            throw 'You must provide a command type!';
    }
}