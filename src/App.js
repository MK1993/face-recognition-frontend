import React,{Component}from "react"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank"
import FaceDetect from "./components/FaceDetect/FaceDetect"
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register"
import Modal from "./components/Modal/Modal"
import Profile from "./components/Profile/Profile"
import"./App.css"
import Particles from "react-particles-js"
const initialState={input:"",imageUrl:"",boxes:[],route:"signin",isProfileOpen:false,isSignedIn:false,user:{id:"",name:"",email:"",entries:0,joined:"",age:0,pet:""}};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
  
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('https://face-recognition-app-backend.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          fetch(`https://face-recognition-app-backend.herokuapp.com/profile/${data.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => response.json())
          .then(user => {
            if (user && user.email) {
              this.loadUser(user)
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log)
    }
  }
  calculateFaceLocations = data => {
    if(data){
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    }
      return
  };
  displayFaceBoxes = boxes => {
    if(boxes){
      this.setState({ boxes: boxes });
    }
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
      headers: {'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('token')},
      body: JSON.stringify({ input:this.state.input })
    };
    fetch('https://face-recognition-app-backend.herokuapp.com/imageurl',requestOptions)
    .then(response => response.json())
    .then(response=>{
      if(response){
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json','Authorization': window.sessionStorage.getItem('token') },
          body: JSON.stringify({ id:this.state.user.id })
        };
        fetch('https://face-recognition-app-backend.herokuapp.com/image',requestOptions)
        .then(response => response.json())
        .then(count=>{
            if(count){
              this.setState(Object.assign(this.state.user,{entries:count}))
            }
        })
        .catch(console.log)
      }
      this.displayFaceBoxes(this.calculateFaceLocations(response))
    })
    .catch(err=>console.log(err))
  };
  onInputChange = event => this.setState({ input: event.target.value });
  onRouteChange = route => {
    if(route === 'signout'){
      return this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }

  render() {
    const {isSignedIn,route,boxes,imageUrl,isProfileOpen,user} = this.state
    return (
      <div className="App"> <Particles className="particles" params={{"particles":{"number":{"value": 150}, "size":{"value": 3}}, "interactivity":{"events":{"onhover":{"enable": true, "mode": "repulse"}}}}}/> <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/> {isProfileOpen && <Modal><Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} loadUser={this.loadUser} user={user}/></Modal>}{route==='home' ? <div> <Logo/> <Rank name={this.state.user.name}entries={this.state.user.entries}/> <ImageLinkForm onInputChange={this.onInputChange}onSubmit={this.onSubmit}/> <FaceDetect boxes={boxes}imageUrl={imageUrl}/> </div>: route==='signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>}</div>
    );
  }
}

export default App;