
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.toLowerCase().split(',').map(item => item.trim())
}