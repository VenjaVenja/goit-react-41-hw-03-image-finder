import propTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({smallImage, largeImage, description, openModal}) => (
  <Item className="gallery-item" onClick={openModal}>
    <Image src={smallImage}
      alt={description} 
      data-large={largeImage}
    />
  </Item>
);

ImageGalleryItem.propTypes = {
  smallImage: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  openModal: propTypes.func.isRequired,
};