import { Component } from "react";
import propTypes from "prop-types";
import { FaSearchengin } from "react-icons/fa";
import { Header, Form, Button, SearchSvg, Input} from "./Searchbar.styled";
// import { toast } from "react-toastify";

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };

  state = {
    searchImg: '',
  }

  onImgChange = event => {
    const searchImg = event.currentTarget.value;
    this.setState({ searchImg: searchImg.toLowerCase() });
    // console.log(this.state.searchImg);
  };

  // onResetForm = () => {
  //   this.setState({ searchImg: '', })
  // };

  heandleSubmit = event => {
    event.preventDefault();

    const { searchImg } = this.state;

    if (searchImg.trim() === '') {
      alert('Your request is not correct.');
      return;
    };

    this.props.onSubmit(searchImg);
    // this.onResetForm();
  };

  render() {
    const { searchImg } = this.state;
    const { onImgChange, heandleSubmit } = this;
    //  console.log(this.state.searchImg);

    return (
      <Header>
        
        <Form onSubmit={heandleSubmit}>
          
          <Button type="submit">
            <SearchSvg><FaSearchengin/></SearchSvg>
          </Button>

          <Input
            type="text"
            name="searchImg"
            value={searchImg}
            onChange={onImgChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    )
  }
};