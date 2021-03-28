class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
    
    // Показать ошибку в консоли
    showError(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  
    // Получить список всех карточек в виде массива
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'GET',
        headers: this.headers
      })
        .then(res => this.showError(res))
    }
  
    // Добавить карточку
    addNewPlace(card) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(card)
      })
        .then(res => this.showError(res))
    }
  
    // Удалить карточку
    deleteCard(card) {
      return fetch(`${this.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: this.headers
      })
        .then(res => this.showError(res))
    }
  
    // Получить данные пользователя
    getUserData() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
        .then(res => this.showError(res))
    }
  
    // Заменить данные пользователя
    updateUserData({ name, about }) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ name, about })
      })
        .then(res => this.showError(res))
    }
  
    // Заменить аватар
    updateUserAvatar({ avatar }) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ avatar })
      })
        .then(res => this.showError(res))
    }
  
    // Поставить или убрать лайк
    putLike(card, isLiked) {
      if (isLiked) {
        return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
          method: 'DELETE',
          headers: this.headers,
        })
          .then(res => this.showError(res))
      } else {
        return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
          method: 'PUT',
          headers: this.headers,
        })
          .then(res => this.showError(res))
      }
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://api.project.mesto.nomoredomains.icu',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
// class Api {
//     constructor(config) {
//         this._url = config.url;
//         this._headers = config.headers;
//     }

//     statusResponse(res) {
//         if (res.ok) {
//             return res.json();
//         }

//         return Promise.reject(`Ошибка: ${res.status}`)
//     }

//     getUserData() {
//         return fetch(`${this._url}/users/me`, {
//             method: "GET",
//             headers: this._headers
//         })
//         .then(this.statusResponse)
//     }

//     getInitialCards() {
//         return fetch(`${this._url}/cards`, {
//             method: "GET",
//             headers: this._headers
//         })
//         .then(this.statusResponse)
//     }

//     updateUserData(data) {
//         return fetch(`${this._url}/users/me`, {
//             method: "PATCH",
//             headers: this._headers,
//             body: JSON.stringify({
//                 name: data.name,
//                 about: data.profession
//             })
//         })
//         .then(this.statusResponse)
//     }
    
//     addNewPlace(data) {
//         return fetch(`${this._url}/cards`, {
//             method: "POST",
//             headers: this._headers,
//             body: JSON.stringify({
//                 name: data.name,
//                 link: data.link
//             })
//         })
//         .then(this.statusResponse)
//     }

//     deleteCard(_id) {
//         return fetch(`${this._url}/cards/${_id}`, {
//             method: "DELETE",
//             headers: this._headers
//         })
//         .then(this.statusResponse)
//     }

//     putLike(card, isLiked) {
//         return fetch(`${this._url}/cards/likes/${card}`, {
//             method: isLiked ? "DELETE" : "PUT",
//             headers: this._headers
//         })
//         .then(this.statusResponse)
//     }

//     updateUserAvatar(data) {
//         return fetch(`${this._url}/users/me/avatar`, {
//             method: "PATCH",
//             headers: this._headers,
//             body: JSON.stringify({
//                 avatar: data.avatar
//             })
//         })
//         .then(this.statusResponse)
//     }
// }

// const api = new Api ({
//     url: "https://api.project.mesto.nomoredomains.icu",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem('token')}`
//     }
// });

// export default api