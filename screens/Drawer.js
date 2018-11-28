import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

class Drawer extends React.Component {
    render() {
        return (
            <View style={{ paddingVertical: 60 }}>
                <ScrollView>
                    <Button
                        title='サインアウト'
                        onPress={() => {
                            //更新用userデータ（ログアウト用）
                            const user = {
                                id: 0,
                                name: '',
                                email: '',
                                access_token: ''
                            }
                            //store更新
                            this.props.updateUserData(user);
                            //移動
                            this.props.navigation.navigate('SignedOut');
                        }}
                        borderRadius={20}
                    />
                </ScrollView>
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
// export default Drawer;