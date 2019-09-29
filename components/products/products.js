import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import axios from 'axios';

import HeaderComp from './header';
import ItemComp from './item';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'id',
      products: [],
      tempProducts: [],
      randomNumber: null,
      loading: false,
      loadingMore: false,
      isBottom: false,
      isEnd: false,
      page: 1,
      open: false,
      anchorEl: null,
    };
  }

  componentDidMount = () => {
    this.setState({loading: true});
    this.fetchProducts();
    this.fetchAds();
  };

  fetchProducts = (isTemp = false, forceAdd = false) => {
    const {page, sort} = this.state;
    const apiUrl = `http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${sort}`;

    axios.get(apiUrl).then(res => {
      if (res.data.length === 0) {
        this.setState({isEnd: true});
        return;
        // return document.removeEventListener('scroll', this.trackScrolling);
      }
      this.setState({page: this.state.page + 1});
      const products = res.data;

      if (!isTemp) {
        // document.addEventListener('scroll', this.trackScrolling);
        return this.setState({
          products,
          loading: false,
        });
      } else if (isTemp && !forceAdd) {
        return this.setState({tempProducts: products, loadingMore: true});
      }

      //   document.addEventListener('scroll', this.trackScrolling);
      this.fetchAds();
      return this.setState({
        products: this.state.products.concat(products),
        tempProducts: [],
        loadingMore: false,
        loading: false,
      });
    });
  };

  fetchAds = () => {
    const {randomNumber} = this.state;
    const max = 10;
    let newRandomNumber = Math.floor(Math.random() * 1000);
    newRandomNumber = (parseInt(newRandomNumber, 10) % max) + 1;
    if (!randomNumber || randomNumber !== newRandomNumber) {
      return this.setState({
        randomNumber: newRandomNumber,
      });
    }
    this.fetchAds();
  };

  render() {
    const {products, loading, randomNumber, isEnd} = this.state;
    return (
      <Container>
        <HeaderComp />
        <Content>
          {products.length > 0 &&
            products.map(product => (
              <ItemComp key={product.id} product={product} />
            ))}
        </Content>
      </Container>
    );
  }
}
