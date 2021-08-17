import React from "react";
import PropTypes from "prop-types";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

const Rating = ({ value, text, color }) => {
  return (
    <div>
      <span>
        {value >= 1 ? (
          <StarIcon style={{ color }} />
        ) : value >= 0.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarIcon style={{ color }} />
        ) : value >= 1.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarIcon style={{ color }} />
        ) : value >= 2.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarIcon style={{ color }} />
        ) : value >= 3.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarIcon style={{ color }} />
        ) : value >= 4.5 ? (
          <StarHalfIcon style={{ color }} />
        ) : (
          <StarBorderIcon style={{ color }} />
        )}
      </span>
      <div>
        <span>{text && text}</span>
      </div>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
