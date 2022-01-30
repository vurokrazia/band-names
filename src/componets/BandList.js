import React from 'react';

const BandList = ({
  bands,
  setBands,
  onAddVotes,
  onRemoveVote,
  onUpdateBand,
}) => {
  const changeName = (event, id) => {
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) band.name = event.target.value;
        return band;
      })
    );
  };

  const onLostBlur = (id, name) => {
    onUpdateBand(id, name);
  };

  const addRows = () => {
    return bands.map((band) => {
      return (
        <tr key={band.id}>
          <td>
            <button
              onClick={() => {
                onAddVotes(band.id);
              }}
              className='btn btn-primary'
            >
              +1
            </button>
          </td>
          <td>
            <input
              type='text'
              className='form-control'
              value={band.name}
              onChange={(event) => {
                changeName(event, band.id);
              }}
              onBlur={() => onUpdateBand(band.id, band.name)}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button
              onClick={() => onRemoveVote(band.id)}
              className='btn btn-danger'
            >
              {' '}
              Borrar{' '}
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{addRows()}</tbody>
      </table>
    </>
  );
};
export { BandList };
