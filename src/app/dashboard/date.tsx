

// type TDD = {
//     dateDetails: string;
// }

// type dateAndTime = {
//     day: number,
//     month: number,
//     year: number
// }
// useAllDispatchersFetcher
// export default function useDateHandler(date: any){
//     let currentDate: Date = new Date();
//     // let date: Date = new Date(props.dateDetails);
//     const currentDateObj = {
//         day: currentDate.getDay(),
//         month: currentDate.getMonth(),
//         year: currentDate.getFullYear()
//     }
//     const dateObj = {
//         day: date.getDay(),
//         month: date.getMonth(),
//         year: date.getFullYear()
//     }
//     let finalDate: dateAndTime = {       
//         day: Math.abs(currentDateObj.day - dateObj.day), 
//         // month: Math.abs(12 - dateObj.month + currentDateObj.month), 
//         month: Math.abs(currentDateObj.month - dateObj.month), 
//         year: Math.abs(currentDateObj.year - dateObj.year)
//     }
//     return(
//         <div>
//             {finalDate.day === 0 && finalDate.year === 0 && finalDate.month === 0 && 
//             <span>Today,</span>}
//             {finalDate.month >= 1 && finalDate.day <= 31 && finalDate.year <= 1 && 
//             <span>{finalDate.month} months ago.</span>}
//             {finalDate.month >= 1 && finalDate.day <= 31 && finalDate.year > 1 && 
//             <span>{finalDate.month} years ago.</span>}
//             {finalDate.month <= 1 && finalDate.day <= 31 && finalDate.year <= 1 && 
//             <span>{finalDate.day} days ago.</span>}
//         </div>
//     )
// }


export function useDateHandler(date2: any){
    /*
    * calcDate() : Calculates the difference between two dates
    * @date1 : "First Date in the format MM-DD-YYYY"
    * @date2 : "Second Date in the format MM-DD-YYYY"
    * return : Array
    */
    //new date instance
    // Split the date string at '-' char
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let date1: any = new Date();
    let name = months[date1.getMonth()];
    let monthNum = months.indexOf(name) < 9 ? '0' + (months.indexOf(name) + 1) : months.indexOf(name) + 1;
    date1 = String(date1).split(' ');
    date2  = new Date(date2?.slice(0, 10))
    date2 = String(date2).split('-');
    
    // Concatenate each part in reverse order
    const newDate1 = monthNum +'-'+date1[2]+'-'+date1[3];
    const newDate2 = date2[1]+'-'+date2[2]+'-'+date2[0];
    const dt_date1 = new Date(newDate1);
    const dt_date2 = new Date(newDate2);

    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();

    let calc;

    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat: any = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    //Set up custom text
    const yrsTxt = ["year ", "years"];
    const mnthsTxt = ["month ", "months"];
    const daysTxt = ["day", "days"];

    //Convert to days and sum together
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;

    //display result with custom text
    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : '');

    //return the result
    return (
        // "total_days": Math.round(total_days),
            result.trim().length > 0 ? result.trim() + ' ago' : "Today"
    )
}
