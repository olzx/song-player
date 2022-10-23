function secondsToTime(e) {
    const m = Math.floor(e % 3600 / 60).toString().padStart(2,'0')
    const s = Math.floor(e % 60).toString().padStart(2,'0');

    return m + ':' + s;
}

function timeChange(data) {
    for(let i = 0; i < data.length; i++) {
        const duration = data[i].duration
        data[i].time = secondsToTime(duration)
    }
    return data
}

export default {
    timeModify: function(data) {
        return timeChange(data)
    }
}