class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    statusResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers
        })
        .then(this.statusResponse)
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: "GET",
            headers: this.headers
        })
        .then(this.statusResponse)
    }

    updateUserData(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.profession
            })
        })
        .then(this.statusResponse)
    }
    
    addNewPlace(data) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this.statusResponse)
    }

    deleteCard(_id) {
        return fetch(`${this.url}/cards/${_id}`, {
            method: "DELETE",
            headers: this.headers
        })
        .then(this.statusResponse)
    }

    putLike(card, isLiked) {
        return fetch(`${this.url}/cards/likes/${card}`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this.headers
        })
        .then(this.statusResponse)
    }

    updateUserAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this.statusResponse)
    }
}

// const api = new Api ({
//     url: "https://mesto.nomoreparties.co/v1/cohort-18",
//     headers: {
//         authorization: "ee7d3d7a-088a-4faf-a6a4-125e05d2a819",
//         "Content-Type": "application/json"
//     }
// });
const api = new Api ({
    url: "https://api.project.mesto.nomoredomains.icu",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
});

export default api