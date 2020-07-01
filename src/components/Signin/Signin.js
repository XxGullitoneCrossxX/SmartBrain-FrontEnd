import React from 'react'

class Signin extends React.Component  {

 constructor(props){
    super(props);
    this.state = {
      emailInput : "",
      passwordInput : "",
    }
  }

changeEmail = (event) =>{
	this.setState({emailInput:event.target.value});
}

submitSignin = (onRouteChange,setUser) => {
	const email = this.state.emailInput;
	const password = this.state.passwordInput;
	if(!email || !password){
		return window.alert('Email Address or Password Field Is Empty');
	}
	fetch('https://afternoon-stream-19916.herokuapp.com/signin', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email:this.state.emailInput,
			password:this.state.passwordInput
		})
	}).then ( response => response.json() )
	.then( data => {
			if( data.id){
				setUser(data);
				onRouteChange('home');
			}
			else{
				return window.alert("Invalid Email Address or Password");
			}
		})
	.catch( err => {
		console.log("Unable to Sigin, Not able to make connection with API Server");
	})
}

changePassword = (event) => {
	this.setState({passwordInput:event.target.value});
}
render()
{
	const {onRouteChange,setUser} = this.props;
	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
			        <input 
			        onChange={this.changeEmail}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" name="email-address"  
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
			        <input
			        onChange={this.changePassword} 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  
			        id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
			      onClick={() => this.submitSignin(onRouteChange,setUser) }/>
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteChange('register') }  className="f6 link dim black db pointer">Register</p>
			    </div>
			  </div>
			</main>
		</article>
		);
}

}

export default Signin;