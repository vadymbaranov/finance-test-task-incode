import React from 'react';
import PropTypes from 'prop-types';

export const IntervalInput = ({
    newInterval,
    onNewInterval,
    onIntervalChangeClick,
}) => {
    return (
        <div className='container'>
            <div className='is-flex is-justify-content-center'>
                <div className='block mr-2 mt-5'>
                    <input
                        type='number'
                        className='input is-flex-shrink-1'
                        placeholder='5000ms'
                        value={newInterval}
                        onChange={(e) => onNewInterval(e?.target?.value)}
                    />
                </div>

                <button
                    className='button mt-5 is-primary'
                    onClick={() => onIntervalChangeClick(newInterval)}
                >
                    Change interval
                </button>
            </div>
        </div>
    );
};

IntervalInput.propTypes = {
    newInterval: PropTypes.string,
    onNewInterval: PropTypes.func,
    onIntervalChangeClick: PropTypes.func,
};
