import React from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity 
} from 'react-native';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <View>
        {this.props.btn}
      </View>
    );
  }
}