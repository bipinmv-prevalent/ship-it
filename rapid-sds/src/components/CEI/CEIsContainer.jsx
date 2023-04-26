import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import SPTable from '../Security/SPTable';
import FrameWorkAccordion from './FrameWorksAccordion';

const CEIsContainer = ({ client }) => (
  <div className="container-fluid mt-2 u-font-white mb-5">
    <div className="me-auto d-flex align-items-center mb-2">
      <span className="fw-bold u-font-14 p-2 me-3">{"Risk & Control"} </span>
      <DropdownButton
        variant=""
        title={"NIST"}
        className="me-2 w-auto cei-dropdown"
      >
        <Dropdown.Item
          eventKey={"NIST"}
          className="analysis-period-dropdown u-prevent-text-selection"
        >
          NIST
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={"ISO"}
          className="analysis-period-dropdown u-prevent-text-selection"
        >
          ISO
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={"Essential 8"}
          className="analysis-period-dropdown u-prevent-text-selection"
        >
          Essential 8
        </Dropdown.Item>
      </DropdownButton>
    </div>
    <FrameWorkAccordion order={"9"} client={client} />
    <Card className="card-container mt-3" style={{ minHeight: "400px" }}>
      <SPTable client={client} order="13" />
    </Card>
  </div>
);

export default CEIsContainer;
