import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, TouchableHighlightBase, TouchableHighlight, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
state = {
     data: null,
     isLoading: false,
     error: null,
     homePageDisplay: 'block',
     preferencePageDisplay: 'none',
     foodPageDisplay: 'none',
     inputValue: 'Enter your weight (lbs)',
     inputValue1: 'Enter your height (in)',
     bmiValue: 0,
     bmiWarning: ' ',
     dietaryPreferences: [
       { placeholder: 'Ketogenic', detail: 'The keto diet is based more on the ratio of fat, protein, and carbs ', selected: false },
       { placeholder: 'Vegetarian', detail: 'No meat. Includes eggs and dairy.', selected: false },
       { placeholder: 'Gluten Free', detail: 'No gluten-containing grains.', selected: false },
       { placeholder: 'Pescetarian', detail: 'Everything is allowed except meat & meat-by products.', selected: false },
       { placeholder: 'Vegan', detail: 'No meat, meat-by products, or dairy,eggs,honey', selected: false},
       { placeholder: 'Paleo', detail: 'Not allowed include legumes  grains, dairy, refined sugar, and processed foods.', selected: false}
     ],
     cuisinePreferences: [
       { placeholder: 'Italian', detail: 'Includes pasta, pizza, and more.', selected: false },
       { placeholder: 'Mexican', detail: 'Focuses on tacos, burritos, etc.', selected: false },
       { placeholder: 'Japanese', detail: 'Features sushi, ramen, and more.', selected: false },
       { placeholder: 'Indian', detail: 'Features naan, paneer, masala, and more.', selected: false },
     ]
 };

 togglePreference = (category, index) => {
   const preferences = [...this.state[category]];
   preferences[index].selected = !preferences[index].selected;
   this.setState({ [category]: preferences });
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

 bmiButton = () => {
   this.setState({
     bmiValue: Math.round(((this.state.inputValue) / (this.state.inputValue1 * this.state.inputValue1)) * 703)
   });

   if (this.state.bmiValue < 18.5 && this.state.bmiValue > 0) {
      this.setState({bmiWarning: 'Underweight'});
   }
   else if(this.state.bmiValue > 18.5 && this.state.bmiValue < 24.9){
      this.setState({bmiWarning: 'Normal Weight'})
   }
   else if(this.state.bmiValue > 24.9 && this.state.bmiValue < 29.9){
    this.setState({bmiWarning: 'Overweight'})
   }
   else if(this.state.bmiValue > 29.9 && this.state.bmiValue < 34.9){
    this.setState({bmiWarning: 'Obesity Class 1'})
   }
   else if(this.state.bmiValue > 34.9 && this.state.bmiValue < 39.9){
    this.setState({bmiWarning: 'Obesity Class 2'})
   }
   else if(this.state.bmiValue > 40){
    this.setState({bmiWarning: 'Obesity Class 3'})
   }
 };

 fetchData = async () => {
  this.setState({ isLoading: true });

  try {
   const selectedCuisinePreferences = this.state.cuisinePreferences
     .filter(item => item.selected)
     .map(item => item.placeholder.toLowerCase().replace(/\s/g, ''));

   const selectedDietaryPreferences = this.state.dietaryPreferences
     .filter(item => item.selected)
     .map(item => item.placeholder.toLowerCase().replace(/\s/g, ''));

    const cusinePreferencesQuery = selectedCuisinePreferences.join(',');
    const dietaryPreferencesQuery = selectedDietaryPreferences.join(',');
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=7ef794b32d8b49a8b7c5c173ec451252&cuisine=${cusinePreferencesQuery}&diet=${dietaryPreferencesQuery}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const recipes = data.results.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      servings: recipe.servings,
    }));
  
    this.setState({ data, isLoading: false, recipes });
  } catch (error) {
    this.setState({ error: error.message, isLoading: false });
  }
};


 render() {
     const { data, isLoading, error, recipes } = this.state;

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
                   onPress={this.bmiButton}
                 >
                   <View style={styles.butt}>
                     <Text style={styles.buttonDecor}>
                         Calculate
                     </Text>
                   </View>
                 </TouchableHighlight>
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

             <View style={styles.bmi}>
                <Text style={styles.bmiText}>
                    {this.state.bmiWarning}
                </Text>
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
                     <TouchableOpacity
                       key={index}
                       style={[
                         styles.itemContainer,
                         item.selected && styles.selectedItem
                       ]}
                       onPress={() => this.togglePreference('dietaryPreferences', index)}>
                       <Text style={styles.subheader}>{item.placeholder}</Text>
                       <Text style={styles.detailText}>{item.detail}</Text>
                     </TouchableOpacity>
                   ))}
                 </ScrollView>
               <Text style={styles.categoryHeader}>Cuisine Preferences</Text>
               <ScrollView style={styles.listContainer}>
                 {this.state.cuisinePreferences.map((item, index) => (
                     <TouchableOpacity
                       key={index}
                       style={[
                         styles.itemContainer,
                         item.selected && styles.selectedItem
                       ]}
                       onPress={() => this.togglePreference('cuisinePreferences', index)}>
                       <Text style={styles.subheader}>{item.placeholder}</Text>
                       <Text style={styles.detailText}>{item.detail}</Text>
                     </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>
           </View>

           <View style={{display: this.state.foodPageDisplay}}>
             <View style={styles.navBar}>
               <TouchableHighlight
                 onPress={this.handlePreferencePagePress}
               >
                 <View style={styles.backButt}>
                   <Text style={styles.backButtonDecor}>
                     Back
                   </Text>
                 </View>
               </TouchableHighlight>

               <Text style={styles.title}>
                   Food Name
               </Text>

               <TouchableHighlight
                 onPress={this.fetchData}
               >
                 <View style={styles.backButt}>
                   <Text style={styles.backButtonDecor}>
                     Recipes
                   </Text>
                 </View>
               </TouchableHighlight>
             </View>

             <View style={styles.container2}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#789659" />
                ) : error ? (
                  <Text>Error: {error}</Text>
                ) : Array.isArray(recipes) ? (
                  <ScrollView>
                    {recipes.map((recipe, index) => (
                      <View style={styles.recipeContainer} key={index}>
                        <Image
                          source={{ uri: recipe.image }}
                          style={styles.recipeImage}
                        />
                        <View>
                          <Text style={styles.recipeTitle}>{recipe.title}</Text>
                          
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                ) : null}
              
             </View>
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
   fontSize: 20,
   justifyContent: 'center',
   textAlign: 'center'
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
 width: deviceWidth - 20,
 alignItems: 'center',
 justifyContent: 'center',
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
 width: deviceWidth - 20,
 paddingRight: 10,
 paddingLeft: 10,
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
  marginBottom: 100,
},

foodImage: {
  width: 300,
  height: 300,
},
  selectedItem: {
  backgroundColor: '#c5e1a5',
},

recipeContainer: {
  backgroundColor: 'white',
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',

},

recipeImage: {
  width: 80,
  height: 80,
  borderRadius: 10,
  marginRight: 10,
},

recipeTitle: {
  fontFamily: 'Cochin',
  fontSize: 16,
  color: '#789659',
  marginBottom: 5,
  paddingRight: 20,
  width: 200,
},

recipeDetails: {
  fontFamily: 'Cochin',
  fontSize: 14,
  color: '#686868',
},
  

});













