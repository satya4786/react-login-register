import React , {Component} from 'react';
import {Link} from 'react-router-dom';
class Register extends Component{
   constructor(){
       super();
       this.state={
           fieldList:{},
           errorList:{},
           message:''
       }
   }

   processInput = (obj) =>{
    let fieldList = this.state.fieldList;
    fieldList[obj.target.name] = obj.target.value;
    this.setState({
        fieldList
    })
   }

   register = (obj) =>{
        obj.preventDefault();
        let fieldList = this.state.fieldList;
        let errorList = this.state.errorList;
        let formStatus = true;
        
        //name validation
        if( !fieldList["myname"] || fieldList["myname"]=="")
        {
            formStatus = false;
            errorList["nameError"] = "Please Enter Your name !";
        }else{
            errorList["nameError"] = "";
        }

        //email validation
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if( !epattern.test(fieldList["myemail"]))
        {
            formStatus = false;
            errorList["emailError"] = "Please Enter Valid E-mail Id !";
        }else{
            errorList["emailError"] = "";
        }

        //password validation
        if( ! fieldList["mypassword"] || fieldList["mypassword"].length<6 )
        {
            formStatus = false;
            errorList["passError"] = "Password should be in between 6 to 8 length !";
        }else{
            errorList["passError"] = "";
        }

        //mobile validation
        let mpattern = /^[6-9]\d{9}$/;
        if( !mpattern.test(fieldList["mymobile"]))
        {
            formStatus = false;
            errorList["mobileError"] = "Please Enter 10 Digits Mobile No. !";
        }else{
            errorList["mobileError"] = "";
        }

        //message printing part
        let mymessage='';
        if(formStatus==false){
            mymessage = "The red color marked fields are invalid !";
        }else{
            mymessage = "Validation Success , Please wait submitting...";
        }

        this.setState({
            errorList,
            message:mymessage,
        })

        if(formStatus == true){
            var jsonData = JSON.stringify(this.state.fieldList); // array to json
            var url = "http://lmsglobe.com/api/app/register.php";
            var postData = {
                method:'POST',
                header:{'Content-Type':'application/json'},
                body:jsonData
            }
            fetch(url , postData)
            .then(response =>response.json())
            .then(result => this.setState({ message:result.status}));
        }
        

   }

    render(){
        return(
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <p className="text-center text-danger">{this.state.message}</p>
                            <form onSubmit={this.register}>
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <i className="fa fa-user-plus fa-lg"></i> Register
                                    <label className="fa-pull-right"> 
                                        <Link to="/" className="text-warning">
                                            <i className="fa fa-lock"></i> Already Register ? 
                                        </Link>
                                    </label>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label>Full Name</label>
                                        <input type="text" className="form-control" name="myname" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.nameError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>e-Mail Id</label>
                                        <input type="text" className="form-control" name="myemail" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.emailError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" maxlength="8" className="form-control" name="mypassword" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.passError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>Contact No.</label>
                                        <input type="number" className="form-control" name="mymobile" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.mobileError}</small>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button type="submit" className="btn btn-danger"> <i className="fa fa-user-plus"></i> Register </button>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            )
    }
}

export default Register;