import React from "react"
import { Container, Row, Col } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"

import Data from "../../assets/Data.json"

const DashboardPatient = props => {
  //meta title
  document.title = "Patient Dashboard | TELE-CARDIO"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Patient" />
          {/* Card User */}
          <CardUser />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardPatient
