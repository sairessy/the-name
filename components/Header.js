import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.props = props;
  }

  render() {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: !this.props.border ? '#ddd' : '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff'
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 35, height: 35}}
          />
          <Text style={{fontWeight: '100', color: '#000', fontSize: 24}}>The Name</Text>
        </View>
        {this.props.bars}
      </View>
    );
  }
}
