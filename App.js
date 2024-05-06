import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableHighlightBase, TouchableHighlight, ScrollView } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default class App extends Component {
    
  state = {
        homePageDisplay: 'block',
        preferencePageDisplay: 'none',
        foodPageDisplay: 'none',
        inputValue: 'Enter your weight (lbs)',
        inputValue1: 'Enter your height (in)',
        bmiValue: 0,
        dietaryPreferences: [
          { placeholder: 'Dairy-Free', detail: 'Excludes all dairy products.' },
          { placeholder: 'Vegetarian', detail: 'No meat. Includes eggs and dairy.' },
          { placeholder: 'Gluten Free', detail: 'No gluten-containing grains.' },
          { placeholder: 'Vegan', detail: 'No dairy or meat.'},
        ],
        mealType: [
          { placeholder: 'Breakfast', detail: 'Meals that are consumed early in the day' },
          { placeholder: 'Lunch', detail: 'Meals that are consumed around noon' },
          { placeholder: 'Main dish', detail: 'Refers to the entree' },
          { placeholder: 'Dinner', detail: 'Meals consumed towards end of the day.'},
        ]
    };

    handleHomePagePress = () => this.setState(state => ({
      homePageDisplay: 'block',
      preferencePageDisplay: 'none',
      foodPageDisplay: 'none'
    }))
    handlePreferencePagePress =() => this.setState(state => ({
      homePageDisplay: 'none',
      preferencePageDisplay: 'block',
      foodPageDisplay: 'none'
    }));

    handlefoodPageDisplay =() => this.setState(state => ({
      homePageDisplay: 'none',
      preferencePageDisplay: 'none',
      foodPageDisplay: 'block'
    }));

    _handleTextChange = inputValue => {
        this.setState({ inputValue });
    };
    
    _handleTextChange1 = inputValue1 => {
        this.setState({ inputValue1 });
    };

    bmiFunction = () => {
      this.setState({
        bmiValue: 703
      })
    }

    render() {
        return (
            <View style={styles.parent}>
              <View style={{display: this.state.homePageDisplay}}>
                <View style={styles.logo}>
                    <Image
                        source={{ uri: 'https://codehs.com/uploads/8296014f44cca9f742c18e70d8e240b5' }}
                        style={{ height: 140, width: 200 }}
                    />
                </View>
                <View style={styles.piInput}>
                    <TextInput
                        value={this.state.inputValue}
                        onChangeText={this._handleTextChange}
                        style={{ width: 200, height: 44, textAlign: 'center', color: '#789659'}}
                    />
                </View>
                <View style={styles.piInput}>
                    <TextInput
                        value={this.state.inputValue1}
                        onChangeText={this._handleTextChange1}
                        style={{ width: 200, height: 44, textAlign: 'center', color: '#789659'}}
                    />
                </View>
                <View style={styles.bmi}>
                    <Text style={styles.bmiText}>
                        Your calculated BMI is
                    </Text>

                    <Text style={styles.bmiDisplay}>
                        {this.state.bmiValue}
                    </Text>
                </View>
                
                <View style={styles.nextB}>
                    <TouchableHighlight
                      onPress={this.handlePreferencePagePress}
                    >
                      <View style={styles.butt}>
                        <Text style={styles.buttonDecor}>
                            Next
                        </Text>
                      </View>
                    </TouchableHighlight>

                </View>
              </View>

              <View style={{display: this.state.preferencePageDisplay}}>
                <View style={styles.navBar}>
                  <TouchableHighlight
                      onPress={this.handleHomePagePress}
                  >
                        <View style={styles.backButt}>
                          <Text style={styles.backButtonDecor}>
                            Back
                          </Text>
                      </View>
                  </TouchableHighlight>

                  <Text style={styles.title}>
                        Your Preferences
                  </Text>
                  <TouchableHighlight
                      onPress={this.handlefoodPageDisplay}
                  >
                        <View style={styles.backButt}>
                          <Text style={styles.backButtonDecor}>
                            Next
                          </Text>
                      </View>
                  </TouchableHighlight>
                </View>

                <View style={styles.container2}>
                  <Text style={styles.categoryHeader}>
                    Dietary Restrictions
                  </Text>
                    <ScrollView style={styles.listContainer}>
                      {this.state.dietaryPreferences.map((item, index) => (
                        <View style={styles.itemContainer} key={index}>
                            <Text style={styles.subheader}>{item.placeholder}</Text>
                            <Text style={styles.detailText}>{item.detail}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  <Text style={styles.categoryHeader}>Cuisine Preferences</Text>
                  <ScrollView style={styles.listContainer}>
                    {this.state.mealType.map((item, index) => (
                        <View style={styles.itemContainer} key={'cuisine-' + index}>
                            <Text style={styles.subheader}>{item.placeholder}</Text>
                            <Text style={styles.detailText}>{item.detail}</Text>
                        </View>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={{display: this.state.foodPageDisplay}}>
                <Text style={styles.foodName}>
                    Food Name
                </Text>
              </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        
        backgroundColor: '#f2f4e3',
    },
    
    logo: {
        alignItems:'center',
        paddingTop: 100,
        paddingBottom: 20,
    },
    
    piInput: {
        height: 44,
        width: 200,
        backgroundColor: 'white', 
        borderRadius: 30,
        borderWidth: 3,
        borderColor:'#789659',
        marginBottom: 10,
    },
    
   bmi: {
       paddingTop: 70,
   },

   bmiText: {
      color: '#789659',
      fontFamily: 'Cochin',
      fontSize: 20
   },

   bmiDisplay: {
      color: '#789659',
      fontFamily: 'Cochin',
      fontSize: 35,
      textAlign: 'center',
      padding: 30,
   },

   nextB: {
     height: 50,
     width: 200,
   },

   butt:{
     height: 50,
     width: 200,
     backgroundColor: 'white',
     borderRadius: 30,
     borderWidth: 3,
     borderColor:'#789659',
   },

   buttonDecor: {
      color: '#789659',
      fontFamily: 'Cochin',
      textAlign: 'center',
      fontSize: 20,
      padding: 10
   },

   navBar: {
    flexDirection: 'row',
    paddingTop: 90,
    paddingBottom: 25,
   },

   backButt: {
    height: 30,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor:'#789659',
    textAlign: 'center'
   },

   backButtonDecor: {
      color: '#789659',
      fontFamily: 'Cochin',
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 2,
   },

   title: {
      fontFamily: 'Cochin',
      fontSize: 20,
      color: '#789659',
      paddingLeft: 5,
      paddingRight: 5,
   },

   foodName: {
      fontFamily: 'Cochin',
      fontSize: 25,
      color: '#789659',
      paddingLeft: 25,
      paddingRight: 5,
      paddingTop: 90,
   },

   container2: {
    flex: 1,
    backgroundColor: '#f2f4e3',
  },

  header: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Cochin',
    color: '#789659'
  },

  categoryHeader: {
    fontSize: 18,
    padding: 10,
    fontFamily: 'Cochin',
    color: '#426221',
    marginTop: 10,
    backgroundColor: 'white',
  },

  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  subheader: {
    fontSize: 16,
    fontFamily: 'Cochin',
    color: '#789659'
  },

  detailText: {
    fontSize: 14,
    fontFamily: 'Cochin',
    color: '#686868'
  },

  listContainer: {
    marginBottom: 20,
  },

  foodImage: {
    width: 300,
    height: 300,
  }
}); 