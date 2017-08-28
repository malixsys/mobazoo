/* eslint-disable react/prop-types */
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import initStore from '../store/initStore';
import Page from '../components/Page';
import Layout from '../components/MainLayout';
import { callGetProfile } from '../store/profileDucks';

class Profile extends React.Component {
    static getInitialProps({ isServer }) {
        return { isServer };
    }

    componentDidMount() {
        this.props.actions.callGetProfile();
    }

    render() {
        const { data: profile = {} } = this.props.profile;
        const { data = {} } = this.props.auth;
        const { user } = data;
        return (
            <Layout title="Profile • Mobazoo" pathname="/profile">
                {user && (
                    <Page>
                        <p><b>User : </b><em>{user.name}</em></p>
                        <p><b>Server : </b><em>{this.props.isServer ? 'TRUE' : 'FALSE'}</em></p>
                        <p><b>Profile : </b><pre>{JSON.stringify(profile, 0, 2)}</pre></p>
                    </Page>
                )}
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ callGetProfile }, dispatch)
});
const mapStateToProps = state => ({ auth: state.auth, profile: state.profile });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Profile);
