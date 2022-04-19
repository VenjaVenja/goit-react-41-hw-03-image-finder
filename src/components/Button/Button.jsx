import propTypes from 'prop-types';
import { LoadMoreBtn } from "./Button.styled";

export const Button = ({ onClick }) => (
    <LoadMoreBtn onClick={onClick}>Load more</LoadMoreBtn>
);

Button.propTypes = {
    onClick: propTypes.func.isRequired,
};