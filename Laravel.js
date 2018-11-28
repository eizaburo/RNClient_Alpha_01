//axios
import axios from 'axios';


//定数
//Host
const HOST = 'http://localhost:8000';

//URL
const TOKEN_URL = HOST + '/oauth/token';
const USER_URL = HOST + '/api/user';

//パラメータ
const CLIENT_ID = '2';
const GRANT_TYPE = 'password';
const CLIENT_TOKEN = '6kjaYUMN2xGHbLksa62IE9KhChZH4bcp4Bwxk9Zi';


//access_tokenの取得
export const getToken = async (email, password) => {

    //emailとpasswordでaccess_tokenを取得
    const response_token = await axios.post(TOKEN_URL, {
        grant_type: GRANT_TYPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_TOKEN,
        username: email,
        password: password,
    });

    return response_token.data.access_token;
}

//取得したtokenをheaderにセットしてuserの取得
export const getUser = async (bearer) => {
    const user = await axios.get(USER_URL, { 'headers': { 'Authorization': bearer } });
    return user.data;
}

//register
export const registerUser = async (name, email, password) => {
    const register = await axios.post('http://localhost:8000/api/register', {
        name: name,
        email: email,
        password: password
    });
    //一応ユーザーを返す
    return register.data.user;
}