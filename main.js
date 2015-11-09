/**
 * 這是 LJ 回應留言系統
 */

if(typeof(ljComment) == 'undefined') {
    var ljComment = {
        commentBox: "ytcb-text",
        commentSend: "ytcb-reply",
        messageClass: "content video-title-visible",
        replyButton: "comment-footer-action yt-commentbox-show-reply",
        replyList: [
            "哈哈哈。",
            "哈哈哈，謝謝，感謝支持啊！",
            "請參考 http://lj.dsa.tw/qna.html 喔！",
            "哦哦哦！原來如此！",
            "抱歉久等囉！",
            "感謝支持啊！",
            "嗨嗨！",
            "我們會嘗試看看的。",
            "哈哈哈，太太太感謝支持啦！"
        ],
        textSelectModule: false,
        pluginExecute: []
    };
}

/**
 * 執行所有回應 plugin
 *
 * @param keyCode
 */
ljComment.doExecute = function (keyCode) {
    var text = "";

    for (var index = 0; index < ljComment.pluginExecute.length; index++)
    {
        if ("function" == typeof(ljComment.pluginExecute[index]))
        {
            text += ljComment.pluginExecute[index](keyCode);
        }
    }

    return text;
};

/**
 * 輸出文字
 *
 * @param value
 */
ljComment.inputText = function (value) {
    var commentBox = ljComment.getCommentBox();

    commentBox.innerHTML += value;
};

/**
 * 取得留言欄位
 *
 * @returns {HTMLElement}
 */
ljComment.getCommentBox = function () {
    return document.getElementById(ljComment.commentBox);
};

/**
 * 快捷建記錄功能
 */
ljComment.keyListener = function () {
    document.addEventListener("keydown", function(e){
        if ("Alt" == e.keyIdentifier)
        {
            ljComment.textSelectModule = true;
        }

        var replyText = ljComment.doExecute(e.keyCode);

        ljComment.inputText(replyText);
    });

    document.addEventListener("keyup", function(e){
        if ("Alt" == e.keyIdentifier)
        {
            ljComment.textSelectModule = false;
        }
    });
};

/**
 * 險是回應文字列表
 */
ljComment.displayReplyList = function () {
    var selectPanel = document.createElement("div");
    selectPanel.setAttribute("style", "position: fixed; bottom: 20px; left: 20px; background: #fff;");

    var html = "<ol id='panelTextList'>";

    for (var index = 0; index < ljComment.replyList.length; index++)
    {
        html += "<li>" + index + " : " + ljComment.replyList[index] + "</li>";
    }

    html += "</ol>";

    selectPanel.innerHTML = html;

    document.body.appendChild(selectPanel);
};

/**
 * 自動打開回應
 */
ljComment.autoOpenComment = function () {
    var messagesList = document.getElementsByClassName(ljComment.messageClass);

    for (var index = 0; index < messagesList.length; index++)
    {
        var messages = messagesList[index];

        messages.onmouseover = function () {
            var button = this.getElementsByClassName(ljComment.replyButton)[0];

            if (button)
            {
                button.click();
            }
        };
    }
};

ljComment.init = function () {
    ljComment.keyListener();

    ljComment.displayReplyList();

    ljComment.autoOpenComment();
};

ljComment.init();
