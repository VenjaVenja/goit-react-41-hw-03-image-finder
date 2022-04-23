import propTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({smallImage, largeImage, toggleModal, openModalLargeImg}) => (
  <Item>
    <Image
      src={smallImage}
      onClick={() => {
        toggleModal()
        openModalLargeImg(largeImage)
      }} />
  </Item>
);

ImageGalleryItem.propTypes = {
  smallImage: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  toggleModal:propTypes.func.isRequired,
  openModalLargeImg: propTypes.func.isRequired,
};