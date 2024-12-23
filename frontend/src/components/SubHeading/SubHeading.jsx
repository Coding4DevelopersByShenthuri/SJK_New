import React from 'react';
import spoon from '../../assets/spoon.png';

const SubHeading = (props) => (
  <div style={{ marginBottom: "1rem" }}>
    <p className="p__cormorant">{props.title}</p>
    <img src={spoon} alt="Spoon" className="spoon__img" />
  </div>
);

export default SubHeading;

