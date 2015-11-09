/**
 * 按 shift 點回應按鈕
 *
 * @param keyCode
 */
ljComment.sendReply = function (keyCode) {
    if (16 == keyCode)
    {
        var button = document.getElementById(ljComment.commentSend);

        button.click();
    }

    return "";
};

ljComment.pluginExecute.push(ljComment.sendReply);