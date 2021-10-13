import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { paginate } from '../store/actions/priceHistory';
import Pagination from '../components/Pagination';

const mapStateToProps = ({ priceHistory }) => ({
    currentPage: priceHistory.currentPage,
    itemsPerPage: priceHistory.itemsPerPage,
    totalItems: priceHistory.totalItems,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ paginate }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
