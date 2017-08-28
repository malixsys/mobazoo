import React from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import initStore from '../store/initStore';
import { callLogin } from '../store/authDucks';
import Page from '../components/Page';
import Layout from '../components/MainLayout';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

const LoginForm = (props) => {
    const { getFieldDecorator, validateFields, resetFields } = props.form;
    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    };
    const handleReset = () => {
        resetFields();
        message.info('The form was reset.');
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }]
                })(
                    <Input type="email" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="email" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                        placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <ButtonGroup>
                    <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                        Clear
                    </Button>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </ButtonGroup>
            </FormItem>
        </Form>
    );
};

const WrappedNormalLoginForm = Form.create()(LoginForm);

const Login = ({ isLoading, actions }) => (
    <Layout title="Login • Mobazoo" pathname="/login">
        <Page>
            {isLoading && (
                <Spin size="large" />
            )}
            {!isLoading && (
                <WrappedNormalLoginForm
                    onSubmit={actions.callLogin}
                />
            )}
        </Page>
    </Layout>
);


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ callLogin }, dispatch)
});

export default withRedux(initStore, state => state.auth, mapDispatchToProps)(Login);
