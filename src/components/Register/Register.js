import React from 'react'

class Register extends React.Component {
 constructor(props){
    super(props);
    this.state = {
      nameInput : "",
      emailInput : "",
      passwordInput : ""
    }
  }
  nameChange = (event) => {
  	this.setState({nameInput:event.target.value});
  }
  emailChange = (event) => {
  	this.setState({emailInput:event.target.value});
  }
  passwordChange = (event) => {
  	this.setState({passwordInput:event.target.value});
  }

  registerFlagCheck = (name,email,password) => {
  	if(!email || (email.match(new RegExp(/['@']/,'i')) === null 
  		|| email.match(new RegExp(/['.']/,'i')) === null) ) 
  	{
  		
  		return false;
  	}
  	else if(!name || name.match(new RegExp(/[^'A-Za-z0-9']/,'i')) != null || name.length < 3) 
  	{
  		
  		return false;
  	}
  	else if(!password || password.match(new RegExp(/[^'A-Za-z0-9']/,'i')) === null || password.length < 8
  		|| password.match(new RegExp(/['A-Za-z0-9']/,'i')) === null) 
  	{
  		console.log("Password Triggered")
  		return false;
  	}
  	return true;		
  }

  submitRegister = (onRouteChange,setUser) => {
  	const {nameInput,emailInput,passwordInput} = this.state

  	if(!this.registerFlagCheck(nameInput,emailInput,passwordInput))
  	{
  		return window.alert(`Unable To Register User
Please follow the following rules while registering: 
1. Name field cannot contain special characters or numbers and must least have 3 characters.
2. Email Address should be a vaild format & unique eg: example@gmail.com.
3. Password Length should be atleast of 8 characters comprising
of the following:
- Atleast 1 Capital Letter (A-Z)
- Atleast 1 Small Letter (a-z)
- Atleast 1 Digit (0-9)
- Atleast 1 Special Character \n
Kindly Check the Same & Try Again.
`);
  	}

  
  	fetch('https://afternoon-stream-19916.herokuapp.com/register', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
		name: nameInput,
		email: emailInput,
		password: passwordInput
		})
	}).then ( response => response.json() )
	.then( data => {
			if( data.id >0){
				setUser(data);
				onRouteChange('home');
			}
		})
  }

render()
{
	const {onRouteChange,setUser} = this.props
	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlfor="name">Name</label>
			        <input 
			       onChange={this.nameChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="name"  
			        id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
			        <input 
			        onChange={this.emailChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" name="email-address"  
			        id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
			        <input 
			        onChange={this.passwordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password" 
			         id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" 
			      onClick={() => this.submitRegister(onRouteChange,setUser)}/>
			    </div>
			  </div>
			</main>
		</article>
		);
}


}

export default Register;