import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//barcode
import QRCode from 'react-native-qrcode';

class Identity extends React.Component {
    render() {
        const id = this.props.state.userData.user.id;
        const code = ('0000000000' + id).slice(-10);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                <Text>Identity</Text>
                <Text>{code}</Text>
                <QRCode
                    value={code}
                    size={200}
                    bgColor='black'
                    fgColor='white'
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
// export default Identity;