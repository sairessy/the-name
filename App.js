import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Text, 
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Animated,
  Dimensions
} from 'react-native';

import Header from './components/Header';
import CatItem from './components/CatItem';
import Icon from './components/Icon';

const categories = [
  {name:'Comida', id: 'food', data: require('./data/food')},  
  {name:'Roupa', id: 'clothes', data: require('./data/clothes')}, 
  // {name:'Ferramentas', id: 'tools', data: require('./data/tools')}, 
  // {name:'Mobília', id: 'mobi', data: require('./data/mobi')},
  {name:'Animais', id: 'pets', data: require('./data/pets')}
];

const screen = {
  width: new Dimensions.get('window').width,
  height: new Dimensions.get('window').height
}

export default class App extends React.Component {
  constructor() {
    super();

    this.category = 'food';

    this.resp = [];

    this.da = categories[0].data.default;

    this.state = {
      focused: false,
      scrollTop: 0,
      answers: this.da,
      selected: this.da[Math.round(Math.random()*(this.da.length - 1))],
      clicked: [],
      btnRestartShown: false,
      categoriesShown: false,
      points: 0,
      anm: new Animated.Value(60 - screen.width)
    }
  }

  checkAnswer(answer) {
    this.resp.push(answer);
    this.setState({clicked: this.resp});

    const correct = answer.toLowerCase() === this.state.selected.name.toLocaleLowerCase();
    for (let i = 0; i < this.state.answers.length; i++) {
      const a = this.state.answers[i];
      if(a.name.toLocaleLowerCase() === this.state.selected.name.toLocaleLowerCase()) {
        this.da[i].answered = true;
        this.da[i].correct = correct;
        this.setState({answers: this.da}, ()=> {
          if(correct) {
            this.setState({points: this.state.points + 1});
            if(this.state.clicked.length < this.state.answers.length) {
              this.change();
            }
          }
        });
        break;
      }  
    }

    if(this.state.clicked.length === this.state.answers.length) {
      let numCorrect = 0;
      this.state.answers.forEach(a=> {
        if(a.correct) {
          numCorrect++;
        }
      });

      const percent = Math.ceil((numCorrect / this.state.answers.length) * 100);

      Alert.alert(`Você acertou ${percent}%`);
      // console.log(`Você acertou ${percent}%`);
      this.setState({btnRestartShown: true});
    }
  }

  change() {
    let r = Math.round(Math.random()*(this.state.answers.length - 1));
    let a = this.state.answers[r];

    while ((a.answered || this.clicked(a.name)) && this.state.clicked.length < this.state.answers.length) {
      r = Math.round(Math.random()*(this.state.answers.length - 1));
      a = this.state.answers[r];
    }

    this.setState({selected: a});
  }

  clicked(txt) {
    let c = false;
    for (let i = 0; i < this.state.clicked.length; i++) {
      const elm = this.state.clicked[i];
      if(txt.toLowerCase() === elm.toLowerCase()) {
        c = true;
      }
    }

    return c;
  }

  disabled(txt) {
    let p = false;

    for (let i = 0; i < this.state.clicked.length; i++) {
      const c = this.state.clicked[i];
      if(txt.toLocaleLowerCase() === c.toLocaleLowerCase()) {
        p = true;
        break;
      }
    }

    return p;
  }

  getImage(text) {
    let img;
    for (let i = 0; i < this.state.answers.length; i++) {
      const element = this.state.answers[i];
      if(text.toLowerCase() === element.name.toLowerCase()) {
        img = element.img;
        break;
      }
    }

    return img;
  }

  restart() {
    this.resp = [];

    this.da.forEach(d=> {
      d.answered = false;
      d.correct = false;
    });

    this.setState({
      focused: false,
      scrollTop: 0,
      selected: this.da[Math.round(Math.random()*(this.da.length - 1))],
      answers: this.da,
      clicked: [],
      btnRestartShown: false,
      categoriesShown: false,
      points: 0,
      anm: new Animated.Value(60 - screen.width)
    });
  }

  selectedCategory(c) {
    this.category = c;
    let category =  [];
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      if(cat.id === c) {
        category = cat;
        break;
      }
    }

    this.resp = [];

    this.da = category.data.default;
    
    this.da.forEach(d=> {
      d.answered = false;
      d.correct = false;
    });

    this.anm(true);

    this.setState({
      focused: false,
      scrollTop: 0,
      selected: this.da[Math.round(Math.random()*(this.da.length - 1))],
      answers: this.da,
      clicked: [],
      btnRestartShown: false,
      categoriesShown: false,
      points: 0,
    });
  }

  anm(shown) {
    const left = shown ? 60 - screen.width : 0;
    
    Animated.timing(this.state.anm, {
      toValue: left,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#fff', flex: 0.5}}>
          <Header
            bars={
              <TouchableOpacity 
                style={{
                  width: 35,
                  height: 35,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: this.state.categoriesShown ? '#fff' : '#fff',
                  borderRadius: 2
                }}
                onPress={()=> {
                  this.setState({categoriesShown: !this.state.categoriesShown});
                  this.anm(this.state.categoriesShown);
                }}
              >
                <Image
                  source={
                    this.state.categoriesShown ? 
                    require('./assets/icons/bars-solid-active.png') : 
                    require('./assets/icons/bars-solid.png')
                  }

                  style={{
                    width: 35, 
                    height: 35
                  }}
                />
              </TouchableOpacity>
            }

            border={this.state.categoriesShown}
          />

          <View
            style={{
              alignItems: 'center',
              // justifyContent: 'center',
              height: 170,
              borderColor: this.state.scrollTop > 0 ? '#ddd' : '#eee',
              backgroundColor: '#fff',
            }}
          >
            <Text 
              style={{
                fontSize: 24,
                fontWeight: '100',
                color: '#000',
                margin: 'auto',
                width: 200,
                textAlign: 'center',
              }} 
            >
              {
                // this.state.selected.name.charAt(0).toUpperCase() + this.state.selected.name.slice(1)
                this.state.selected.name.toUpperCase()
              }
            </Text>
            
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#C2185B',
                top: 20
              }}
            >
              <View
                style={{
                  backgroundColor: '#C2185B',
                  width: (70 / this.state.answers.length) * this.state.points,
                  height: (70 / this.state.answers.length) * this.state.points,
                  borderRadius: 100
                }}
              >
              </View>
            </View>

          </View>
        </View>
        
        <KeyboardAvoidingView
          //  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{
            flex: 0.5,
            paddingTop: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >

            {this.state.answers.map(d=> {
              return <Icon 
                key={d.name}
                  btn={
                  <TouchableOpacity
                    style={{
                      width: screen.width / 8, 
                      height: screen.width / 8,
                      backgroundColor: this.disabled(d.name) ? '#eee' : '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      margin: 5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}

                    disabled={this.disabled(d.name)}

                    onPress={(evt)=> {
                      this.checkAnswer(d.name)
                    }}
                  >

                    <Image
                    style={{
                      width: 30,
                      height: 30
                    }}
                      source={this.getImage(d.name)}
                    />
                  </TouchableOpacity>
                }
              />
            })}
          </View>

          <TouchableOpacity 
            style={{
              width: (screen.width / 8) * 6 + 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: '#C2185B',
              margin: 5,
              padding: 0,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 5,
              display: this.state.btnRestartShown ? 'flex' : 'none'
            }}

            onPress={()=> {
              this.restart();
            }}
          > 
            <Image
              source = {require('./assets/icons/circle-notch-solid.png')}
              style={{
                width: 25, 
                height: 25,
                marginRight: 10
              }}
            />

            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                textAlign: 'center',
                fontWeight: '100',
              }}
            >
              Jogar novamemte
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
        {/* Categories */}
        <Animated.View
          style={{
            width: screen.width - 60,
            left: this.state.anm,
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
                      style={{
                        backgroundColor: c.id === this.category ? '#f9f9f9' : '#fff',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}

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

                      <Text
                        style={{
                          fontSize: 9,
                          color: '#fff',
                          backgroundColor: '#ccc',
                          borderRadius: 25,
                          padding: 2,
                          display: 'none'
                        }}
                      >
                        {'Complete'}
                      </Text>
                    </TouchableOpacity>
                  }
                />);
              })}
          </ScrollView>

        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
