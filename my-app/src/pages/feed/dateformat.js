export const formattedDate = (date) => {
    console.log("dateformat 실행중");
    const dateObj = new Date(date);
    const current = new Date();
    const formatted = `${dateObj.getFullYear()}.${dateObj.getMonth() + 1}.${dateObj.getDate()}`;
    const currentFormatted = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
    let res = "";
    if (formatted !== currentFormatted) {
        res = formatted;
    } else {
        const diff = current.getTime() - dateObj.getTime();

        if (Math.floor(diff / (3600 * 1000)) > 0) {
            res = `${Math.floor(diff / (3600 * 1000))}시간 전`;
        } else if (Math.floor(diff / (60 * 1000)) > 0) {
            res = `${Math.floor(diff / (60 * 1000))}분 전`;
        } else {
            if (Math.floor(diff / 1000) < 0) {
                res = "0초 전";
            } else {
                res = `${Math.floor(diff / 1000)}초 전`;
            }
            return res;
        }
    }
    return res;
};

// 1000 ms = 1s
// 1ms = 0.001s
// a / 1000
// 60s = 1min
      