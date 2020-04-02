/**全局配置 */
const BASE_URL = "http://localhost:5500/";

/**初始化 */
$(document).ready(function () {
    $.init();
});

/**获取url参数的方法*/
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

// 获取url的参数
let params = getUrlVars()
let uid = decodeURI(params.uid)
let status = decodeURI(params.status)
let itemStatus = decodeURI(params.itemStatus)
let classStatus = decodeURI(params.classStatus)
// console.log(params)
// console.log(status)
// console.log(itemStatus)

/**返回上一页 */
$('#backIndex').click(function(){
    window.history.go(-1)
})

/**业务逻辑代码 */
// 跳转到班级详情
function classDetail(val) {
  if(val === '0') {
    window.location.href=`./classDetail.html?uid=0&status=爱华学校${status}&itemStatus=${status}`
  }else if(val === '1') {
    window.location.href=`./classDetail.html?uid=1&status=爱华学校${status}&itemStatus=${status}`
  }else if(val === '2'){
    window.location.href=`./classDetail.html?uid=2&status=爱华学校${status}&itemStatus=${status}`
  }else {
      window.location.href=`./classDetail.html?uid=3&status=爱华学校${status}&itemStatus=${status}`
  }
}
// 跳转到人员详情
function peopelDetail(val) {
  if(val === '0') {
    window.location.href=`./peopelDetail.html?uid=0&classStatus=爱华实验学校一年级一班${itemStatus}`
  }else if(val === '1') {
    window.location.href=`./peopelDetail.html?uid=1&classStatus=爱华学校二年级一班${itemStatus}`
  }else if(val === '2'){
    window.location.href=`./peopelDetail.html?uid=2&classStatus=爱华学校二年级二班${itemStatus}`
  }else {
      window.location.href=`./peopelDetail.html?uid=3&classStatus=爱华学校三年级三班${itemStatus}`
  }
}

/**无限滚动 */
// 加载flag
let loading = false;
// 最多可加载的条目
let maxItems = 100;
// 每次加载添加多少条目
let itemsPerLoad = 20;
function addItems(peopelData) {
        // 生成新条目的HTML
        let html = '';
        for (let i = 0; i < peopelData.length; i++) {
            html +=  '<li class="item-content">'
            html +=    '<div class="item-media"><i class="icon icon-f7"></i></div>'
            html +=    '<div class="item-inner">'
            html +=      '<div class="item-title">' + peopelData[i].name + '</div>'
            html +=      '<div class="item-title">' + peopelData[i].date + '</div>'
            if(peopelData[i].tiwen > 38) {
              html +=      '<div class="item-after redColor">' + peopelData[i].tiwen + '℃' + '</div>'
            }else {
              html +=      '<div class="item-after blackColor">' + peopelData[i].tiwen + '℃' + '</div>'
            }
            html +=    '</div>'
            html +=  '</li>'
        }
        // 添加新条目
        $('.ui-content').append(html);
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
    // loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
        // 重置加载flag
        loading = false;
        if (lastIndex <= maxItems) {
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            $.detachInfiniteScroll($('.infinite-scroll'));
            // 删除加载提示符
            $('.infinite-scroll-preloader').remove();
            return;
        }
        // 添加新条目
        addItems(itemsPerLoad, lastIndex);
        // 更新最后加载的序号
        lastIndex = $('.item-content').length;
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller();
    }, 1000);
});

/**-------------------------------------------------------------------------------------------------- */


/**ajax请求代码 */
function getData() {
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    data: {
      uid: '3',
      status: '3',
    },
    url: BASE_URL + "api/detail",
    success: function(data){
      $.hidePreloader();
      let { uid, peopelData } = data
      if(uid !== '3') {
        $('.index2').hide()
        $('.index1').show()
      }else {
        $('.index1').hide()
        $('.index2').show()
        addItems(peopelData)
      }
    },
    error: function(){
      console.log("发送失败");
      $.hidePreloader();
    }
  })
};
getData();