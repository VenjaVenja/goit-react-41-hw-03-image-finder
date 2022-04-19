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
    isLoading: false,
    error: '',
    showModal: false,
    currentImg: null,
    currentImgDescr: null,
  }

  componentDidMount() {
    this.setState({
      images: [],
    })
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchImg;
    const nextSearch = this.state.searchImg;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ images: [], page: 1,} );
    
       ///включаем лоудер
      this.setState({ isLoading: true });

      ///запрос на сервер
      this.fetchImages(); 
    }

    if (nextPage > prevPage) {
      this.fetchImages()
    };

    // scrollSmooth();
  };

  fetchImages = () => {
    const { searchImg, page } = this.state;

    fetchAPI(searchImg, page).then(response => {
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
      }))
    })
      .catch(error => this.setState({ error })) ///ловим ошибку
      .finally(() => this.setState({ isLoading: false })) ///отключение лоудера
  };
  

  onSearchImg = searchImg => {
    // console.log(searchImg)
    this.setState({ searchImg });
  };

  onNextPageSearch = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  };

  openModal = event => {
    const currentImg = event.target.dataset.large;
    // console.log(event.target.dataset.large)

    const currentImgDescr = event.target.alt;
    // console.log(event.target.alt)

    if (event.target.nodeName === 'IMG') {
      
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImg: currentImg,
        currentImgDescr: currentImgDescr,
      }));
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  

  render() {

    const { toggleModal, onSearchImg, openModal, onNextPageSearch } = this;
    const { images, isLoading, showModal, currentImg, currentImgDescr } = this.state;
    const imagesArrayLength = images.length;

    return (
     <>
        <Searchbar onSubmit={onSearchImg} />

        {imagesArrayLength === 0 && !isLoading && <HelloText text="Hai! What`s you looking for?"/>}

        <ImageGallery
          images={images} 
          openModal={openModal}
          />
        
        {isLoading && <LoaderBars />}
        
        {imagesArrayLength > 0 && <Button onClick={onNextPageSearch} />}

        {showModal && (<Modal
          onClose={toggleModal}
          currentImg={currentImg}
          currentImgDescr={currentImgDescr}
          />)}
    </>
    );
  }
};