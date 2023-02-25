/* Your Code Here */
function createEmployeeRecord (arr) {
    let arrObj= {
        'firstName': arr[0],
        'familyName': arr[1],
        'title': arr[2],
        'payPerHour': arr[3],
        'timeInEvents':[],
        'timeOutEvents':[]
    }
    return arrObj
}

function createEmployeeRecords (arrOfArr) {
    return arrOfArr.map(employee=> createEmployeeRecord(employee))
}

const createTimeInEvent = function (dateStamp){
    let [date,hour] = dateStamp.split(' ')
    const timeInEvent = {
        'type': 'TimeIn',
        'hour': parseInt(hour),
        'date': date
    }
    this.timeInEvents.push(timeInEvent)
    return this
}

const createTimeOutEvent= function (dateStamp) {
    let [date,hour] = dateStamp.split(' ')
    const timeOutEvent = {
        'type': 'TimeOut',
        'hour': parseInt(hour),
        'date': date
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}


const hoursWorkedOnDate = function(focusDate) {
    const inDate = this.timeInEvents.find (inE => inE.date === focusDate)
    const outDate = this.timeOutEvents.find (oE => oE.date=== focusDate)
    return (outDate.hour - inDate.hour)/100
}

const wagesEarnedOnDate = function (targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}
const findEmployeeByFirstName= function (collection, firstNameString) {
    return collection.find(rec => rec.firstName === firstNameString)
}

const calculatePayroll= function(recsArr) {
    return recsArr.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

