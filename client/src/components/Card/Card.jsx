import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';

export const Card = ({ stock }) => {
    const [hasPriceIncreased, setHasPriceIncreased] = useState(false);
    const [stockPrice, setStockPrice] = useState(null);

    const lastChange = moment(stock.last_time_trade ?? moment.now()).format(
        'DD-MMM-YYYY hh:mm:ss'
    );

    useEffect(() => {
        if (stock?.price) {
            setStockPrice((prev) => {
                if (prev) {
                    stock?.price > stockPrice
                        ? setHasPriceIncreased(true)
                        : setHasPriceIncreased(false);
                    setStockPrice(stock?.price);
                } else {
                    setStockPrice(stock?.price);
                }
            });
        }
    }, [stock]);

    return (
        <div className='card'>
            <p className='subtitle is-4 mb-0'>{stock.ticker}</p>
            <div className={styles.card_change}>
                {hasPriceIncreased ? (
                    <span className='icon has-text-success'>
                        <i className='fa-solid fa-arrow-up'></i>
                    </span>
                ) : (
                    <span className='icon has-text-danger'>
                        <i className='fa-solid fa-arrow-down'></i>
                    </span>
                )}
                <p>{stock.change}</p>
                <p>{`${Math.floor(stock.change_percent * 100)}%`}</p>
            </div>

            <p>{`$${stock.dividend}`}</p>
            <p className='has-text-weight-bold'>{stock.exchange}</p>
            <p className='content mb-0'>{lastChange}</p>

            <div className='level-item has-text-centered'>
                <div>
                    <p
                        className={cn('title', {
                            'has-text-success': hasPriceIncreased,
                            'has-text-danger': !hasPriceIncreased,
                        })}
                    >
                        {stock.price}
                    </p>
                </div>
            </div>

            <p className='content'>{stock.yield}</p>
        </div>
    );
};

Card.propTypes = {
    stock: PropTypes.object,
};
