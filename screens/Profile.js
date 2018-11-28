import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ paddingVertical: 20, flex: 1 }}>
                <ScrollView>
                    <Card title='ユーザー情報'>
                        <FormLabel>ID</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.id}
                            editable={false}
                        />
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.name}
                            editable={false}
                        />
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.email}
                            editable={false}
                        />
                    </Card>
                    <Card title='サインアウト'>
                        <Button
                            title='サインアウト'
                            onPress={() => this.handleSignOut()}
                            buttonStyle={{ marginTop: 20 }}
                            borderRadius={20}
                            icon={{name: 'sign-out', type: 'font-awesome'}} 
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }

    //サインアウトボタン押したとき
    handleSignOut = () => {

        //更新用userデータ
        const user = {
            id: 0,
            name: '',
            email: '',
            access_token: '',
        }

        //更新
        this.props.updateUserData(user);

        //移動
        this.props.navigation.navigate('SignedOut')
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// export default Profile;