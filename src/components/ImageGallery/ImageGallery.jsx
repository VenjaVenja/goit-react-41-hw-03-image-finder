import propTypes from "prop-types";
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images, openModal}) => (
    <List className="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
                key={id}
                smallImage={webformatURL}
                description={tags}
                largeImage={largeImageURL}
                openModal={openModal}
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
            tags: propTypes.string.isRequired,
        })),
    openModal: propTypes.func.isRequired,
};