/**
 *  轉換 keyCode 成數字
 * @param value integer
 */
ljComment.keyCodeToInt = function (value) {
    return parseInt(value - 48);
};

/**
 *  依照數字選擇回應
 *
 * @param keyCode
 */
ljComment.intSelect = function (keyCode) {
    var input = ljComment.keyCodeToInt(keyCode);
    var text = ljComment.replyList[input];

    if (undefined == text)
    {
        return "";
    }

    return text;
};

ljComment.pluginExecute.push(ljComment.intSelect);
