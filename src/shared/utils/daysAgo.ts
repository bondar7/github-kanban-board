const getDaysAgo = (date: string) => {
    const createdDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays === 0 ? "today" : differenceInDays;
};

export default getDaysAgo;