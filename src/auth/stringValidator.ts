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

function checkInjection(input : string) : boolean {
    if (input.includes(' ') || input.includes(';')) {
        return true;
    } else {
        return false;
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
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}