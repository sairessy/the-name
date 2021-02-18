import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class CatItem extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <View
        style={{
          borderBottomColor: '#f9f9f9',
          borderBottomWidth: 1
        }}
      >
        {this.props.btn}
      </View>
    );
  }
}