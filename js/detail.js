/**全局配置 */
const BASE_URL = "http://192.168.1.68:8240/school";

/**初始化 */
$(document).ready(function () {
    $.init();
});

/**下拉刷新 */
/**添加'refresh'监听器,初始化下拉刷新 */
$(document).on('refresh', '.pull-to-refresh-content',function(e) {
    getData();
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
let status = decodeURI(params.status)
let title = decodeURI(params.title)
let date = decodeURI(params.date)
let timeQuantum = decodeURI(params.timeQuantum)
let departId = decodeURI(params.departId)
let itemTitle = decodeURI(params.itemTitle)
let classStatus = decodeURI(params.classStatus)
let orgCode = decodeURI(params.orgCode)
let departName = decodeURI(params.departName)
let classTitle = decodeURI(params.classTitle)
let type = decodeURI(params.type)
let role = decodeURI(params.role)
let schoolNameStr = decodeURI(params.schoolNameStr)
let titleTwo = decodeURI(params.titleTwo)
let peronId = decodeURI(params.peronId)
// console.log(peronId,'peronId')
// console.log(date,'date')
// console.log(timeQuantum,'timeQuantum')
// console.log(departId,'departId')
// console.log(departName,'departName')
// console.log(classTitle,'classTitle')
// console.log(role,'role')
// console.log(type,'type')
/**返回上一页 */
$('#backIndex').click(function(){
    window.history.go(-1)
})

/**业务逻辑代码 */

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


// 循环出学校数据
function forSchoolData(arr) {
  // console.log(arr,'arr')
  // 生成新条目的HTML
  let html = '';
  for (let i = 0; i < arr.length; i++) {
      html += '<li class="item-content">'
      html +=   '<div class="item-media"><i class="icon icon-f7"></i></div>'
      html +=   '<div class="item-inner" onclick=classDetail(' + JSON.stringify(arr[i])+')>'
      html +=     '<div class="item-title">' + arr[i].departName + '</div>'
      html +=     '<div class="item-after">' + arr[i].count + '<span class="icon icon-right icon-margin"></span></div>'
      html +=   '</div>'
      html += '</li>'
  }
  // 添加新条目
  $('.ui-content').append(html);
}

// 循环出班级数据
function forClassData(arr) {
  // console.log(arr,'arr')
  // 生成新条目的HTML
  let html = '';
  for (let i = 0; i < arr.length; i++) {
      html += '<li class="item-content">'
      html +=   '<div class="item-media"><i class="icon icon-f7"></i></div>'
      html +=   '<div class="item-inner" onclick=peopelDetail(' + JSON.stringify(arr[i])+')>'
      html +=     '<div class="item-title">' + arr[i].gradeName + '</div>'
      html +=     '<div class="item-title">' + arr[i].departName + '</div>'
      html +=     '<div class="item-after">' + arr[i].total + '<span class="icon icon-right icon-margin"></span></div>'
      html +=   '</div>'
      html += '</li>'
  }
  // 添加新条目
  $('.ui-content').append(html);
}

// 循环出人员数据
function forPeopelData(arr) {
  // console.log(arr,'arr')
  if(arr === null) {
    arr = []
  }
  // 生成新条目的HTML
  let html = '';
  for (let i = 0; i < arr.length; i++) {
      html += '<li class="item-content">'
      html +=   '<div class="item-media"><i class="icon icon-f7"></i></div>'
      html +=   '<div class="item-inner">'
      html +=     '<div class="item-title">' + arr[i].realName + '</div>'
      if(arr[i].passTime) {
        html +=     '<div class="item-title">' + arr[i].passTime + '</div>'
      }
      if(arr[i].mappingTemp) {
        if(arr[i].status == '0') {
          html +=     '<div class="item-after blackColor">' + arr[i].mappingTemp + '</div>'
        }else {
          html +=     '<div class="item-after redColor">' + arr[i].mappingTemp + '</div>'
        }
      }
      html +=   '</div>'
      html += '</li>'
  }
  // 添加新条目
  $('.ui-content').append(html);
}

/**-------------------------------------------------------------------------------------------------- */


/**ajax请求代码 */
function getData() { // 获得学校未测温、已测温、体温异常报列表
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getSchoolUnTemperature?status=${status}&date=${date}&timeQuantum=${timeQuantum}&departId=${departId}&type=${type}`,
    success: function(data){
      let schoolArr = data.result
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
      $('.index2').hide()
      $('.index1').show()
      forSchoolData(schoolArr)
    },
    error: function(){
      console.log("发送失败");
      $.toast("加载失败,请返回重试!");
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    }
  })
};

function getGradeUnTemperature() { // 获得学校班级未测温、已测温、体温异常数据统计列表
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getGradeUnTemperature?status=${status}&date=${date}&timeQuantum=${timeQuantum}&orgCode=${orgCode}&type=${type}`,
    success: function(data){
      console.log(data)
      let classArr = data.result
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
      forClassData(classArr)
    },
    error: function(){
      console.log("发送失败");
      $.toast("加载失败,请返回重试!");
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    }
  })
}

function getSchoolClassUnTemperature() { // 获得班级未测温、已测温、体温异常人员列表列表
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getSchoolClassUnTemperature?status=${status}&date=${date}&timeQuantum=${timeQuantum}&orgCode=${orgCode}&type=${type}`,
    success: function(data){
      console.log(data)
      let peopelArr = data.result
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
      forPeopelData(peopelArr)
    },
    error: function(){
      console.log("发送失败");
      $.toast("加载失败,请返回重试!");
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    }
  })
}
function getClassUnTemperatureByTeacher() { // 教师获得班级未测温、已测温、体温异常人员列表报列表
  $.showPreloader();
  //发送异步请求
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getClassUnTemperatureByTeacher?status=${status}&date=${date}&peronId=${peronId}&timeQuantum=${timeQuantum}&type=${type}`,
    success: function(data){
      let peopelArr = data.result
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
      forPeopelData(peopelArr)
    },
    error: function(){
      console.log("发送失败");
      $.toast("加载失败,请返回重试!");
      $.hidePreloader();
      $.pullToRefreshDone('.pull-to-refresh-content');
    }
  })
}

// 跳转到班级详情
function classDetail(data) {
  window.location.href=`./classDetail.html?status=${status}&departName=${data.departName}&title=${data.departName}${title}&itemTitle=${title}&date=${date}&orgCode=${data.orgCode}&timeQuantum=${timeQuantum}&type=${type}`
}
// 跳转到人员详情
function peopelDetail(data) {
  window.location.href=`./peopelDetail.html?status=${status}&role=${role}&peronId=${peronId}&classTitle=${departName}${data.gradeName}${data.departName}${itemTitle}&date=${date}&timeQuantum=${timeQuantum}&orgCode=${data.orgCode}&type=${type}`
}