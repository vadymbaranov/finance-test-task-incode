import React, {
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import styles from './CardList.module.scss';
import { SocketContext } from '../../context/SocketContext';
import { Card } from '../Card/';
import { useSelector, useDispatch } from 'react-redux';
import { actions as stocksActions } from '../../redux/stocks';
import { IntervalInput } from '../IntervalInput/IntervalInput';

export const CardList = () => {
    const [intervalError, setIntervalError] = useState(false);
    const [newInterval, setNewInterval] = useState('');
    const { socket } = useContext(SocketContext);

    const { stocks } = useSelector((state) => state.stocks) ?? [];
    const dispatch = useDispatch();

    const modalRef = useRef(null);

    const handleIntervalChangeClick = useCallback((newInterval) => {
        if (newInterval.length === 0) {
            const modalElement = modalRef.current;
            if (modalElement) {
                setIntervalError(true);
                modalElement.showModal();
                setInterval(() => {
                    modalElement.close();
                    setIntervalError(false);
                }, 3000);
            }
            return;
        }

        if (newInterval.length === 1) {
            const updatedInterval = newInterval + '000';
            socket.emit('newInterval', { interval: +updatedInterval });
            const modalElement = modalRef.current;
            if (modalElement) {
                modalElement.showModal();
                setInterval(() => {
                    modalElement.close();
                    setNewInterval('');
                }, 3000);
            }
        } else {
            socket.emit('newInterval', { interval: +newInterval });
            const modalElement = modalRef.current;
            if (modalElement) {
                modalElement.showModal();
                setInterval(() => {
                    modalElement.close();
                    setNewInterval('');
                }, 3000);
            }
        }
    }, []);

    useEffect(() => {
        socket.connect();
        socket.once('connect', () => {
            console.log('connected', socket?.connected);
        });

        socket.emit('start', { message: '' });

        socket.on('ticker', (stocks) => {
            console.log('addListener --> ', stocks);
            dispatch(stocksActions.set(stocks));
        });

        return () => {
            socket.off('ticker');
            socket.disconnect();
            console.log('Socket connect status', socket?.connected);
        };
    }, [socket]);

    return (
        <section className='section'>
            <IntervalInput
                newInterval={newInterval}
                onNewInterval={setNewInterval}
                onIntervalChangeClick={handleIntervalChangeClick}
            />
            <div className='is-flex is-flex-direction-row is-justify-content-center is-align-items-center'>
                {stocks?.map((stock) => (
                    <div
                        key={stock.ticker}
                        className='column'
                    >
                        <Card stock={stock} />
                    </div>
                ))}
            </div>

            <dialog
                ref={modalRef}
                className={styles.cardList_modal}
            >
                {intervalError ? (
                    <div className='content'>
                        Interval can&apos;t be less than 1000ms
                    </div>
                ) : (
                    <div className='content'>New interval has been set</div>
                )}
            </dialog>
        </section>
    );
};
