import React, {Component} from 'react';
import {Card, CardItem, Text, Body, Thumbnail} from 'native-base';

export default class ItemComp extends Component {
  render() {
    const {randomNumber} = this.props;
    return (
      <Card>
        <CardItem header>
          <Text>
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>But first, a word from our sponsors:</Text>
            <Thumbnail square large source={{uri: `http://localhost:3000/ads/?r=${randomNumber}`}} />
          </Body>
        </CardItem>
      </Card>
    );
  }
}
