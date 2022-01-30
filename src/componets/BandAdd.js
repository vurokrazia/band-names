import React from 'react';

const BandAdd = ({ onAddBand }) => {
  const pushBand = (event) => {
    const value = event.target.value;
    if (value.length > 5) {
      onAddBand(event.target.value);
      event.target.value = '';
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form>
        <input
          className='form-control'
          onBlur={(event) => pushBand(event)}
          placeholder='Nuevo nombre de banda'
        />
      </form>
    </>
  );
};
export { BandAdd };
