const enpoint = "insert_card_data";

const dataToCache = enpoint.match(/^fetch_(user|card|class)_data$/);
if (dataToCache) console.log(dataToCache[1]);