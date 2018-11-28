import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//axios
import axios from 'axios';

class SignIn extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ paddingVertical: 20, flex: 1 }}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            email: 'user1@test.com',
                            password: 'testtest',
                        }}
                        onSubmit={values => this.handleSignIn(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('emailの形式で入力して下さい。')
                                .required('emailは必須です。'),
                            password: Yup
                                .string()
                                .min(4, '4文字以上で入力してください。')
                                .required('パスワードは必須です。'),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
                                <Card title='サインイン'>
                                    <FormLabel>Email</FormLabel>
                                    <FormInput
                                        autoCapitalize='none'
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                    {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                    <FormLabel>パスワード</FormLabel>
                                    <FormInput
                                        autoCapitalize='none'
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry
                                    />
                                    {(touched.password && errors.password) && <FormValidationMessage>{errors.password}</FormValidationMessage>}
                                    <Button
                                        title='サインイン'
                                        onPress={handleSubmit}
                                        buttonStyle={{ marginTop: 20 }}
                                        backgroundColor='#03A9F4'
                                        loading={this.state.spinner}
                                    />
                                    <Button
                                        title='パスワード忘れ'
                                        onPress={() => this.handleForgot()}
                                        buttonStyle={{ marginTop: 30 }}
                                    />
                                </Card>
                            )
                        }
                    </Formik>
                    <Card title='サインアップ'>
                        <Button
                            title='サインアップ'
                            onPress={() => this.handleSignUp()}
                            buttonStyle={{ marginTop: 0 }}
                            backgroundColor='#6666FF'
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }

    //サインインボタン押したとき
    handleSignIn = async (values) => {

        //spinner on
        this.setState({ spinner: true });

        //値の取得
        const email = values.email;
        const password = values.password;

        try {
            //token要求
            const response_token = await axios.post('http://localhost:8000/oauth/token', {
                grant_type: 'password',
                client_id: '2',
                client_secret: '6kjaYUMN2xGHbLksa62IE9KhChZH4bcp4Bwxk9Zi',
                username: email,
                password: password,
            });
            const access_token = response_token.data.access_token;
            //取得したtokenでユーザー情報取得
            const AuthStr = 'Bearer ' + access_token;
            const user = await axios.get('http://localhost:8000/api/user', { 'headers': { 'Authorization': AuthStr } });

            //spinner off（とりあえずこの位置に入れる。移動の前だとwarning）
            this.setState({ spinner: false });

            //取得した情報をstoreにセット（セッションセット）
            user.data.access_token = access_token;
            this.props.updateUserData(user.data);

            //移動
            this.props.navigation.navigate('SignedIn');

        } catch (error) {
            console.log(error);
            //spinner off
            this.setState({ spinner: false });
            if (error.message === 'Network Error') {
                alert('サーバに接続できません。');
            } else {
                alert('サインインに失敗しました。');
            }
        }
    }

    //サインアップボタン押したとき
    handleSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    //Forgotボタン押したとき
    handleForgot = () => {
        this.props.navigation.navigate('Forgot')
    }
}

//redux
const mapStateToProps = state => (
    {
        state: state,
    }
);

const mapDispatchToProps = dispatch => (
    {
        updateUserData: (user) => dispatch(updateUserData(user)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn;