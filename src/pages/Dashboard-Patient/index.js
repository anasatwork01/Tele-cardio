import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import CanvasJSReact from "@canvasjs/react-charts"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
//Import Components
import CardUser from "./card-user"

import Data from "../../assets/Data.json"

var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const DashboardPatient = props => {
  //meta title
  document.title = "Patient Dashboard | TELE-CARDIO"

  const [showNote, setShowNote] = useState(false)
  const [text, setText] = useState("")
  const [edit, setEdit] = useState(true)

  //Graphs
  var data = []
  var dataSeries = { type: "line" }
  var dataPoints = []

  for (var i = 0; i < Data.length; i += 1) {
    dataPoints.push({
      x: i * 250,
      y: Data[i],
    })
  }
  dataSeries.dataPoints = dataPoints
  data.push(dataSeries)

  const options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "ECG Graph",
    },
    data: data, // random data
    axisY: {
      gridColor: "red",
    },
    axisX: {
      gridThickness: 1,
      // interval: 250,
      viewportMinimum: 0,
      viewportMaximum: 300000,
      gridColor: "red",
    },
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Patient" />
          {/* Card User */}
          <CardUser />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CanvasJSChart
                    options={options}
                    // onRef={ref => (this.chart = ref)}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Row>
                <Col
                  lg="12"
                  className="mt-3 mb-3 d-flex justify-content-between"
                >
                  <h4 style={{ fontWeight: "bold" }}>Doctor's Comments</h4>
                  {!showNote && (
                    <Button
                      color="primary"
                      onClick={() => {
                        setShowNote(true)
                      }}
                    >
                      {"Add Note"}
                    </Button>
                  )}
                </Col>
              </Row>
              {showNote && (
                <Row>
                  <Col lg="12">
                    <textarea
                      className="form-control"
                      id="example-textarea"
                      rows="3"
                      placeholder="Write some note.."
                      value={text}
                      onChange={e => setText(e.target.value)}
                      disabled={edit ? false : true}
                    ></textarea>
                  </Col>
                  <Col lg="12 mt-3 mb-3 d-flex flex-row-reverse">
                    <Button
                      color="primary"
                      onClick={() => {
                        setEdit(prev => !prev)
                      }}
                    >
                      {edit ? "Save" : "Edit"}
                    </Button>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardPatient
