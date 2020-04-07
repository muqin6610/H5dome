/**页面组件初始化 */

// 获取当天日期
let date = new Date();
let year = date.getFullYear();
let month = ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1));
let day = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
let today = year + '-' + month + '-' + day;

/**教育局和校长相关组件 */
$("#input-director")[0].value = today; // 默认今日日期
$("#input-director").calendar({ // 初始化日历组件
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(directorDate, directorPeriod, directorDepart);
      directorDate = displayValues[0]
      // 判断第一次打开是否为时间戳(number类型)
      if (typeof values[0] === 'number') {
　　  　　getData(directorDate, directorPeriod, directorDepart);
　　  };
    },
});

$("#input-directorTab")[0].value = today; // 默认今日日期
$("#input-directorTab").calendar({ // 初始化日历组件
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(displayValues);
      directorTabDate = displayValues[0]
      // 判断第一次打开是否为时间戳(number类型)
      if (typeof values[0] === 'number') {
　　  　　getDataTab2(directorTabDate, directorTabPeriod, directorTabDepart)
　　  };
    },
});

$("#picker-director").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["AM"], // 设置默认值
          values: ["AM", "PM"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        // console.log(picker.value[0]);
        // console.log(picker.displayValue[0]);
        directorPeriod = picker.value[0]
        getData(directorDate, directorPeriod, directorDepart);
    },
});

$("#picker-directorTab").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["AM"], // 设置默认值
          values: ["AM", "PM"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        // console.log(picker.value[0]);
        // console.log(picker.displayValue[0]);
        directorTabPeriod = picker.value[0];
        getDataTab2(directorTabDate, directorTabPeriod, directorTabDepart)
    },
});

// 获取部门数据
function getDepartData(username, orgCode, role) { // 教育局和校长的部门数据
  let URL;
  if(role === '教育局管理员') {
    URL = BASE_URL + `/v2/h5PageController/getAllSchool?username=${username}`;
  }else {
    URL = BASE_URL + `/v2/h5PageController/getGradeList?username=${username}`;
  }
  $.ajax({
    type: 'get',
    url: URL,
    success: function(data){
      console.log(data,'depart1111111111')
      let departArr = data.result
      let arrName = ['全部'], arrId = [orgCode]
      if(role === '教育局管理员') {
        for(let i = 0;i < departArr.length;i++) {
          if(arrName.indexOf(departArr[i].departName) === -1) {
            arrName.push(departArr[i].departName)
          }
          if(arrId.indexOf(departArr[i].id) === -1) {
            arrId.push(departArr[i].id)
          }
        }
      }else {
        for(let i = 0;i < departArr.length;i++) {
          if(arrName.indexOf(departArr[i].grade ) === -1) {
            arrName.push(departArr[i].grade )
          }
          if(arrId.indexOf(departArr[i].year) === -1) {
            arrId.push(departArr[i].year)
          }
        }
      }

      $("#select-director").picker({ // 初始化选择组件
          toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
          <h1 class="title" style="color: #FFF">请选择部门</h1>\
          </header>',
          cols: [
            {
                textAlign: 'center',
                value:[orgCode],
                values: arrId,//隐藏值
                displayValues: arrName//显示值
            }
          ],
          formatValue: function (p, values, displayValues) {//自定义方法，用来控制如何显示picker的选中值
              return displayValues[0];
          },
          onClose: function (picker, values, displayValues) {//picker 关闭时的触发动作
              //这里获取关闭时选择的值
              // console.log(picker.value[0])
              // console.log(picker.displayValue[0])
              directorDepart = picker.value[0]
              getData(directorDate, directorPeriod, directorDepart);
          },
      });

      $("#select-directorTab").picker({ // 初始化选择组件
          toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
          <h1 class="title" style="color: #FFF">请选择部门</h1>\
          </header>',
          cols: [
            {
                textAlign: 'center',
                value:[orgCode],
                values: arrId,//隐藏值
                displayValues: arrName//显示值
            }
          ],
          formatValue: function (p, values, displayValues) {//自定义方法，用来控制如何显示picker的选中值
              return displayValues[0];
          },
          onClose: function (picker, values, displayValues) {//picker 关闭时的触发动作
              //这里获取关闭时选择的值
              // console.log(picker.value[0])
              // console.log(picker.displayValue[0])
              directorTabDepart = picker.value[0]
              getDataTab2(directorTabDate, directorTabPeriod, directorTabDepart)
          },
      });

    },
    error: function(){
      console.log("发送失败");
    }
  })
}


function clickPickerDirector() { // 点击图标
  $("#picker-director").click()
};
function clickSelectDirector() { // 点击图标
  $("#select-director").click()
};
function clickPickerDirectorTab() { // 点击图标
  $("#picker-directorTab").click()
};
function clickSelectDirectorTab() { // 点击图标
  $("#select-directorTab").click()
};

/**家长相关组件 */
$("#input-parent")[0].value = today; // 默认今日日期
$("#input-parent").calendar({ // 初始化日历组件
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(displayValues);
      parentDate = displayValues[0]
      // 判断第一次打开是否为时间戳(number类型)
      if (typeof values[0] === 'number') {
　　  　　getStudentTemperatureLog();
　　  };
    },
});

$("#picker-parent").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["AM"], // 设置默认值
          values: ["AM", "PM"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        console.log(picker.value[0]);
        console.log(picker.displayValue[0]);
        parentPeriod = picker.value[0];
        getStudentTemperatureLog();
    },
});

function clickPickerParent() { // 点击图标
  $("#picker-parent").click()
};

/**教师相关组件 */
$("#input-teacher")[0].value = today; // 默认今日日期
$("#input-teacher").calendar({ // 初始化日历组件
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      directorDate = displayValues[0]
      // 判断第一次打开是否为时间戳(number类型)
      if (typeof values[0] === 'number') {
　　  　　getData(directorDate, directorPeriod, directorDepart);
　　  };
    },
});
$("#picker-teacher").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["AM"], // 设置默认值
          values: ["AM", "PM"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        // console.log(picker.value[0]);
        // console.log(picker.displayValue[0]);
        directorPeriod = picker.value[0]
        getData(directorDate, directorPeriod, directorDepart);
    },
});

function getDepartDataTeacher(username, orgCode) { // 教师的部门数据
  $.ajax({
    type: 'get',
    url: BASE_URL + `/v2/h5PageController/getGradeList?username=${username}`,
    success: function(data){
      console.log(data,'教师的部门数据')
      let departArr = data.result
      let arrName = ['全部'], arrId = ['0']
      for(let i = 0;i < departArr.length;i++) {
        if(arrName.indexOf(departArr[i].grade) === -1) {
          arrName.push(departArr[i].grade)
        }
        if(arrId.indexOf(departArr[i].year) === -1) {
          arrId.push(departArr[i].year)
        }
      }
      // $("#select-teacher")[0].value = "全部"; // 默认选择全部
      $("#select-teacher").picker({ // 初始化选择组件
          toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
          <h1 class="title" style="color: #FFF">请选择部门</h1>\
          </header>',
          cols: [
            {
                textAlign: 'center',
                value:["0"],
                values: arrId,//隐藏值
                displayValues: arrName//显示值
            }
          ],
          formatValue: function (p, values, displayValues) {//自定义方法，用来控制如何显示picker的选中值
              return displayValues[0];
          },
          onClose: function (picker, values, displayValues) {//picker 关闭时的触发动作
              //这里获取关闭时选择的值
              console.log(picker.value[0])
              console.log(picker.displayValue[0])
          },
      });
    },
    error: function(){
      console.log("发送失败");
    }
  })
}

function clickSelectTeacher() { // 点击图标
  $("#select-teacher").click()
};
function clickPickerTeacher() { // 点击图标
  $("#picker-teacher").click()
};