import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage, Card } from 'react-native-elements';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    DrawerItems,
    createAppContainer,
    NavigationActions
} from 'react-navigation';

//redux
import { Provider } from 'react-redux';
import createStore from './createStore';
import { connect } from 'react-redux';
import { updateUserData } from './actions/userAction';
const mapStateToProps = state => ({ state: state });
const mapDispatchToProps = dispatch => ({ updateUserData: (user) => dispatch(updateUserData(user)) });

//persist
import { PersistGate } from 'redux-persist/integration/react';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';

//各screenの読み込み
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';
import Drawer from './screens/Drawer';
import Identiry from './screens/Identiry';

//Tab（ヘッダを表示するためstackを入れ子に）
const HomeTab = createBottomTabNavigator(
    {
        Home: {
            screen: createStackNavigator({ screen: Home }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />
            }
        },
        Identiry: {
            screen: createStackNavigator({ screen: Identiry }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="qrcode" color={tintColor} />
            }
        },
        Profile: {
            screen: createStackNavigator({ screen: Profile }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#0099FF',
                    },
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#fff' />
                    ),
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="user" color={tintColor} />
            }
        }
    }, {
        tabBarOptions: {
            style: {
                backgroundColor: '#0099FF',
            },
            inactiveTintColor: '#ccc',
            activeTintColor: '#fff'
        }
    }
);

//SignedIn(Tab + Drawer)
const SignedIn = createDrawerNavigator(
    {
        Home: { screen: HomeTab },
    },
    {
        contentComponent: Drawer,
    }
);

//SignedOut(Stack)
const SignedOut = createStackNavigator(
    {
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp },
        Forgot: { screen: Forgot }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#0099FF',
            },
            headerTintColor: '#fff', // < Back ボタンの色変更
        },
    }
);

//switch layout
class SwitchLayout extends React.Component {
    render() {
        let signedIn = false;
        const stored_access_token = this.props.state.userData.user.access_token;
        if (stored_access_token !== '' && stored_access_token !== undefined) signedIn = true;

        const SignedInAppContainer = createAppContainer(SignedIn);
        const SignedOutAppContainer = createAppContainer(SignedOut);

        if (signedIn) {
            return (<SignedInAppContainer />);
        } else {
            return (<SignedOutAppContainer />);
        }

    }
}
const SiwtchLayoutContainer = connect(mapStateToProps, null)(SwitchLayout);

//store & persistor
const { store, persistor } = createStore();

//App
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SiwtchLayoutContainer />
                </PersistGate>
            </Provider>
        );
    }
}
