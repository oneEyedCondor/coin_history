import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchInterval, updateInterval } from '../store/actions/interval';
import ScanInterval from '../components/ScanInterval';

const mapStateToProps = ({ interval }) => ({
    interval: interval.value,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ fetchInterval, updateInterval }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScanInterval);
