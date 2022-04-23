import propTypes from "prop-types";
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images, toggleModal, openModalLargeImg}) => (
    <List>
        {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                largeImage={largeImageURL}
                openModalLargeImg={openModalLargeImg}
                toggleModal={toggleModal}
            />
        ))}
    </List>
);

ImageGallery.propTypes = {
    images: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.number.isRequired,
            webformatURL: propTypes.string.isRequired,
            largeImageURL: propTypes.string.isRequired,
        })).isRequired,
    toggleModal:propTypes.func.isRequired,
    openModalLargeImg: propTypes.func.isRequired,
};