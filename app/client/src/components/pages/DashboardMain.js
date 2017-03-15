import React from 'react';
import Content from '../helpers/content';
import ChartFilter from '../charts/Filter';
import {ChartTabs} from '../dashboard';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {studentKeys} from '../../../../common/fieldKeys';
import _ from 'lodash';
import {validateArray} from '../../../../common/constants';
const studentKeysObj = _.keyBy(studentKeys, 'dbName');

class DashboardMain extends React.Component {
    constructor(props) {
        super(props);
        this.update = false;
        this.state = {
            filteredStudents: []
        };
    }

    handleSubmit(values) {
        this.update = true;
        let conditions = _(values).omitBy(_.isNil).cloneDeep();
        const { students } = this.props;
        const hsGPA = conditions.hsGPA;
        delete conditions.hsGPA;
        const arrayConditions = _(conditions).pickBy((value, key) => (
            studentKeysObj[key].fieldType === 'Checkbox'
        )).value();
        conditions = _.omit(conditions, _.keys(arrayConditions));
        let filteredStudents = _(students)
            .filter(conditions);
        filteredStudents = filteredStudents
            .filter((student) => {
                let take = true;
                _.forOwn(arrayConditions, (value, key) => {
                    if (!validateArray(value, student[key])) {
                        take = false;
                        return false;
                    }
                });
                return take;
            });
        if (!(hsGPA.min === 0 && hsGPA.max === 100)) {
            filteredStudents = filteredStudents
                .filter((student) => {
                    return student.hsGPA > hsGPA.min && student.hsGPA < hsGPA.max;
                });
        }
        this.setState({
            filteredStudents
        });
    }

    shouldComponentUpdate() {
        if (this.update) {
            this.update = false;
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.students.length === 0 && nextProps.students.length > 0) {
            this.update = true;
            this.setState({
                filteredStudents: nextProps.students
            });
        }
    }

    componentDidMount() {
        const { students } = this.props;
        if (students.length > 0) {
            this.update = true;
            this.setState({
                filteredStudents: students
            });
        }
    }

    render() {
        return (
            <Content title='Welcome'>
                <ChartFilter handleFormSubmit={this.handleSubmit.bind(this)} />
                <ChartTabs students={this.state.filteredStudents} colleges={this.props.colleges} />
            </Content>
        );
    }
}

DashboardMain = reduxForm({
    form: 'chartFilterStudents'
})(DashboardMain);

const mapStateToProps = (state) => {
    return {
        students: state.students.value,
        colleges: state.colleges.value
    };
};

DashboardMain = connect(mapStateToProps)(DashboardMain);

export default DashboardMain;
