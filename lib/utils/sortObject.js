module.exports = function sortObject(obj, sortKeys, sortByUnicode) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return
    }
    const result = {};
    if (sortKeys) {
        sortKeys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = obj[key];
                delete obj[key]
            }
        })
    }

    const keys = Object.keys(obj);
    !sortByUnicode && keys.sort();
    keys.forEach(key =>{
        result[key] = obj[key]
    })
    return result;
}