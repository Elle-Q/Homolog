export function getColorFromUserStatus(status) {
    switch (status) {
        case 'online':
            return '#44b700'
        case 'offline':
            return '#252422'
        case 'busy':
            return '#FF0000'
        default:
            return "#252422"
    }
}

export function getOrderStatus(status) {
    switch (status) {
        case 'open':
            return {
                color: '#595DFD',
                text: '待支付'
            }
        case 'canceled':
            return {
                color: '#e82986',
                text: '已取消'
            }
        case 'closed':
            return {
                color: '#00a896',
                text: '已完成'
            }
        default:
            return {}
    }
}

export function isVideo(format) {
    format = format.toLowerCase()
    return format === "intro/mp4" || format === "avi" || format === "mkv" || format === "mp4"
}

export function isJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

export function isEmpty(string) {
    return string.trim().length === 0;
}

export function timeFormat(time) {
    let hour = Math.floor(time / 3600);
    let minute = Math.floor((time % 3600) / 60);
    let second = Math.floor(time % 60);
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return `${hour}:${minute}:${second}`;
}

export function updateUrl(key, newValue, params, path) {
    const searchParams = new URLSearchParams(params);
    searchParams.set(key, newValue);
    if (key === 'catId') {
        searchParams.delete('metric')
    }
    return `${path}${searchParams.toString() === '' ? '' : '?'}${searchParams.toString()}`;
};