import React from 'react';
import './App.css';
import { SocketContextProvider } from './context/SocketContext';
import { CardList } from './components/CardList/CardList';

function App() {
    return (
        <SocketContextProvider>
            <div className='App'>
                <section className='block'>
                    <CardList />
                </section>
            </div>
        </SocketContextProvider>
    );
}

export default App;
