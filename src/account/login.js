import React , {Component} from 'react';
import {Link} from 'react-router-dom';
class Login extends Component{
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
}


    render(){
        return(
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <form onSubmit={this.register}>
                                <div className="card">
                                    <div className="card-header bg-primary text-white">
                                        <i className="fa fa-lock fa-lg"></i> Login
                                        <label className="fa-pull-right"> 
                                            <Link to="/register" className="text-warning">
                                                <i className="fa fa-user-plus"></i> New ? Register 
                                            </Link> 
                                        </label>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label>e-Mail Id</label>
                                            <input type="text" className="form-control" name="myemail" onChange={this.processInput}/>
                                            <small className="text-danger">{this.state.errorList.emailError}</small>
                                        </div>
                                        <div className="mb-3">
                                            <label>Password</label>
                                            <input type="password" className="form-control" name="mypassword" onChange={this.processInput}/>
                                            <small className="text-danger">{this.state.errorList.passError}</small>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-danger">Login <i className="fa fa-arrow-right"></i> </button>
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

export default Login;