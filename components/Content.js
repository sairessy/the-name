import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return(
      <View>
        <Text style={styles.title}>Vitaminas</Text>
        <View style={{flexDirection: 'row', padding: 5, flexWrap: 'wrap'}}>
          {this.props.data.vitamins.map(name=>{
            return <TouchableOpacity style={styles.link} key={name}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff'
                }}
              >{name}
              </Text>
              </TouchableOpacity>
          })}
        </View>
          
        <Text style={styles.title}>Proteínas</Text>
        <View style={{flexDirection: 'row', padding: 5, flexWrap: 'wrap'}}>
          {this.props.data.proteins.map(name=>{
            return <TouchableOpacity style={styles.link} key={name}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff'
                }}
              >
                {name}
              </Text>
              </TouchableOpacity>
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 5,
    color: '#999',
    fontSize: 22,
    fontWeight: '100'
  },

  link: {
    borderRadius: 5,
    backgroundColor: '#C2185B',
    color: '#999',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    marginBottom: 5
  }
});