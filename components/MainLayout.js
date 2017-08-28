import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Icon, Layout, Menu, Spin, LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { callLogout } from '../store/authDucks';

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
    constructor(props, context) {
        super(props, context);
        Router.onRouteChangeStart = (url) => {
            this.setState({ loading: true });
        };
        const complete = () => {
            this.setState({ loading: false });
        };
        Router.onRouteChangeComplete = complete;
        Router.onRouteChangeError = complete;
    }

    state = {
        menuVisible: false,
        loading: false
    };

    componentDidMount () {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                    console.log('service worker registration successful');
                })
                .catch((err) => {
                    console.warn('service worker registration failed', err.message);
                });
        }
    }

    onMenuClick = () => this.setState(prevState => ({ menuVisible: !prevState.menuVisible }));

    onNav = ({ key }) => {
        if (key === 'logout') {
            this.props.actions.callLogout();
            return;
        }
        Router.push(key);
    };

    render() {
        const { children, user, isLoading, actions, pathname, ...rest } = this.props;
        const content = (
            <Content style={{ padding: 24, paddingTop: 64, background: '#fff', minHeight: 280 }}>
                {this.state.loading && (
                    <Spin size="large" />
                )}
                {!this.state.loading && React.Children.map(children, child => React.cloneElement(child, rest))}
            </Content>
        );
        return (
            <LocaleProvider locale={frFR}>
                <Layout>
                    <Sider
                        breakpoint="sm"
                        collapsible
                        collapsedWidth={0}
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark" mode="inline" onClick={this.onNav} selectable={false} selectedKeys={[pathname]}
                        >
                            <Menu.Item key="/">
                                <Icon type="home" />
                                <span>Home</span>
                            </Menu.Item>
                            {!isLoading && user.type && (
                                <Menu.Item key="/profile">
                                    <Icon type="user" />
                                    <span>Profile</span>
                                </Menu.Item>
                            )}
                            {!isLoading && !user.type && (
                                <Menu.Item key="/login">
                                    <Icon type="login" />
                                    <span>Login</span>
                                </Menu.Item>
                            )}
                            {!isLoading && user.type && (
                                <Menu.Item key="logout">
                                    <Icon type="logout" />
                                    <span>Logout</span>
                                </Menu.Item>
                            )}
                        </Menu>
                    </Sider>
                    <Layout>
                        {content}
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }

}

MainLayout.defaultProps = {
    children: null,
    title: 'Mobazoo'
};

MainLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ callLogout }, dispatch)
});

const mapStateToProps = (state) => {
    const { data = {}, isLoading } = state.auth;
    const { user = { name: '<anonymous>' } } = data;
    return { user, isLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
