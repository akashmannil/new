let hashing = {};


hashing.hash = function (data) {
    let key = Math.floor(Math.random() * 1000) + 1;
    let subtr = Math.floor(Math.random() * 1000) + 1;
    let count = -1;
    return data.split('').map(() => {
        return Number(subtr - data.charCodeAt(count += 1)) + key + count
    }).join('a') + 'k' + key + 'k' + subtr;
}

module.exports = hashing;