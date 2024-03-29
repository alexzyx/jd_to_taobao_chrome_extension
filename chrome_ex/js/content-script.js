//监听消息
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "copy") {
            //收到copy信息，开始获取当前页面id为sb_form_q的值
            // 联系买家
            var lianximaijia = $("p[name='dongdongICON']").text();
            // 收货人
            var shouhuoren = $('#receiveData > tbody > tr:nth-child(2) > td:nth-child(2)').text();
            // 地址
            var dizhi = $('#receiveData > tbody > tr:nth-child(3) > td:nth-child(2)').text();
            // 手机号
            var shoujihao = document.querySelector("#mobile").innerHTML;
            if (lianximaijia.length > 0 && shouhuoren.length > 0 
                && dizhi.length > 0 && shoujihao.length > 0) {
            // 如果获取的值不为空则返回数据到popup.js的回调函数
                if (sendResponse) {
                    sendResponse({lianximaijia:lianximaijia,
                        shouhuoren: shouhuoren,
                        dizhi: dizhi,
                        shoujihao: shoujihao});
                    alert("OK");
                }
            } else {
                alert("No data");
            }
        } else if (request.action === "paste") {
            // 收到paste消息和之前抓取的值
            if (request.data) {
                // 将值放入目标网页的id为input的输入框中
                const changeValue = (element, value) => {
                    const event = new Event('input', { bubbles: true });
                    element.value = value;
                    element.dispatchEvent(event);
                };
                changeValue(document.querySelector('#cndzkEntrance > div:nth-child(4) > div > div > textarea'), request.data.dizhi);
                changeValue(document.querySelector('#fullName'), request.data.shouhuoren);
                changeValue(document.querySelector('#mobile'), request.data.shoujihao);
                sendResponse("OK");
            } else {
                alert("No data");
            }
        }
    }
);

window.onload = function() {
    // 点击查看
    var show = document.querySelector("#viewOrderMobile");
    if (show) {
        document.querySelector("#viewOrderMobile").click();
    }
};