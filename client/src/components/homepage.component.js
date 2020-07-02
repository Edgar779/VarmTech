import React, { Component } from "react";
import API from '../services/api';
import config from '../config/config';
import Workspaces from "./workspaces";
// import { subdomain } from "../../../server/models";
const _ = require('lodash');
export default class HomePage extends Component {

    constructor(){
        super()
        this.state = {
            subDomain: '',
            loginErr: '',
            availableDomain: [],

            brandName: '',
            modelName: '',
            yearName: '',
            productionName: '',
            colorName: '',

            editmodelName: '',
            edityearName: '',
            editproductionName: '',
            editcolorName: '',

            editWorkspaceName: '',
            invalidbrandName: '',
            updateWorkspaceName: '',
            isEdit: false,
            workspaces: []
        }
    }

    componentDidMount = () =>{
        const userId = localStorage.getItem("id");
      
       
        const formData = {
            id: userId
        }
        API.post(`${config.API_URL}/getCars`, formData)
        .then((response) => {
            let { workspaces } = this.state;
            workspaces.push(...response.data);
    
            this.setState({workspaces});

        })
        .catch(function (error) {
            console.log(error);
      
        });

    }

    deleteCar = (event, id)=>{
        event.preventDefault();
        const formData = {
            id
        }
        API.post(`${config.API_URL}/deleteCar`, formData)
        .then((response) => {
            if (response.data.success === true){
                let { workspaces } = this.state;

                workspaces = workspaces.filter(val => val.id !== id);
        
                this.setState({workspaces});
            }
        })
        .catch(function (error) {
            console.log(error);
      
        });
    }






    editmodelName = (event, workspace) =>{
        event.preventDefault();
        
        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.model = event.target.value;
            }

            return val;
        });

        this.setState({workspaces});
    }


    edityearName = (event, workspace) =>{
        event.preventDefault();
        
        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.year = event.target.value;
            }

            return val;
        });

        this.setState({workspaces});
    }
    editproductionName = (event, workspace) =>{
        event.preventDefault();
        
        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.production = event.target.value;
            }

            return val;
        });

        this.setState({workspaces});
    }
    editcolorName = (event, workspace) =>{
        event.preventDefault();
        
        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.color = event.target.value;
            }

            return val;
        });

        this.setState({workspaces});
    }


    isEdit = (event, workspace) => {
        event.preventDefault();

        let { workspaces } = this.state;

        workspaces.map(val => {
            if (val.id === workspace.id) {
                val.editMode = !workspace.editMode;
            }

            return val;
        });

        this.setState({workspaces});
    }

    editCar = (event, workspace)=>{
        event.preventDefault();
        
        const { id, model, year, production, color } = workspace;

        const formData = {
            id,
            model,
            year,
            production,
            color
        }
        
        API.post(`${config.API_URL}/editCarOption`, formData)
        .then((response) => {
            if (response.data.success === true){
                let { workspaces } = this.state;

                workspaces.map(val => {
                    if (val.id === workspace.id) {
                        val.editMode = false;
                    }
        
                    return val;
                });
        
                this.setState({workspaces});
            }
        })
        .catch(function (error) {
            console.log(error);
      
        });
    }



    createCar = (event)=>{
        event.preventDefault();

    
// basic ...

        if(this.state.brandName === "") {
            this.setState((val)=> ({
                invalidbrandName: "can not be empty"
            }));

            return
        }
//
        this.setState({invalidbrandName: ''});

        const userId = localStorage.getItem("id");

        const formData = {
            brandName: this.state.brandName,
            modelName: this.state.modelName,

            yearName: this.state.yearName,
            productionName: this.state.productionName,

            colorName: this.state.colorName,

            userId
        }
        API.post(`${config.API_URL}/createCar`, formData)
            .then((response) => {
              

                let { workspaces } = this.state;

                workspaces.push(response.data.data);

                this.setState({workspaces});

            })
            .catch(function (error) {
            console.log(error);
          
            });
    }




    brandName = (e) =>{
        this.setState({brandName: e.target.value})
    }
    modelName = (e) =>{
        this.setState({modelName: e.target.value})
    }
    yearName = (e) =>{
        this.setState({yearName: e.target.value})
    }
    productionName = (e) =>{
        this.setState({productionName: e.target.value})
    }
    colorName = (e) =>{
        this.setState({colorName: e.target.value})
    }


    render() {
        const { workspaces } = this.state;

        const isLogin = localStorage.getItem("login");

        return (
            <div>


    {isLogin ? 
        <form onSubmit={this.onSubmit}> 
        {this.state.invalidWorkspaceName && <p>{this.state.invalidWorkspaceName}</p>}

        {!!workspaces.length && <Workspaces
            data={workspaces} 
            actions={{
                editmodelName: this.editmodelName,
                edityearName: this.edityearName,

                editproductionName: this.editproductionName,
                editcolorName: this.editcolorName,

                editCar: this.editCar,
                isEdit: this.isEdit,
                deleteCar: this.deleteCar,
                onChange: this.onChange,
                sendSubDomain: this.sendSubDomain,
            }}
        />}


        <div style={{margin: '20px 0'}}>
            <input style={{marginTop: '10px'}} className="form-control" type="text" placeholder="type brand" onChange={this.brandName} />

            <input style={{marginTop: '10px'}} className="form-control" type="text" placeholder="type model" onChange={this.modelName} />

            <input style={{marginTop: '10px'}} className="form-control" type="text" placeholder="type year" onChange={this.yearName} />

            <input style={{marginTop: '10px'}} className="form-control" type="text" placeholder="type production name" onChange={this.productionName} />

            <input style={{marginTop: '10px'}} type="text" className="form-control" placeholder="type color" onChange={this.colorName} />

            <button onClick={this.createCar} className="btn btn-primary btn-block">
            Create Car
        </button>
        </div>
        
            </form>:<h3>Please Login</h3>
         }

             </div>
            
                    

        );
    }
}
