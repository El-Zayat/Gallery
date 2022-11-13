import axios from 'axios'

class Profile {
  constructor() {
    this.url = 'http://localhost:3000'
  }
  
  // TODO - Remove this.url from all the methods below

  async uploadAvatar(id, avatar) {
    return axios.patch('/user/me/avatar/' + id, avatar, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

}

export default new Profile