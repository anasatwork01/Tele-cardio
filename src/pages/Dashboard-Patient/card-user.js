import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg"

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  //Setting Menu

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={avatar1}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2">Welcome to TELE-CARDIO Dashboard</p>
                        <h5 className="mb-1">Ali Raza</h5>
                        <p className="mb-0">ali@ecg.com</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg="4" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Gender
                          </p>
                          <h5 className="mb-0">Male</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">Age</p>
                          <h5 className="mb-0">30</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            ECG Scans
                          </p>
                          <h5 className="mb-0">5</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg="4" className="d-none d-lg-block">
                  <div className="clearfix mt-4 mt-lg-0">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className="float-end"
                    >
                      <DropdownToggle tag="button" className="btn btn-primary">
                        SELECT ECG
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">ECG 3</DropdownItem>
                        <DropdownItem href="#">ECG 2</DropdownItem>
                        <DropdownItem href="#">ECG 1</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
