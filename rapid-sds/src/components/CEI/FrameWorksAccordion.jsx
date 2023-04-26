import { Accordion, Card } from "react-bootstrap";
import { useState, useEffect, useCallback } from 'react';
import { RAPID_API_URL } from "../../config/constants";
import ContextAwareToggle from "./ContextAwareToggle"

const FrameWorkAccordion = ({ client, order }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [getData]);

  const getData = useCallback(async () => {
    const response = await fetch(`${RAPID_API_URL}${order}?client=${client}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.components)
    setData(data?.components);
    setLoading(false);
  }, [client, order]);

  const getAccordionView = useCallback(
    f => (
      <Accordion
        className={"u-flex-1 bg-reporting-level-1 u-br-primary mb-2 reporting-accordion"}
        key={f.component_code}
        id={"accordion-" + f.component_code}
        defaultActiveKey={f.component_code}
      >
        <Card className="u-no-border" key={f?.component_code}>
          <Card.Header className="" id={"accordion-details-" + f?.component_code}>
            <ContextAwareToggle variant="link" eventKey={f?.component_code} className="u-flex">
              <div className="d-flex align-items-center flex-column u-cursor-pointer u-font-14 px-2">
                <div className="white u-font-12 fw-bold text-center">
                  {f.component_code + " : " + f?.component_name}
                </div>
              </div>

              <div className="u-font-white u-flex-1 text-end px-2 u-cursor-pointer">
                <span className="u-font-14 fw-bold me-5">{f.score === "-" ? "-" : f.score && Math.floor(f.score)}</span>
              </div>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse
            eventKey={f.component_code}
            className={"bg-reporting-level-" + (parseInt(f.component_level) + 1)}
          >
            <Card.Body className="py-0">
              {f.ceis.map(cei => (
                <Accordion
                  className={"u-flex-1 bg-reporting-level-1 u-br-primary mb-2 reporting-accordion"}
                  key={cei.cei_code}
                  id={"accordion-" + cei.cei_code}
                >
                  <Card className="u-no-border" key={cei?.cei_code}>
                    <Card.Header className="" id={"accordion-details-" + cei?.cei_code}>
                      <div className="d-flex align-items-center justify-content-between u-font-14 ps-2 pe-3">
                        <span className="u-font-12 ms-4">
                          {"CEI " + cei?.cei_code + " : " + cei?.cei_description}
                        </span>
                        <span className="u-font-12">
                          {"Control : " + cei?.control}
                        </span>
                        <span className="u-font-14 me-4">{cei.score === "-" ? "-" : cei.score && Math.floor(cei.score)}</span>
                      </div>
                    </Card.Header>
                    {/* <Accordion.Collapse
                      eventKey={f.cei_code}
                      className={"bg-reporting-level-" + (parseInt(f.component_level) + 1)}
                    >
                      <Card.Body className="py-0">
                        {f.components && f.components.length > 0 && f.components.map(cat => getAccordionView(cat))}
                      </Card.Body>
                    </Accordion.Collapse> */}
                  </Card>
                </Accordion>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      {data?.length > 0 && (
        <>{data?.map(f => getAccordionView(f))}</>
      )}
      {data?.length === 0 && (
        <div
          className="text-secondary u-font-14 d-flex justify-content-center align-items-center"
          style={{ height: "30vh" }}
        >
          No data to display
        </div>
      )}

    </>
  );
};

export default FrameWorkAccordion;
