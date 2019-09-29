import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
export default class HeaderComp extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="list" />
          </Button>
        </Left>
        <Body>
          <Title>Products Grid</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
