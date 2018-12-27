// pages/openPage/openPage.js
//首先引入wxcharts.js插件
var wxCharts = require("../../utils/wxCharts.js");
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 屏幕宽度
        this.setData({
            imageWidth: wx.getSystemInfoSync().windowWidth
        });
        console.log(this.data.imageWidth)

        // 计算屏幕宽度比例
        windowW = this.data.imageWidth / 375;
        console.log(windowW)
    },  

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        new wxCharts({
            animation: true, // 是否有动画
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name:'成交量1',
                data: 15,
            },{
                name:'成交量2',
                data: 35
            },{
                name:'成交量3',
                data: 50
            }],
            width:(375*windowW),
            height: (250*windowW),
            dataLabel: true
        });

        // 环形
        new wxCharts({
            animation:true,
            canvasId: 'rangCanvas',
            type: 'ring',
            extra:{
                ringWidth: 25,
                pie:{
                    offsetAngle: -45
                }
            },
            title:{
                name: '70%',
                color: '#7cb5ec',
                fontSize:  15
            },
            subtitle: {
                name: '收益率',
                color: '#666',
                fontSize: 15
            },
            series: [{
                name: '成交量1',
                data: 15,
                stroke: false
            },{
                    name: '成交量2',
                    data: 35,
                    stroke: false
                }, {
                    name: '成交量3',
                    data: 78,
                    stroke: false
                }, {
                    name: '成交量4',
                    data: 28,
                    stroke: false
                }],
                disablePieStroke:true,
                width: (375*windowW),
                height: (200*windowW),
                dataLabel: false,
                legend: false,
                padding:0
        });

        //折线
        new wxCharts({
            animation:true,
            canvasId: 'lineCanvas',
            type:'line',
            categories:  ['2016.01','2017.01','2018.01','2019.01','2020.01','2030.01'],
            background: '#f5f5f5',
            series:[{
                name:'成交量1',
                data: [16, 12, 15, 17, 20,21],
                format:function(val,name) {
                    return val.toFixed(2) +'万'
                }
            },
            {
                    name: '成交量2',
                    data: [6, 3, null, 6, 7,5],
                    format: function (val, name) {
                        return val.toFixed(2) + '万'
                    }
            },
            {
                    name: '成交量2',
                    data: [2, 0, 1, 5, 7,6],
                    format: function (val, name) {
                        return val.toFixed(2) + '万'
                    }
            }],
            xAxis: {
                disableGrid:true
            },
            yAxis:{
                title: '成交金额（万元）',
                format:function(val){
                    return val.toFixed(2)
                },
                
                min:0,
            },
            width: (375*windowW),
            height:(200*windowW),
            dataLabel: true,
            extra:{
                lineStyle:'carve'
            }
        });

        //columnCanvas
        new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: [2001, 2002, 2003, 2004, 2005],
            series: [{
                name: '成交量',
                data: [15.00, 20.00, 45.00, 37.00],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '成交量',
                data: [6.00, 9.00, 20.00, 45.00],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '万';
                },
                title: 'hello',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: (375 * windowW),
            height: (200 * windowW),
        });

        //areaCanvas
        new wxCharts({
            canvasId: 'areaCanvas',
            type: 'area',
            categories: ['1', '2', '3', '4', '5', '6'],
            animation: true,
            series: [{
                name: '成交量1',
                data: [32, 45, 0, 56, 33, 34],
                format: function (val) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '成交量2',
                data: [15, 20, 45, 37, 4, 80],
                format: function (val) {
                    return val.toFixed(2) + '万';
                },
            }],
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0,
                fontColor: '#8085e9',
                gridColor: '#8085e9',
                titleFontColor: '#f7a35c'
            },
            xAxis: {
                fontColor: '#7cb5ec',
                gridColor: '#7cb5ec'
            },
            extra: {
                legendTextColor: '#cb2431'
            },
            width: (375 * windowW),
            height: (200 * windowW),
        });

        //radarCanvas
        new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            categories: ['1', '2', '3', '4', '5', '6'],
            series: [{
                name: '成交量1',
                data: [90, 110, 125, 95, 87, 122]
            }],
            width: (375 * windowW),
            height: (200 * windowW),
            extra: {
                radar: {
                    max: 50
                }
            }
        });
    },
})