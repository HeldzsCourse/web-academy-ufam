function upper (str) {
    return str.toUpperCase();
};

function lower (str) {
    return str.toLowerCase();
};

function createLink(filename) {
 return `<a href="/${filename}">${filename}</a><br>\n`;
}


module.exports = {
    upper,
    lower,
    createLink
}
