import moment from 'moment';
export const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    let flag = false;
    while (date.getMonth() === month) {
        let day = {}
        if (!flag) {
            if (new Date(date).getDay() > 0) {
                for (let i = 0; i < new Date(date).getDay(); i++) {
                    days.push({ "date": "", month: "" })
                }
            }
            flag = true
        }
        day.date = new Date(date).getDate();
        day.month = new Date(date).toLocaleString('en-us', { month: 'long' });
        days.push(day);
        date.setDate(date.getDate() + 1);
    }
    let ans = days.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 7)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
    return ans;
}

export const getMonth = (m) => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[m];
}

export const sortByTime = (appointmentArray) => {
    return appointmentArray.sort(function (left, right) {
        return moment.utc(left.dateTime).diff(moment.utc(right.dateTime))
    });
}

export const genetrateId = (state) => {
    if(state.length === 0){
        return 0;
    }
    let sortedData = state.sort((left, right) =>  parseInt(left.id) - parseInt(right.id));
    return sortedData[sortedData.length -1].id + 1;
}