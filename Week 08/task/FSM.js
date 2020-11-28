/**
 * 有限状态机
 */

// // ======== 匹配字符 a ============
// function match1(str) {
//     for (const s of str) {
//         if (s === 'a') {
//             return true;
//         };
//     }
//     return false;
// }

// // console.log(match1('abc'));

// // =========== 匹配字符 ab ============
// function match2(str) {
//     let foundA = false;
//     for (const s of str) {
//         if (s === 'a') {
//             foundA = true;
//         } else if (foundA && s === 'b') {
//             return true;
//         } else {
//             foundA = false;
//         }
//     }
//     return false;
// }

// // console.log(match2('acba'));

// // ====== 匹配字符 abcdef ============
// // 非状态机
// function match3(str) {
//     let foundA = false;
//     let foundB = false;
//     let foundC = false;
//     let foundD = false;
//     let foundE = false;
//     for (const s of str) {
//         if (s === 'a') {
//             foundA = true;
//         } else if (foundA && s === 'b') {
//             foundB = true;
//         } else if (foundB && s === 'c') {
//             foundC = true;
//         } else if (foundC && s === 'd') {
//             foundD = true;
//         } else if (foundD && s === 'e') {
//             foundE = true;
//         } else if (foundE && s === 'f') {
//             return true;
//         } else {
//             foundA = false;
//             foundB = false;
//             foundC = false;
//             foundD = false;
//             foundE = false;
//         }
//     }
//     return false;
// }

// /**
//  * 使用状态机处理
//  * 每一个状态是一个独立的机器，互不干扰，在js种可以函数作为状态机
//  */

// function match4(str) {
//     let state = start;
//     for (const s of str) {
//         state = state(s);
//     }
//     return state === end;
// }

// function start(s) {
//     if (s === 'a') {
//         return foundA;
//     }
//     return start;
// }

// function end(s) {
//     return end;
// }

// function foundA(s) {
//     if (s === 'b') {
//         return foundB;
//     }
//     // 如果当前状态未触发下一个状态机，将当前状态作为起始状态机状态触发
//     return start(s);
// }

// function foundB(s) {
//     if (s === 'c') {
//         return foundC;
//     }
//     return start(s);
// }

// function foundC(s) {
//     if (s === 'd') {
//         return foundD;
//     }
//     return start(s);
// }

// function foundD(s) {
//     if (s === 'e') {
//         return foundE;
//     }
//     return start(s);
// }

// function foundE(s) {
//     if (s === 'f') {
//         return end;
//     }
//     return start(s);
// }

// console.log(match4('ababcdef'))

// // ============= 匹配字符 abcabx ===========
// function match5(str) {
//     let state = start;
//     for (const s of str) {
//         state = state(s);
//     }
//     return state === end;
// }

// function start(s) {
//     if (s === 'a') {
//         return foundA1;
//     }
//     return start;
// }

// function end(s) {
//     return end;
// }

// function foundA1(s) {
//     if (s === 'b') {
//         return foundB1;
//     }
//     return start(s);
// }

// function foundB1(s) {
//     if (s === 'c') {
//         return foundC;
//     }
//     return start(s);
// }

// function foundC(s) {
//     if (s === 'a') {
//         return foundA2;
//     }
//     return start(s);
// }

// function foundA2(s) {
//     if (s === 'b') {
//         return foundB2;
//     }
//     return start(s);
// }

// function foundB2(s) {
//     if (s === 'x') {
//         return end;
//     }
//     return foundB1(s);
// }

// console.log(match5('abcabcabx'));

// =========== abababx =============
function match6(str) {
    let state = start;
    for (const s of str) {
        state = state(s);
    }
    return state === end;
}

function start(s) {
    if (s === 'a') {
        return foundA1;
    }
    return start;
}

function end(s) {
    return end;
}

function foundA1(s) {
    if (s === 'b') {
        return foundB1;
    }
    return start(s);
}

function foundB1(s) {
    if (s === 'a') {
        return foundA2;
    }
    return start(s);
}

function foundA2(s) {
    if (s === 'b') {
        return foundB2;
    }
    return start(s);
}

function foundB2(s) {
    if (s === 'a') {
        return foundA3;
    }
    return foundB1(s);
}

function foundA3(s) {
    if (s === 'b') {
        return foundB3;
    }
    return start(s);
}

function foundB3(s) {
    if (s === 'x') {
        return end;
    }
    return foundB2(s);
}

console.log(match6('ababababx'));