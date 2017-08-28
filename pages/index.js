import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../store/initStore';
import Page from '../components/Page';
import Layout from '../components/MainLayout';


const Index = ({ user }) => (
    <Layout title="Mobazoo" pathname="/">
        <Page>
            <p><b>User : </b><em>{user.name}</em></p>
        </Page>
    </Layout>
);

Index.propTypes = {
    user: PropTypes.object.isRequired
};
Index.defaultProps = {};

const mapDispatchToProps = () => ({});
const mapStateToProps = (state) => {
    const { data = {} } = state.auth;
    const { user = { name: '<anonymous>' } } = data;
    return { user };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);
