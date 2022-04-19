import propTypes from "prop-types"
import { Hello } from "./HelloText.styled"

export const HelloText = ({ text }) => (
    <Hello>{text}</Hello>
);

HelloText.propTypes = {
    text: propTypes.string.isRequired,
};