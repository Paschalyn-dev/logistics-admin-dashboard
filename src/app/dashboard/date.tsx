export function useDateHandler(date2: any){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let date1: any = new Date();
    let name = months[date1.getMonth()];
    let monthNum = months.indexOf(name) < 9 ? '0' + (months.indexOf(name) + 1) : months.indexOf(name) + 1;
    date1 = String(date1).split(' ');
    date2  = new Date(date2?.slice(0, 10))
    date2 = String(date2).split('-');
    
    const newDate1 = monthNum +'-'+date1[2]+'-'+date1[3];
    const newDate2 = date2[1]+'-'+date2[2]+'-'+date2[0];
    const dt_date1 = new Date(newDate1);
    const dt_date2 = new Date(newDate2);

    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();

    let calc;

    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    const calcFormat: any = calcFormatTmp.split("-");
    const days_passed = Number(Math.abs(calcFormat[0]) - 1);
    const months_passed = Number(Math.abs(calcFormat[1]) - 1);
    const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

    const yrsTxt = ["year ", "years"];
    const mnthsTxt = ["month ", "months"];
    const daysTxt = ["day", "days"];

    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
    // "total_days": Math.round(total_days),

    const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
            months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
            days_passed + ' ' + daysTxt[1] : '');

    return (
            result.trim().length > 0 ? result.trim() + ' ago' : "Today"
    )
}
