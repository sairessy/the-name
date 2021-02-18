import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Rounded extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.roundedBtn}>
            <Image source={require('../../assets/icons/facebook-square.svg')} 
              style={{
                width: 25, 
                height: 25,
              }}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  roundedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  }
});