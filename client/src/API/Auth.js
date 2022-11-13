import axios from 'axios';

class API {

  constructor() {
    this.url = 'http://localhost:3000'
  }

  // TODO - Remove this.url from all the methods below

  async login(email, password) {

    let data = { email, password }
    return axios.post('/user/login', data)

  }

  async register(email, password, name) {

    let data = { name, email, password }
    return axios.post('/user/register', data)

  }

  checkAuth(token) {
    return axios.post('/user/me', {token})
  }

}

export default new API