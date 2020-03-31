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
// 跳转到班级详情
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
// 跳转到人员详情
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

// 无限滚动
// 加载flag
let loading = false;
// 最多可加载的条目
let maxItems = 100;
// 每次加载添加多少条目
let itemsPerLoad = 20;
function addItems(number, lastIndex) {
        // 生成新条目的HTML
        let html = '';
        for (let i = lastIndex + 1; i <= lastIndex + number; i++) {
            html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
        }
        // 添加新条目
        $('.infinite-scroll-bottom .list-container').append(html);
    }
    //预先加载20条
addItems(itemsPerLoad, 0);
// 上次加载的序号
let lastIndex = 20;
// 注册'infinite'事件处理函数
$(document).on('infinite', '.infinite-scroll-bottom',function() {
    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex >= maxItems) {
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            $.detachInfiniteScroll($('.infinite-scroll'));
            // 删除加载提示符
            $('.infinite-scroll-preloader').remove();
            return;
        }
        // 添加新条目
        addItems(itemsPerLoad, lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.list-container li').length;
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller();
    }, 1000);
});