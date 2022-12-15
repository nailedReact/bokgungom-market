const formattedDateFunc = (date) => {
    const dateObj = new Date(date);
    const res = {};

    res.formatted = `${dateObj.getFullYear()}.${dateObj.getMonth() + 1}.${dateObj.getDate()}`;

    res.dateTime = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    return res;
};

const formattedTimeFunc = (date) => {
    const dateObj = new Date(date);
    let res = "";
    res = dateObj.toString().split(" ")[4].slice(0, 5);
    return res;
};

export { formattedDateFunc, formattedTimeFunc };
