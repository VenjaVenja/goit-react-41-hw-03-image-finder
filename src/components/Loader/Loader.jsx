import { LoaderWrapper } from "./Loader.styled";
import { Bars } from "react-loader-spinner";

export const LoaderBars = () => (
    <LoaderWrapper>
        <Bars color="#24292f" height={80} width={80} />
    </LoaderWrapper>
);
