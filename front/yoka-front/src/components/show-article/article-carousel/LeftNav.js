import React from 'react';
import { bool, func } from 'prop-types';
import { HiChevronLeft } from "react-icons/hi";

const LeftNav = React.memo(({
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      
      <HiChevronLeft size={30}/>
    </button>
  );
});

LeftNav.displayName = 'LeftNav';

LeftNav.propTypes = {
  disabled: bool.isRequired,
  onClick: func.isRequired,
};


export default LeftNav;