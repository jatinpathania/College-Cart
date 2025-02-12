import React from 'react';
import './button.css'
const Button = () => {
  return (
    <div>
      <button className="button button-item">
        <span className="button-bg">
          <span className="button-bg-layers">
            <span className="button-bg-layer button-bg-layer-1 -purple" />
            <span className="button-bg-layer button-bg-layer-2 -turquoise" />
            <span className="button-bg-layer button-bg-layer-3 -yellow" />
          </span>
        </span>
        <span className="button-inner">
          <span className="button-inner-static">Hover me</span>
          <span className="button-inner-hover">Hover me</span>
        </span>
      </button>
    </div>
  );
}

export default Button;