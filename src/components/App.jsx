import { Component } from "react";
// import { ToastContainer } from "react-toastify";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { LoaderBars } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchAPI } from "services/api";
import { Button } from "./Button/Button";
import { HelloText } from "./HelloText/HelloText";
// import scrollSmooth from "../services/scrollSmooth"

export class App extends Component {

  state = {
    searchImg: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    modalLargeImg: null,
  };

  componentDidMount() {
    this.setState({ images: [] })
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchImg;
    const nextSearch = this.state.searchImg;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ images: [], page: 1, });
      ///включаем лоудер
      this.setState({ isLoading: true });
      ///запрос на сервер
      this.fetchImages();
    }

    if (nextPage > prevPage) {
      this.setState({ isLoading: true });
      
      this.fetchImages();
    };

    // scrollSmooth();
  };

  fetchImages = () => {
    const { searchImg, page } = this.state;

    fetchAPI(searchImg, page).then(response => {
      this.setState(prevState => ({
        images: [...prevState.images, ...response],
      }))
    })
      .catch(error => this.setState({ error })) ///ловим ошибку
      .finally(() => this.setState({ isLoading: false })) ///отключение лоудера
  };


  onSearchImg = searchImg => {
    this.setState({ searchImg });
  };

  onNextPageSearch = () => {
    this.setState(prevState => ({
      page: prevState.page + 1

    }))
  };

  openModalLargeImg = image => {
    this.setState({ modalLargeImg: image });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {

    const { toggleModal, onSearchImg, openModalLargeImg, onNextPageSearch } = this;
    const { images, isLoading, showModal, modalLargeImg} = this.state;
    const imagesArrayLength = images.length;

    return (
      <>
        <Searchbar onSubmit={onSearchImg} />

        {imagesArrayLength === 0 && !isLoading && <HelloText text="Hai! What`s you looking for?" />}

        {imagesArrayLength > 0 && <ImageGallery images={images} toggleModal={toggleModal} openModalLargeImg={openModalLargeImg} />}

        {isLoading && <LoaderBars />}

        {imagesArrayLength > 0 && <Button onClick={onNextPageSearch} />}

        {showModal && (<Modal
          onClose={toggleModal}
          largeImage={modalLargeImg}
        />)}
      </>
    );
  }
};