import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? "none" : "" };
  const showIfVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideIfVisible}>
        <Button className="create-new-blog" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
