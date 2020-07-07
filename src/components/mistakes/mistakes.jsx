import PropTypes from "prop-types";
import React from "react";

const Mistakes = (props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((mistake, index) =>
        <div className="wrong" key={`mistake-${index}`}/>)}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Mistakes;
