const { randomValue } = require('../helpers/randomValue');
const { utcDate } = require('../helpers/date');

const tickers = [
    'AAPL', // Apple
    'GOOGL', // Alphabet
    'MSFT', // Microsoft
    'AMZN', // Amazon
    'FB', // Facebook
    'TSLA', // Tesla
];

function getQuotes(socket) {
    const quotes = tickers.map((ticker) => ({
        ticker,
        exchange: 'NASDAQ',
        price: randomValue(100, 300, 2),
        change: randomValue(0, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
    }));

    socket.emit('ticker', quotes);
}

function trackTickers(socket, interval) {
    // run the first time immediately
    getQuotes(socket);

    // every N seconds
    let timer = setInterval(function () {
        getQuotes(socket);
    }, interval);

    socket.on('newInterval', (data) => {
        clearInterval(timer);

        timer = setInterval(() => {
            getQuotes(socket);
        }, data?.interval);
    });

    socket.on('disconnect', function () {
        clearInterval(timer);
    });
}

module.exports = { getQuotes, trackTickers };
