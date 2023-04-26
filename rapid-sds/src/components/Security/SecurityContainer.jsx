import { Card, Col, Row } from 'react-bootstrap';
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import SPTable from './SPTable';
import TotalCount from './TotalCount';
import TypoSquatted from './TypoSquatted';

const SecurityContainer = ({ client }) => (
  <div className="container-fluid mt-3 mb-3">
    <span className="fw-bold u-font-14 ms-1">Security Posture</span>
    {/* <Row className="my-2" style={{ minHeight: "150px" }}>
      <Col md="3" className="pe-2 mb-1">
        <Card className="card-container p-3 h-100">
          <TotalCount subtitle="Score" order={"1"} client={client} />
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-3 h-100">
          <TotalCount subtitle="Total Domains" order={"2"} client={client} />
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-3 h-100">
          <TotalCount subtitle="Total IPs" order={"3"} client={client} />
        </Card>
      </Col>
      <Col md="3" className="ps-1 mb-1">
        <Card className="card-container p-3 h-100">
          <TotalCount subtitle="Total Certificates" order={"4"} client={client} />
        </Card>
      </Col>
    </Row> */}

    <Row className="mb-2" style={{ minHeight: "300px" }}>
      <Col md="4" className="pe-2 mb-1">
        <Card className="card-container p-2 h-100">
          <PieChartContainer order="5" client={client} title="Environments" />
        </Card>
      </Col>
      <Col md="4" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-2 h-100">
          <TypoSquatted order="8" client={client} title="TypoSquatted Domains" includeDomains={true} />
        </Card>
      </Col>
      <Col md="4" className="ps-1 mb-1">
        <Card className="card-container p-2 h-100">
          <PieChartContainer order="12" client={client} title="SSL Enabled" />
        </Card>

      </Col>
    </Row>

    <Row className="mb-2" style={{ minHeight: "300px" }}>
      <Col md="3" className="pe-2 mb-1">
        <Card className="card-container p-2 h-100">
          <PieChartContainer order="10" client={client} title="Open Vulnerable Ports" />
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-2 h-100">
          <TypoSquatted order="7" client={client} title="Outdated Database" includeDomains={false} />
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-2 h-100">
          <TypoSquatted order="6" client={client} title="Legacy Systems" includeDomains={false} />
        </Card>
      </Col>
      <Col md="3" className="ps-1 mb-1">
        <Card className="card-container p-2 h-100">
          <PieChartContainer order="11" client={client} title="Security Misconfiguration" />
        </Card>
      </Col>
    </Row>
  </div>
);

export default SecurityContainer;
