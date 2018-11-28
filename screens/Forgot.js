import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import { Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

//axios
import axios from 'axios';

class Forgot extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => this.handleForgot(values, { setSubmitting })}
                        validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('emailの形式で入力して下さい。')
                                .required('emailは必須です。')
                                .test('mail_exist', 'メールが存在しません。', async (value) => {
                                    const res = await axios.post('http://localhost:8000/api/ismailexist', { email: value });
                                    if (res.data.exist === true) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting }) => (
                                <Card title='パスワード忘れ'>
                                    <FormLabel>Email</FormLabel>
                                    <FormInput
                                        autoCapitalize='none'
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                    />
                                    {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                    <Button
                                        title='リセットメールを送信'
                                        onPress={handleSubmit}
                                        buttonStyle={{ marginTop: 20 }}
                                        loading={this.state.spinner}
                                        disabled={isSubmitting}
                                    />
                                </Card>
                            )
                        }
                    </Formik>
                </ScrollView>
            </View>
        );
    }

    //サインアウトボタン押したとき
    handleForgot = async (values, { setSubmitting }) => {

        //spinner on
        this.setState({ spinner: true });

        try {
            const reset = await axios.post('http://localhost:8000/api/password/email', { email: values.email });
            //spinner off
            this.setState({ spinner: false });
            setSubmitting(false);
            alert('メールを送信しました。');
        } catch (error) {
            console.log(error);
            //spinner off
            this.setState({ spinner: false });
            setSubmitting(false);
            alert('メールの送信に失敗しました。');
        }
    }
}

export default Forgot;