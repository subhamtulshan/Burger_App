import axios from 'axios';


const instance=axios.create(
    {
        baseURL:'https://burger-app-b8472.firebaseio.com/'
    }
)

export default instance;