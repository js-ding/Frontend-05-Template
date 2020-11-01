function kmp(source, pattern) {
    // 计算 table
    let table = new Array(pattern.length).fill(0);

    {
        let i = 1; // 已查
        let j = 0; // 未查
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                i += 1;
                j += 1;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    i += 1;
                }
            }
        }
    }
    // console.log(table);
    // abcdabce
    // aabaaac

    // 匹配
    {
        let i = 0;
        let j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                i += 1;
                j += 1;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    i += 1;
                }
            }

            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
}

console.log(kmp('aabaaac', 'aabaaac'));
