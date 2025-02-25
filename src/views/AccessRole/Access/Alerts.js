import React from 'react'
import {
  CAlert,
  CAlertHeading,
  CAlertLink,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import { Link } from 'react-router-dom'
import { SiOpenaccess, SiPrivateinternetaccess } from 'react-icons/si'

const Alerts = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ADMIN Access Role</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Role Management */}
                      <CCardTitle>Role Management</CCardTitle>
                      <SiOpenaccess size={50} color="#22A6F2" />
                    </div>
                    <CCardText>
                      Create, assign, or modify user roles to manage access levels and
                      responsibilities within the system.
                    </CCardText>
                    <Link to="/user-access/role-management">
                      <CButton color="primary">Create/Assign Roles</CButton>
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol>
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Permission Management */}
                      <CCardTitle>Permission Management</CCardTitle>
                      <SiPrivateinternetaccess size={50} color="#36CBBE" />
                    </div>
                    <CCardText>
                      Define and configure permissions for roles to control access to specific
                      features and functionalities.
                    </CCardText>
                    <Link to="/user-access/define-permission">
                      <CButton color="primary">Define Permissions</CButton>
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Alerts
