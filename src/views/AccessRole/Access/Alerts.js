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
import { IoAppsSharp } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { SiBandsintown } from 'react-icons/si'
import { GoPeople } from 'react-icons/go'
import { MdOutlineReduceCapacity } from 'react-icons/md'
import { GiModernCity } from 'react-icons/gi'

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
              <CCol xs={6}>
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

              <CCol xs={6}>
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

              <CCol xs={6} className="mt-3">
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center', // Changed to align-items for better vertical alignment
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Application Manager */}
                      <CCardTitle>Application Manager</CCardTitle>
                      <IoAppsSharp size={50} color="#A71C1C" />{' '}
                      {/* React Icon for Application Manager */}
                    </div>
                    <CCardText>
                      Manage and configure applications, including permissions and access controls,
                      to ensure seamless integration and functionality.
                    </CCardText>
                    <Link to="/user-access/applications-manager">
                      <CButton color="primary">Manage Applications</CButton>{' '}
                      {/* Updated button text for clarity */}
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol xs={6} className="mt-3">
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center', // Changed to align-items for better vertical alignment
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Application Manager */}
                      <CCardTitle>Edit Subscriber </CCardTitle>
                      <FaEdit size={50} color="#29BB1E" />{' '}
                      {/* React Icon for Application Manager */}
                    </div>
                    <CCardText>
                      Assign Quarter and a Kindred to a subscriber in the case of none existed. Once
                      assigned, it can never be changed again.
                    </CCardText>
                    <Link to="/user-access/edit-subscribers">
                      <CButton color="primary">Edit Subscriber</CButton>{' '}
                      {/* Updated button text for clarity */}
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol xs={6} className="mt-3">
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center', // Changed to align-items for better vertical alignment
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Application Manager */}
                      <CCardTitle>Town Management </CCardTitle>
                      <GiModernCity size={50} color="#1673EE" />{' '}
                      {/* React Icon for Application Manager */}
                    </div>
                    <CCardText>
                      Enter Towns associated to the Ward. The towns must be unique within a ward. To
                      enter town, a name and GPS information is required
                    </CCardText>
                    <Link to="/user-access/manage-town">
                      <CButton color="primary">Manage Town</CButton>{' '}
                      {/* Updated button text for clarity */}
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>

             

              <CCol xs={6} className="mt-3">
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center', // Changed to align-items for better vertical alignment
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Application Manager */}
                      <CCardTitle>Quota Management </CCardTitle>
                      <MdOutlineReduceCapacity size={50} color="#FFC83E" />{' '}
                      {/* React Icon for Application Manager */}
                    </div>
                    <CCardText>
                      Enter quarters in each town. The quarter name must be unique. To enter
                      Quarters, name and GPS information is required.
                    </CCardText>
                    <Link to="/user-access/manage-quota">
                      <CButton color="primary">Manage Quota</CButton>{' '}
                      {/* Updated button text for clarity */}
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>


              <CCol xs={6} className="mt-3">
                <CCard>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center', // Changed to align-items for better vertical alignment
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                      }}
                    >
                      {/* Icon for Application Manager */}
                      <CCardTitle>Manage Kindred </CCardTitle>
                      <GoPeople size={50} color="#212631" />{' '}
                      {/* React Icon for Application Manager */}
                    </div>
                    <CCardText>
                      Enter kindreds in each town. The kindred must be unique. To enter Kindred, a
                      name and GPS is required.
                    </CCardText>
                    <Link to="/user-access/manage-kindred">
                      <CButton color="primary">Manage Kindred</CButton>{' '}
                      {/* Updated button text for clarity */}
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
