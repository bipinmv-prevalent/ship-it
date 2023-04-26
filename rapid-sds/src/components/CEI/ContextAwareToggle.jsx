import React, { useContext } from "react";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div className="d-flex align-items-center py-1 u-cursor-pointer" onClick={decoratedOnClick}>
      <img src={`${process.env.PUBLIC_URL}/chevron-down.svg`} style={{ transition: "0.3s", alignSelf: "center" }}
        className={`u-font-12 ${isCurrentEventKey ? "u-rotate-90" : ""}`} />
      {children}
    </div>
  );
}
export default ContextAwareToggle;
