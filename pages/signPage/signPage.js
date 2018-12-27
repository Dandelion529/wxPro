// pages/sign/sign.js
// canvas 全局配置
var context = null; // 点击签名画布
var context2 = null; // 签名文本框画布
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var rpx;

var canvasw = 0;
var canvash = 0;
var posterWidth = 0;
var posterHeight = 0;
var avatarPadding = 0; //距离边界
var avatarRadiu = 0; // 头像半径
var textScale = 0; // 文字比例
var app = getApp()

Page({
    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg)
    },
    //开始
    canvasStart: function (event) {
        console.log(event)
        isButtonDown = true;
        arrz.push(0);
        arrx.push(event.changedTouches[0].x);
        arry.push(event.changedTouches[0].y);
    },
    data: {
        canshow: true,
        canshow2: false,
        img: "../../images/sign.jpg",
        myCanvasWidth: 0,
        myCanvasHeight: 0,
        posterHeight: 0,
        signShow: true,
        time: '',//时间
        name: '',//姓名
        idCad: '',//身份证号
        title: '',
        imgArray: [],
        src: '',
        rpx:''
    },

    onLoad: function (options) {
        var that = this
        this.setData({
            time: '2018年12月25日',
            name: 'zhaojing',
            idCad: '1234565412412412',
            title: '测试'
        });
        console.log(that.data.title)
        var myCanvasWidth = that.data.myCanvasWidth
        var myCanvasHeight = that.data.canvasHeight
        context = wx.createCanvasContext('canvas');//签字画布绘制上下文
        context2 = wx.createCanvasContext('canvas2');//签名页画布

        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                myCanvasWidth = res.screenWidth
                myCanvasHeight = res.screenHeight
                posterWidth = Math.round(res.screenWidth * 0.68) // 取最近的整数
                posterHeight = Math.round(posterWidth * 1920 / 1080) 
                avatarPadding = Math.round(posterWidth * 20 / 375)
                avatarRadiu = Math.round(posterWidth * 25 / 375)
                textScale = Math.round(posterWidth / 375)
                rpx = res.windowWidth / 375;  /**可使用窗口宽度 */
                that.setData({
                    myCanvasWidth: myCanvasWidth,
                    myCanvasHeight: myCanvasHeight,
                    posterHeight: posterHeight
                })
                if (res.model == 'iPhone X') {
                    context2.drawImage(that.data.img, 0, 0, that.data.myCanvasWidth * rpx, 800 * rpx); // 绘制图像，保持图像原来尺寸
                    context2.setFontSize(textScale * 15) // 设置字体的字号
                    context2.fillText(that.data.name, 80 * rpx, 120 * rpx, 500 * rpx); // 在画布上绘制被填充的文本
                    context2.fillText(that.data.time, 80 * rpx, 355 * rpx, 500 * rpx); 
                    context2.draw(); // 进行绘图
                } else {
                    console.log('system')
                    context2.drawImage(that.data.img, 0, 0, that.data.myCanvasWidth * rpx, 800 * rpx); // 绘制图像，保持图像原来尺寸
                    context2.setFontSize(textScale * 15) // 设置合同画布字体的字号
                    context2.fillText(that.data.name, 80 * rpx, 120 * rpx, 500 * rpx); // 在画布上绘制被填充的文本 此处为姓名位置
                    context2.fillText(that.data.time, 80 * rpx, 355 * rpx, 500 * rpx); // 此处为画布上的日期位置
                    context2.draw(); // 进行绘图
                }
            },
        })
        context.beginPath() // 在画布上绘制路径
        context.setStrokeStyle('#000000'); // 设置边框样式-黑色
        context.setLineWidth(4); // 设置线条宽度
        context.setLineCap('round'); // 设置线条端点样式
        context.setLineJoin('round'); // 设置线条交点样式
        context.draw(); // 进行绘制
    },

    /**
     * 点我签名
     */

    addName(){
        var that = this
        that.cleardraw()
        that.setData({
            canshow: false,
            canshow2: true,
        })
    },

    loadimg() {
        var that = this
        wx.showLoading({
            title: '上传中...',
        })
        wx.canvasToTempFilePath({
            canvasId: 'canvas2',
            fileType: 'jpg',
            success: function (res) {
                console.log(res,124)
                /**
                 * 第一种场景：签名成功需要将合同保存本地相册
                 */
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        wx.showToast({
                            title: '保存成功',
                        })
                    }
                })

                /**
                 * 第二种场景：承接下面upImgs方法将生成的图片上传到服务器
                 */
                // that.data.imgArray.push(res.tempFilePath)
                // that.upImgs(that.data.imgArray[0], 0)
            }
        })
    },

    //签字过程
    canvasMove: function (event) {
        var that = this
        if (isButtonDown) {
            arrz.push(1);
            console.log(event,136)
            arrx.push(event.changedTouches[0].x);
            arry.push(event.changedTouches[0].y);
        };

        for (var i = 0; i < arrx.length; i++) {
            if (arrz[i] == 0) {
                context.moveTo(arrx[i], arry[i]) // moveTo把路径移动到画布中的指定点，不创建线条
            } else {
                context.lineTo(arrx[i], arry[i]) // 添加一个新点，然后在画布中创建从该点到最后指定点的线条
            };
        };
        
        context.clearRect(0, 0, canvasw, canvash); // 在给定的矩形区域内，清除画布上的像素
        context.setStrokeStyle('#000000'); // 设置边框颜色
        context.setLineWidth(4); // 设置线条宽度
        context.setLineCap('round'); //设置线条端点样式
        context.setLineJoin('round'); // 设置线条交点样式
        context.stroke(); // 绘制当前路径
        context.draw(false);  // 进行绘图
    },

    //确认签名
    clickMe: function () {
        var that = this
        if (arrx.length == 0) {
            wx.showModal({
                title: '提示',
                content: '签名内容不能为空！',
                showCancel: false
            });
            return false;
        };

        
        // 导出图片
        wx.canvasToTempFilePath({
            canvasId: 'canvas',
            fileType: 'jpg',
            success: function (res) {
                console.log(res)
                
                that.setData({
                    namepic: res.tempFilePath, // 生成本地路径
                    canshow: true,
                    canshow2: false,
                    signShow: false,
                })
                wx.getSystemInfo({
                    success: function (res) {
                        console.log(res,184)
                        if (res.model == "iPhone X") {
                            // 800为本人姓名的显示位置
                            context2.drawImage(that.data.img, 0, 0, that.data.myCanvasWidth, 800 * rpx); 
                            context2.setFontSize(textScale * 15) 
                            context2.fillText(that.data.name, 80 * rpx, 120 * rpx, 500 * rpx);
                            context2.fillText(that.data.time, 80 * rpx, 355 * rpx, 500 * rpx);
                            context2.drawImage(that.data.namepic, posterWidth / 375 * 100, posterWidth / 375 * 400, posterWidth / 390 * 200, posterWidth / 390 * 100);
                            context2.draw();
                        } else {
                            context2.drawImage(that.data.img, 0, 0, that.data.myCanvasWidth, 800 * rpx);
                            context2.setFontSize(textScale * 15)
                            context2.fillText(that.data.name, 80 * rpx, 120 * rpx, 500 * rpx);
                            context2.fillText(that.data.time, 80 * rpx, 355 * rpx, 500 * rpx);
                            // 400为调整点子签名的高度位置
                            context2.drawImage(that.data.namepic, posterWidth / 375 * 100, posterWidth / 375 * 400, posterWidth / 390 * 200, posterWidth / 390 * 100);
                            context2.draw();
                        }
                    }
                })

            }
        })
    },

    //保存画布图片本地路径
    clickMe2: function () {
        var that = this
        if (that.data.signShow == true) {
            app.alert('请签名,在生成合同')
        } else {
            that.loadimg()
        }

    },
    
    //上传生成图片到服务器
    upImgs: function (imgurl, index) {
        var that = this;
        wx.showLoading({
            title: '生成中...',
        })
        wx.uploadFile({
            url: app.globalData.ip + '?type=uppic',
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            }, // 设置请求的 header
            formData: null, // HTTP 请求中其他额外的 form data
            success: function (res) {
                var protocol = that.data.protocol
                var data = JSON.parse(res.data)
                that.data.protocol.push(data['msg'])
                that.setData({ protocol: that.data.protocol })
                wx.setStorage({
                    key: 'protocol',
                    data: that.data.protocol,
                })

                if (data['res'] == true) {
                    wx.hideLoading()
                    if (res) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                } else {
                    console.log(data['msg']);
                }
            }
        })
    },

    // 保存图片到本地

    canvasEnd: function (event) {
        isButtonDown = false;
    },
    //清除画布
    cleardraw: function () {
        arrx = [];
        arry = [];
        arrz = [];
        context.draw(false);
    },
})