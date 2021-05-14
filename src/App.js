import React,{Component} from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceDetect from "./components/FaceDetect/FaceDetect"
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css'
import Particles from 'react-particles-js'

const initialState= {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };
  displayFaceBox = box => {
    this.setState({ box: box });
  };
  loadUser= data => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})
  }
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input:this.state.input })
    };
    fetch('https://face-app-recognition-backend.herokuapp.com/imageurl',requestOptions)
    .then(response => response.json())
    .then(response=>{
      if(response){
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id:this.state.user.id })
        };
        fetch('https://face-app-recognition-backend.herokuapp.com/image',requestOptions)
        .then(response => response.json())
        .then(count=>{
            if(count){
              this.setState(Object.assign(this.state.user,{entries:count}))
            }
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err))
  };
  onInputChange = event => this.setState({ input: event.target.value });
  onRouteChange = route => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
      this.setState({initialState})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const {isSignedIn,route,box,imageUrl} = this.state
    return (
      <div className="App">
        <Particles className="particles"
          params={{
            "particles": {
                "number": {
                    "value": 150
                },
                "size": {
                    "value": 3
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                }
            }
        }} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route==='home' ? 
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceDetect box={box} imageUrl={imageUrl} />
        </div>
        : route==='signin' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;