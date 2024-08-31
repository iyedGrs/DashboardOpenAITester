/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsB,
} from '@coreui/react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const vulnerabilities = useSelector((state) => state.AiData) || []
  console.log('this is data from Dashboard', vulnerabilities)
  // const vulnerabilities = [
  //   {
  //     vulnerability: 'SQL Injection',
  //     description: 'A code injection technique that might destroy your database.',
  //     priority: 'High',
  //     risk: 'Critical',
  //     status: 'Resolved',
  //     CWE: 'CWE-89',
  //     recommendation: 'Use parameterized queries.',
  //     implementedMeasures: 'Parameterized queries implemented.',
  //   },
  //   {
  //     vulnerability: 'Cross-Site Scripting (XSS)',
  //     description: 'Allows attackers to inject scripts into web pages viewed by others.',
  //     priority: 'Medium',
  //     risk: 'Moderate',
  //     status: 'Resolved',
  //     CWE: 'CWE-79',
  //     recommendation: 'Use proper input validation.',
  //     implementedMeasures: 'Input validation and sanitization implemented.',
  //   },
  //   {
  //     vulnerability: 'Command Injection',
  //     description: 'Allows attackers to execute arbitrary commands on the server.',
  //     priority: 'High',
  //     risk: 'Critical',
  //     status: 'Open',
  //     CWE: 'CWE-78',
  //     recommendation: 'Use proper validation and sanitization.',
  //     implementedMeasures: 'None implemented yet.',
  //   },
  //   {
  //     vulnerability: 'Path Traversal',
  //     description:
  //       'Allows attackers to access directories and execute commands outside of the web root directory.',
  //     priority: 'High',
  //     risk: 'Critical',
  //     status: 'Open',
  //     CWE: 'CWE-22',
  //     recommendation: 'Validate and sanitize all user inputs.',
  //     implementedMeasures: 'None implemented yet.',
  //   },
  //   {
  //     vulnerability: 'Insecure Deserialization',
  //     description: 'Allows attackers to execute arbitrary code or conduct other malicious actions.',
  //     priority: 'High',
  //     risk: 'Critical',
  //     status: 'Open',
  //     CWE: 'CWE-502',
  //     recommendation: 'Implement security controls like input validation.',
  //     implementedMeasures: 'None implemented yet.',
  //   },
  // ]

  // Calculate percentages
  const totalVulnerabilities = vulnerabilities.length

  // Status
  const resolvedCount = vulnerabilities.filter((v) => v.Status === 'Resolved').length
  console.log('object', resolvedCount)
  const resolvedPercentage = ((resolvedCount / totalVulnerabilities) * 100).toFixed(1)

  // Risk
  const criticalCount = vulnerabilities.filter((v) => v.Risk === 'Critical').length
  const criticalPercentage = ((criticalCount / totalVulnerabilities) * 100).toFixed(1)

  // Priority
  const highPriorityCount = vulnerabilities.filter((v) => v.Priority === 'High').length
  const highPriorityPercentage = ((highPriorityCount / totalVulnerabilities) * 100).toFixed(1)

  return totalVulnerabilities > 0 ? (
    <div>
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsB
            className="mb-3"
            progress={{ value: resolvedPercentage }}
            text="Resolved Vulnerabilities"
            title="Resolved Status"
            value={`${resolvedPercentage}%`}
            color="success"
            inverse
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsB
            className="mb-3"
            color="primary"
            inverse
            progress={{ value: criticalPercentage }}
            text="Critical Risk Vulnerabilities"
            title="Critical Risk"
            value={`${criticalPercentage}%`}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsB
            className="mb-3"
            progress={{ value: highPriorityPercentage }}
            text="High Priority Vulnerabilities"
            title="High Priority"
            value={`${highPriorityPercentage}%`}
            color="warning"
            inverse
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsB
            className="mb-3"
            color="danger"
            inverse
            progress={{ value: 100 - resolvedPercentage }}
            text="Open Vulnerabilities"
            title="Open Status"
            value={`${(100 - resolvedPercentage).toFixed(1)}%`}
          />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>List of Vulnerabilities</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Vulnerability
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Priority
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Risk
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Status
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {vulnerabilities.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">{item.Vulnerability}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.Priority}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.Risk}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.Status}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  ) : (
    <h2>Please check the Vulnerabilities Section</h2>
  ) // Add an else clause to handle the case when totalVulnerabilities is 0
}

export default Dashboard
