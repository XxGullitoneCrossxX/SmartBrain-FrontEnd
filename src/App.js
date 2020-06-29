import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const initialState = {
      input : "",
      imgUrl : "",
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {}
}

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (response) => {
    //const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box
    const clarifaiFace = response.outputs[0].data.regions.map(value => {return value.region_info.bounding_box;});
    
    console.log('Value of temp',clarifaiFace);
    //const clarifaiFace = data.outputs[0].data.regions.map( value => value.regions_info.bounding_box );
    console.log(response.outputs[0].data.regions);
    const image= document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const NewFace = clarifaiFace.map(value => {

      return(
      {
          left_col:value.left_col* width,
          top_row:value.top_row * height,
          right_col: width - (value.right_col * width),
          bottom_row: height -(value.bottom_row * height)
      }

        )
    }

    );

    return (

        NewFace

      );

     /* return {leftCol: clarifaiFace[0].left_col * width, 
      topRow: clarifaiFace[0].top_row * height,
      rightCol: width - (clarifaiFace[0].right_col * width),
      bottomRow: height -(clarifaiFace[0].bottom_row * height)
      }*/
    
  }

  displayFaceBox = (box) => {
    console.log('BOX VALUE',box);
    this.setState({box:box});
    console.log('STATE BOX VALUE', this.state.box);
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value})
  } 

  onButtonSubmit = () => {
    console.log('Click');
    this.setState({imgUrl: this.state.input})
    fetch('http://localhost:3000/imageURL', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
    .then(response => response.json())
    .then( response => {
       this.displayFaceBox(this.calculateFaceLocation(response))
     })
    .catch(err => console.log)

    fetch('http://localhost:3000/image', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: this.state.user.id
    })
  }).then ( response => response.json() )
  .then( data => {
      this.setState(Object.assign(this.state.user,{entries:data}));
    })
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    else if(route === 'signout'){
      this.setState(initialState)
    }
    this.setState({route:route});

  }

  setUser = (user) => {

    this.setState({user: user});
  }
  render(){
  return (
    <div className="App">
    <Particles className="particles"params={particlesOptions} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {
      this.state.route ==='home'
      ?
      <div>
      <Logo />
        <Rank user={this.state.user} />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box} />
      </div>
      :(this.state.route === 'signin'? 
        <Signin onRouteChange={this.onRouteChange} setUser={this.setUser}/> 
        : <Register onRouteChange={this.onRouteChange} setUser={this.setUser}/> )
      
      }
    </div>
  );
  }
}

export default App;
