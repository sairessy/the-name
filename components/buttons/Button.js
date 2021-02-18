import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <View>
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#C2185B',
            margin: 5,
            padding: 10,
            borderRadius: 5,
            display: this.props.shown ? 'flex' : 'none'
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              textAlign: 'center',
              fontWeight: '100',
            }}
          >
            {this.props.text}
          </Text>
          </TouchableOpacity>
      </View>
    );
  }
}