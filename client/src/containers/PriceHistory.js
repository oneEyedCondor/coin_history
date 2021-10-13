import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadData, sortData } from '../store/actions/priceHistory';
import PriceHistory from '../components/PriceHistory';

const mapStateToProps = ({ priceHistory }) => ({
    listData: priceHistory.data,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ loadData, sortData }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceHistory);
