import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const Page = ({ title, children }, context) => (
    <div style={{ height: '100%' }}>
        <Card className="Login" title={title}>
            {children}
        </Card>
    </div>
);

Page.propTypes = {};
Page.defaultProps = {};
Page.contextTypes = {
    antLocale: PropTypes.object
};


export default Page;
