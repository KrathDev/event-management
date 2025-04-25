const searchEvent = (query) => {
  filter = {};
  if (query.title) {
    filter.title = { $regex: query.title, $options: "i" };
  }

  if (query.desc) {
    filter.description = { $regex: query.desc, $options: "i" };
  }

  if (query.date) {
    const searchDate = new Date(query.date);
    const nextDate = new Date(searchDate);
    nextDate.setDate(searchDate.getDate() + 1);
    console.log(nextDate);
    filter.date = { $gte: searchDate, $lt: nextDate };
  }

  return filter;
};

module.exports = searchEvent;
