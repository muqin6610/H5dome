/**过去url参数的方法*/
function getUrlVars() {
    let vars = [], hash
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    for (let i = 0; i < hashes.length; i++) {
         hash = hashes[i].split('=')
         vars.push(hash[0])
         vars[hash[0]] = hash[1]
    }
    return vars
} 