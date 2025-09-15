function countChars(input : string, char : string) : number {
    if (char.length != 1) {
        throw 'char length must be 1!';
    }
    const chars : string[] = input.split('');
    let containsChar : boolean = false;
    let countChar : number = 0;
    for (let ch in chars) {
        if (ch == char) {
            containsChar = true;
            countChar++;
        }
    }

    return countChar;
}

function stringNormalize(input : string) : string {
    const getNFD : string = input.normalize('NFD');
    return getNFD.replace(/[\u0300-\u036f]/g, '');
}

function checkInjection(input : string) : boolean {
    if (input.includes(' ') || input.includes(';')) {
        return true;
    } else {
        throw 'Field cannot contain \' \' and \';\' characters!';
    }
}

function mailValidator(input : string) : boolean {
    if (checkInjection(input)) {
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
        return false;
    }
}

function phoneValidator(input : string) : boolean {
    if (4 < input.length && input.length < 16) {
        const digits : unknown[] = input.split('');
        let convertedNumber : number = 0;
        for (let digit in digits) {
            convertedNumber= digits[digit] as number;
            if (convertedNumber != convertedNumber + 0) {
                throw 'Phone should only contain numbers!';
            }
        }
        return true;
    } else {
        throw 'Digit length is not in supported range!';
    }
}

//65-90 | 97-122
function nameValidator(input : string) : boolean {
    if (checkInjection(input)) {
        if (input.length <= 45) {
            const chars : unknown[] = input.split('');
            for (let ch in chars) {
                if 
            }
        return true;
        } else {
            throw 'Field length exceeds limit!'
        }
    } else {
        return false;
    }
}