import React, {Component} from 'react';
import {Container, Spinner, Content, Text} from 'native-base';
import {ScrollView} from 'react-native';
import axios from 'axios';

import HeaderComp from './header';
import AdsComp from './ads';
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

  addMoreProducts = () => {
    // document.addEventListener('scroll', this.trackScrolling);
    this.fetchAds();
    this.setState(
      {
        loading: false,
        loadingMore: false,
        products: this.state.products.concat(this.state.tempProducts),
      },
      () => {
        this.setState({
          tempProducts: [],
        });
      },
    );
  };

  fetchProducts = (isTemp = false, forceAdd = false) => {
    const {page, sort} = this.state;
    const apiUrl = `http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${sort}`;

    axios.get(apiUrl).then(res => {
      if (res.data.length === 0) {
        return this.setState({isEnd: true});
        // return;
        // return document.removeEventListener('scroll', this.trackScrolling);
      }
      this.setState({page: this.state.page + 1, isBottom: false});
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

  renderLoading = () => {
    return <Spinner color="blue" />;
  };

  renderEndCatalogue = () => {
    return (
      <Text style={{textAlign: 'center', padding: 10}}>
        ~ End of Catalogue ~
      </Text>
    );
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  render() {
    const {products, loading, randomNumber, isEnd} = this.state;
    return (
      <Container>
        <HeaderComp />
        <Content
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent) && !this.state.isBottom) {
              this.setState({loading: true, isBottom: true}, () => {
                if (this.state.tempProducts.length === 0) {
                  return this.fetchProducts(true, true);
                }
                this.addMoreProducts();
              });
            }
          }}>
          <AdsComp randomNumber={randomNumber} />
          {products.length > 0 &&
            products.map(product => (
              <ItemComp key={product.id} product={product} />
            ))}
          {loading && this.renderLoading()}
          {isEnd && this.renderEndCatalogue()}
        </Content>
      </Container>
    );
  }
}
