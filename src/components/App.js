import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import api from "../utils/api.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
    const [isEditProfilePopupOpen, setIsOpenPopupProfile] = React.useState(false)
    const [isAddPlacePopupOpen, setIsOpenPopupPlace] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsOpenPopupAvatar] = React.useState(false)
    const [isImagePopupOpen, setIsOpenPopupImage] = React.useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [deletedCard, setDeletedCard] = React.useState(null)

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([UserData, InitialCards]) => {
                setCurrentUser(UserData)
                setCards(InitialCards)
            })
            .catch((error) => console.error(error))
    }, []);

    function handleEditProfileClick() {
        setIsOpenPopupProfile(true)
        document.addEventListener('keydown', handleEscClose);
    }

    function handleAddPlaceClick() {
        setIsOpenPopupPlace(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleEditAvatarClick() {
        setIsOpenPopupAvatar(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsOpenPopupImage(true)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleDeleteClick(card) {
        setIsConfirmPopupOpen(true)
        setDeletedCard(card)
        document.addEventListener("keydown", handleEscClose);
    }

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains("popup_is-opened")) {
            closeAllPopups()
        }
    }

    function handleEscClose(evt) {
        if (evt.key === "Escape") {
            closeAllPopups()
        }
    }

    function closeAllPopups() {
        setIsOpenPopupProfile(false)
        setIsOpenPopupPlace(false)
        setIsOpenPopupAvatar(false)
        setIsOpenPopupImage(false)
        setIsConfirmPopupOpen(false)
        // setSelectedCard(null)

        document.removeEventListener("keydown", handleEscClose);
    }

    function handleUpdateProfile(data) {
        api.getUserData(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    function handleAddNewCard(card) {
        api.addNewPlace(card)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    function handleUpdateAvatar(data) {
        api.updateUserAvatar(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)

        api.putLike(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                setCards(newCards)
            })
            .catch((error) => console.error(error))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id)
                setCards(newCards)
                setDeletedCard({})
                closeAllPopups()
            })
            .catch((error) => console.error(error))
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    cards={cards}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateProfile}
                    onClick={handleOverlayClose}
                    title="Редактировать профиль"
                    captionButton="Сохранить"
                    popupName="profile"
                    formName="profile"
                />

                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddNewCard}
                    onClick={handleOverlayClose}
                    title="Новое место"
                    captionButton="Создать"
                    popupName="gallery"
                    formName="gallery"
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClick={handleOverlayClose}
                    title="Обновить аватар"
                    captionButton="Сохранить"
                    popupName="avatar"
                    formName="avatar"
                />

                <ImagePopup 
                    card={selectedCard} 
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    onClick={handleOverlayClose}
                />
                
                <ConfirmPopup 
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    onClick={handleOverlayClose}
                    card={deletedCard}
                />
                    
            </div>
        </CurrentUserContext.Provider>
    )
  }
  
  export default App

