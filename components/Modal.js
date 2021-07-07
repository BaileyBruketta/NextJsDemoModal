import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";


const Modal = ({ show, onClose, children, title, name, catchphrase }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
    <StyledModalWrapper id="wra">
      <StyledModal>
        <StyledModalHeader>
          <img src="close.svg" href="#" onClick={handleCloseClick}></img>
        </StyledModalHeader>
        {title && <StyledModalTitle id="modaltitle">{title}</StyledModalTitle>}
        <StyledModalBody id="modalbody">{children}</StyledModalBody>
        <StyledModalName>{name}</StyledModalName>
        <StyledModalCatchphrase>{catchphrase}</StyledModalCatchphrase>
      </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
  grid-row:3/7;
  grid-column:1/3;
`;

const StyledModalHeader = styled.div`
  grid-row:1;
  grid-column:3;
  transform: translate(0px, -10px);
  font-size: 25px;
  cursor: pointer;
  &:img hover{
    fill: red;
    stroke: red;
    background-color: white;
  }
  &:hover{
    background-color: rgba(45, 0, 0, .5);
  }
`;
const StyledModalWrapper = styled.div`

    background: linear-gradient(to right, red, purple);
    padding:1px;
    border-radius:15px;
`;
const StyledModal = styled.div`
  background: rgb(62, 60, 60);
  width: 500px;
  color: white;
  border-radius: 15px;
  padding: 15px;
  display: grid;
  text-align:left;
  grid-template-rows:repeat(5, 30px);
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

`;
const StyledModalTitle = styled.div`
    grid-row:1;
    grid-column:1/3;
    font-size:18px;
    overflow: hidden;
	height: 20px;
`;
const StyledModalName = styled.div`
    grid-row:2;
    font-size:16px;
`;
const StyledModalCatchphrase = styled.div`
    grid-row:2;
    font-size:11px;
    transform:translate(-25%, 20%);
`;

export default Modal;