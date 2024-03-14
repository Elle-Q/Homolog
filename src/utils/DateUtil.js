
export function StringToDate(dateString) {
    if (dateString === undefined) return null;
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date)
}

export function getInternalDaysFromNow(endDateString) {
    let startDate = new Date(endDateString);
    let endDate = new Date();
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    // 将毫秒数转换成天数并返回
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}