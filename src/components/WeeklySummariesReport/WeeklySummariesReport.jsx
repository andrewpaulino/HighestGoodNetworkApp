/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './WeeklySummariesReport.css';
import classnames from 'classnames';
import moment from 'moment';
import 'moment-timezone';
import Loading from '../common/Loading';
import { getWeeklySummariesReport } from '../../actions/weeklySummariesReport';
import FormattedReport from './FormattedReport';
import GeneratePdfReport from './GeneratePdfReport';

export class WeeklySummariesReport extends Component {
  state = {
    error: null,
    loading: true,
    summaries: [],
    activeTab: '1',
  };

  async componentDidMount() {
    await this.props.getWeeklySummariesReport();
    this.setState({
      error: this.props.error,
      loading: this.props.loading,
      summaries: this.props.summaries,
    });
  }

  getWeekDates = (weekIndex) => ({
    fromDate: moment()
      .tz('America/Los_Angeles')
      .startOf('week')
      .subtract(weekIndex, 'week')
      .format('MMM-DD-YY'),
    toDate: moment()
      .tz('America/Los_Angeles')
      .endOf('week')
      .subtract(weekIndex, 'week')
      .format('MMM-DD-YY'),
  });

  toggleTab = (tab) => {
    const activeTab = this.state.activeTab;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { error, loading, summaries, activeTab } = this.state;

    if (error) {
      return (
        <Container>
          <Row className="align-self-center" data-testid="error">
            <Col>
              <Alert color="danger">Error! {error.message}</Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    if (loading) {
      return (
        <Container fluid>
          <Row className="text-center" data-testid="loading">
            <Loading />
          </Row>
        </Container>
      );
    }

    return (
      <Container fluid className="bg--white-smoke py-3 mb-5">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <h3 className="mt-3 mb-5">Weekly Summaries Reports page</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  data-testid="tab-1"
                  onClick={() => this.toggleTab('1')}
                >
                  This Week
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  data-testid="tab-2"
                  onClick={() => this.toggleTab('2')}
                >
                  Last Week
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  data-testid="tab-3"
                  onClick={() => this.toggleTab('3')}
                >
                  Week Before Last
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="p-4">
              <TabPane tabId="1">
                <Row>
                  <Col sm="12" md="8" className="mb-2">
                    From <b>{this.getWeekDates(0).fromDate}</b> to{' '}
                    <b>{this.getWeekDates(0).toDate}</b>
                  </Col>
                  <Col sm="12" md="4">
                    <GeneratePdfReport
                      summaries={summaries}
                      weekIndex={0}
                      weekDates={this.getWeekDates(0)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormattedReport summaries={summaries} weekIndex={0} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12" md="8" className="mb-2">
                    From <b>{this.getWeekDates(1).fromDate}</b> to{' '}
                    <b>{this.getWeekDates(1).toDate}</b>
                  </Col>
                  <Col sm="12" md="4">
                    <GeneratePdfReport
                      summaries={summaries}
                      weekIndex={1}
                      weekDates={this.getWeekDates(1)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormattedReport summaries={summaries} weekIndex={1} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12" md="8" className="mb-2">
                    From <b>{this.getWeekDates(2).fromDate}</b> to{' '}
                    <b>{this.getWeekDates(2).toDate}</b>
                  </Col>
                  <Col sm="12" md="4">
                    <GeneratePdfReport
                      summaries={summaries}
                      weekIndex={2}
                      weekDates={this.getWeekDates(2)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormattedReport summaries={summaries} weekIndex={2} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }
}

WeeklySummariesReport.propTypes = {
  error: PropTypes.any,
  getWeeklySummariesReport: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  summaries: PropTypes.array.isRequired,
};

const mapStateToProps = ({ weeklySummariesReport }) => ({
  error: weeklySummariesReport.error,
  loading: weeklySummariesReport.loading,
  summaries: weeklySummariesReport.summaries,
});

export default connect(mapStateToProps, { getWeeklySummariesReport })(WeeklySummariesReport);
