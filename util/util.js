const rand = function() {
    return Math.random().toString(36).substring(2); // remove `0.`
};

function getRandomToken() {
    return rand() + rand();
}

module.exports = {
    getRandomToken
}