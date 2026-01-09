function colorValidator(input) {
    if (true) {
        const hexaChecker = /^#[a-fA-F0-9]{6}$/;
        if (hexaChecker.test(input)) return true;
        throw "Invalid format!";
    } else {
        return false;
    }
}

console.log(colorValidator("#025368"))