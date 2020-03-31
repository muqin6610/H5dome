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

/**业务逻辑代码 */
// 跳转到详情
function classDetail(val) {
  if(val === '0') {
    window.location.href="./classDetail.html?uid='0'&uername='爱华学校'"
  }else if(val === '1') {
    window.location.href="./classDetail.html?uid='1'&uername='南山学校'"
  }else if(val === '2'){
    window.location.href="./classDetail.html?uid='2'&uername='宝安学校'"
  }else {
      window.location.href="./classDetail.html?uid='3'&uername='兴东学校'"
  }
}
// 跳转到详情
function peopelDetail(val) {
  if(val === '0') {
    window.location.href="./peopelDetail.html?uid='0'&uername='爱华学校'"
  }else if(val === '1') {
    window.location.href="./peopelDetail.html?uid='1'&uername='南山学校'"
  }else if(val === '2'){
    window.location.href="./peopelDetail.html?uid='2'&uername='宝安学校'"
  }else {
      window.location.href="./peopelDetail.html?uid='3'&uername='兴东学校'"
  }
}