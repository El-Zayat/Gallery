import axios from 'axios';

class API {

  constructor() {
    this.url = 'http://localhost:3000'
  }

  // TODO - Remove this.url from all the methods below

  uploadImage(formData, user) {
    return axios.post(this.url + `/images/${user}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  getAllImages() {
    return axios.get(this.url + '/images')
  }

  getUserImages(id) {
    return axios.get(this.url + `/user/${id}/images`)
  }

  likeImage(id, userId) {
    return axios.post(this.url + `/image/${id}/like/${userId}`)
  }

  deleteImage(id) {
    return axios.delete(this.url + `/user/image/${id}`)
  }

}

export default new API