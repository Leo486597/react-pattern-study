import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledButton } from "./styles.js";

// expose onClick function to user for custimization
function Increment({ icon = "plus", onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <FontAwesomeIcon icon={icon} color="#17a2b8" />
    </StyledButton>
  );
}

export { Increment };
