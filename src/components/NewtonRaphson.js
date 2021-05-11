import React from 'react';
import { Input, Button } from 'antd';
import './Content.css';
import {equation_func, fixed_fx} from './Equation_Function'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

class NewtonRaphson extends React.Component{

    state = {
        f_x:'',
        init_x:null,
        x:null,
        er:null,
        ifer:null
    };

    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }

    myChangeHandler_init_x = (e) => {
        this.setState({init_x: e.target.value});
    }

    myChangeHandler_er = (e) => {
        this.setState({er: e.target.value});
    }

    find_x = e =>{

        if(this.state.f_x === ''){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดใส่ฟังก์ชั่น</div>)})
            return;
        }

        try{
            
            this.setState({ifer:null})

            let arr = [];
            let f_x = this.state.f_x;
            let df_x = math.derivative(f_x,"x").toString();
            arr.push(<div style={{fontSize:'25px'}}>
                        f'(x) = {df_x}
                     </div> );
            f_x = fixed_fx(f_x);
            df_x = fixed_fx(df_x);

            let er = parseFloat(this.state.er);
            let tmp_er = 99999999;

            let x = parseFloat(this.state.init_x);
            let x_new;
            
            let i = 1;

            

            while(tmp_er>er){

                x_new = x - (equation_func(x,f_x)/equation_func(x,df_x));
                tmp_er = Math.abs((x_new-x)/x_new);
                x = x_new;

                arr.push(<div style={{fontSize:'25px'}}>
                            <span style={{display:'inline-block',width:'50%'}}>Iteration {i}: x is {x}</span>
                            <span>Error : {tmp_er.toFixed(15)}</span>
                        </div>);
                i++;
                if(i>200){
                    break;
                }
            }

            arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {x}</div>);
            this.setState({x:arr});


        }catch{
            this.setState({ifer:(<div style={{color:'red'}}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>)})
        }

    }

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">NewtonRaphson Method</h1>
                <div> 
                    <span><Input placeholder="x^2 - 7" style={{width:'364px'}} onChange={this.myChangeHandler_f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>Initial x =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00" style={{width:'100px'}} onChange={this.myChangeHandler_init_x}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.00001" style={{width:'100px'}} onChange={this.myChangeHandler_er}/></span>
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
            </div>
        );
    }

}

export default  NewtonRaphson;