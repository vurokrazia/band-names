import React, { useState, useEffect } from 'react';
import { BandAdd } from './componets/BandAdd';
import { BandList } from './componets/BandList';

import io from 'socket.io-client';

const connectSocketServcer = () => {
  return io.connect('http://localhost:8080', { transports: ['websocket'] });
};

const App = () => {
  const [socket] = useState(connectSocketServcer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
    socket.on('disconnect', () => {
      setOnline(false);
      setBands([]);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const onAddVotes = (id) => {
    socket.emit('votar-banda', { id });
  };
  const onRemoveVote = (id) => {
    socket.emit('remove-banda', { id });
  };
  const onAddBand = (name) => {
    socket.emit('add-banda', { name });
  };
  const onUpdateBand = (id, name) => {
    console.log(id, name);
    socket.emit('update-banda', { id, name });
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </p>
      </div>
      <h1>BandNames</h1>
      <div className='row'>
        <div className='col-8'>
          {bands.length > 0 ? (
            <BandList
              bands={bands}
              setBands={setBands}
              onAddVotes={onAddVotes}
              onRemoveVote={onRemoveVote}
              onUpdateBand={onUpdateBand}
            />
          ) : null}
        </div>
        <div className='col-4'>
          <BandAdd onAddBand={onAddBand} />
        </div>
      </div>
    </div>
  );
};

export default App;
