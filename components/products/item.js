import React, {Component} from 'react';
import {Card, CardItem, Text, Body} from 'native-base';

import FormatPrice from '../../utils/formatPrice';
import FormatDate from '../../utils/formatDate';

export default class ItemComp extends Component {
  render() {
    const {date, face, price, size} = this.props.product;
    return (
      <Card>
        <CardItem header>
          <Text style={{fontSize: size}}>{face}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Price: ${FormatPrice(price)}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>{FormatDate(date)}</Text>
        </CardItem>
      </Card>
    );
  }
}
