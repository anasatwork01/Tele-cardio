import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

const ActivityComp = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-5">Activity</CardTitle>
          <ul className="verti-timeline list-unstyled">
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <div className="flex-shrink-0 d-flex">
                <div className="me-3">
                  <h5 className="font-size-14">
                    13 Feb{" "}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <div className="flex-grow-1">
                  <div>Patient Ali did their ECG scan</div>
                </div>
              </div>
            </li>

            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <h5 className="font-size-14">
                    14 Feb{" "}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <div className="flex-grow-1">
                  <div id="activitytext">Patient Maryam did their ECG scan</div>
                </div>
              </div>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <div className="flex-shrink-0 d-flex">
                <div className="me-3">
                  <h5 className="font-size-14">
                    13 Feb{" "}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <div className="flex-grow-1">
                  <div>Patient Mahad did their ECG scan</div>
                </div>
              </div>
            </li>

            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <h5 className="font-size-14">
                    14 Feb{" "}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <div className="flex-grow-1">
                  <div id="activitytext">Patient Fatima did their ECG scan</div>
                </div>
              </div>
            </li>
            <li className="event-list">
              <div className="event-timeline-dot">
                <i className="bx bx-right-arrow-circle font-size-18" />
              </div>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <h5 className="font-size-14">
                    14 Feb{" "}
                    <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2" />
                  </h5>
                </div>
                <div className="flex-grow-1">
                  <div id="activitytext">Patient Anas did their ECG scan</div>
                </div>
              </div>
            </li>
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ActivityComp
