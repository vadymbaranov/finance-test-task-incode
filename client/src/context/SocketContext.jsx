import React from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

export const SocketContext = React.createContext({
    socket: {},
});

export const SocketContextProvider = ({ children }) => {
    const url = process.env.REACT_APP_BASE_URL;
    console.log(url);
    const socket = io(url, {
        autoConnect: true,
    });

    const contextValue = {
        socket,
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

SocketContextProvider.propTypes = {
    children: PropTypes.node,
};
