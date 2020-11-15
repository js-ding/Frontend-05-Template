function UTF8_Encoding(string) {
    let charList = [];
    for (const s of string) {
        const code = s.charCodeAt();
        charList.push(code);
    }
    return charList;
}

UTF8_Encoding('abc');
