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
      console.log(displayValues);
    },
});

$("#input-directorTab")[0].value = today; // 默认今日日期
$("#input-directorTab").calendar({ // 初始化日历组件
    value: [today], // 设置默认值
    dateFormat: 'yyyy-mm-dd', // 日期格式化
    onChange: function(p, values, displayValues){
      console.log(displayValues);
    },
});

// $("#picker-director")[0].value = '上午'; // 默认选择上午
$("#picker-director").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["1"], // 设置默认值
          values: ["1", "2"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        console.log(picker.value[0])
        console.log(picker.displayValue[0])
    },
});

// $("#picker-directorTab")[0].value = '上午'; // 默认选择上午
$("#picker-directorTab").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["1"], // 设置默认值
          values: ["1", "2"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        console.log(picker.value[0])
        console.log(picker.displayValue[0])
    },
});

// $("#select-director")[0].value = "全部"; // 默认选择全部
$("#select-director").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择部门</h1>\
    </header>',
    cols: [
      {
          textAlign: 'center',
          value:["1"],
          values: ["1", "2"],//隐藏值
          displayValues: ["全部", "一年级",]//显示值
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

// $("#select-directorTab")[0].value = "全部"; // 默认选择全部
$("#select-directorTab").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择部门</h1>\
    </header>',
    cols: [
      {
          textAlign: 'center',
          value:["1"],
          values: ["1", "2"],//隐藏值
          displayValues: ["全部", "一年级",]//显示值
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
    },
});

// $("#picker-parent")[0].value = '上午'; // 默认选择上午
$("#picker-parent").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择时间段</h1>\
    </header>', // 设置头部标题
    cols: [
      {
          textAlign: 'center', // 设置文本位置
          value:["1"], // 设置默认值
          values: ["1", "2"], // 隐藏值
          displayValues: ["上午", "下午",] // 显示值
      }
    ],
    formatValue: function (p, values, displayValues) {// 自定义方法，用来控制如何显示picker的选中值
        return displayValues[0];
    },
    onClose: function (picker, values, displayValues) {// picker 关闭时的触发动作
        //这里获取关闭时选择的值
        console.log(picker.value[0])
        console.log(picker.displayValue[0])
    },
});

function clickSelectParent() { // 点击图标
  $("#select-parent").click()
};
function clickPickerParent() { // 点击图标
  $("#picker-parent").click()
};

/**教师相关组件 */
// $("#select-teacher")[0].value = "全部"; // 默认选择全部
$("#select-teacher").picker({ // 初始化选择组件
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker" style="color: #FFF;margin-top: .4rem;">确定</button>\
    <h1 class="title" style="color: #FFF">请选择部门</h1>\
    </header>',
    cols: [
      {
          textAlign: 'center',
          value:["1"],
          values: ["1", "2"],//隐藏值
          displayValues: ["全部", "一年级",]//显示值
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

function clickSelectTeacher() { // 点击图标
  $("#select-teacher").click()
};
function clickPickerTeacher() { // 点击图标
  $("#picker-teacher").click()
};