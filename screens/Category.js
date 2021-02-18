
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CatItem from '../components/CatItem';

export default class Category extends React.Component {
  render() {
    return (
      <View
      style={{
        width: 270,
        bottom: 0,
        top: 0,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#eee',
        position: 'absolute'
      }}
    >

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          padding: 5
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '100'
          }}
        >
          Categorias
        </Text>
      </View>

      <ScrollView>
        {categories.map(c=> {
          return (
            <CatItem 
              key={c.id}
              btn={
                <TouchableOpacity
                  onPress={()=> {
                    this.selectedCategory(c.id);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: c.id === this.category ? '#C2185B' : '#666',
                      fontWeight: '100',
                      marginLeft: 5
                    }}
                  >
                    {c.name}
                  </Text>
                </TouchableOpacity>
              }
            />);
          })}
      </ScrollView>

    </View>

    );
  }
}