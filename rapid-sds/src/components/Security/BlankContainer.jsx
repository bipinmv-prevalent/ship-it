import { Card, Col, Row } from 'react-bootstrap';

const BlankContainer = ({ client }) => (
  <div className="container-fluid mt-3 mb-3">
    <Row className="my-2" style={{ minHeight: "150px" }}>
      <Col md="3" className="pe-2 mb-1">
        <Card className="card-container p-3 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-3 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-3 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 mb-1">
        <Card className="card-container p-3 h-100">
        </Card>
      </Col>
    </Row>

    <Row className="mb-2" style={{ minHeight: "300px" }}>
      <Col md="3" className="pe-2 mb-1">
        <Card className="card-container p-2 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-2 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 pe-2 mb-1">
        <Card className="card-container p-2 h-100">
        </Card>
      </Col>
      <Col md="3" className="ps-1 mb-1">
        <Card className="card-container p-2 h-100">
        </Card>
      </Col>
    </Row>
  </div>
);

export default BlankContainer;
