import React from 'react';
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

class NormalButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button id={this.props.literalNumber} onClick={this.props.clickHandler}>{this.props.number}</button>
        );
    }
}

class MathButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button id={this.props.literalExpression} onClick={this.props.mathHandler}>{this.props.expression}</button>
        );
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            expression: '',
            switch: false,
            expressionTemp: '',
            afterSwitch: false,
        }
    }
    clickHandler(number) {
      if(number === '.' && this.state.value.includes('.')){
        return;
      }
      if (this.state.afterSwitch) {
        this.setState({
          value: number,
          expression: this.state.expression + number.toString(),
          afterSwitch: false,
        });
      }else{
        this.setState({
          expression: this.state.expression + number.toString(),
          value: (this.state.value + number.toString()).replace(/^0+(?!\.|$)/, ''),
         });
      }
    }
    clearLastChar() {
      this.setState({
        value: 0,
        expression: '',
      });
    }
    mathHandler(expression) {
        if (expression === '=') {
          console.log(this.state.expression);
          this.setState({
            afterSwitch: true,
            value: eval(this.state.expression),
            expression: '',
          })
        }else{
          this.setState({
            value: 0,
            expression: this.state.expression + expression,
            afterSwitch: false,
          });
        }
    }
    render() {
        return (
            <div id='buttons'>
              <h1 id='display'>{this.state.value}</h1>
              <NormalButton number='1' literalNumber='one' clickHandler={() =>{this.clickHandler(1);}}/>
              <NormalButton number='2' literalNumber='two' clickHandler={() =>{this.clickHandler(2);}}/>
              <NormalButton number='3' literalNumber='three' clickHandler={() =>{this.clickHandler(3);}}/>
              <NormalButton number='4' literalNumber='four' clickHandler={() =>{this.clickHandler(4);}}/>
              <NormalButton number='5' literalNumber='five' clickHandler={() =>{this.clickHandler(5);}}/>
              <NormalButton number='6' literalNumber='six' clickHandler={() =>{this.clickHandler(6);}}/>
              <NormalButton number='7' literalNumber='seven' clickHandler={() =>{this.clickHandler(7);}}/>
              <NormalButton number='8' literalNumber='eight' clickHandler={() =>{this.clickHandler(8);}}/>
              <NormalButton number='9' literalNumber='nine' clickHandler={() =>{this.clickHandler(9);}}/>
              <NormalButton number='0' literalNumber='zero' clickHandler={() =>{this.clickHandler(0);}}/>
              <NormalButton number='.' literalNumber='decimal' clickHandler={() =>{this.clickHandler('.');}}/>
              <MathButton expression='+' literalExpression='add' mathHandler={() =>{this.mathHandler('+')}}/>
              <MathButton expression='-' literalExpression='subtract' mathHandler={() =>{this.mathHandler('-')}}/>
              <MathButton expression='*' literalExpression='multiply' mathHandler={() =>{this.mathHandler('*')}}/>
              <MathButton expression='/' literalExpression='divide' mathHandler={() =>{this.mathHandler('/')}}/>
              <button id='clear' onClick={() =>{this.clearLastChar()}}>AC</button>
              <button id='equals' onClick={() =>{this.mathHandler('=')}}>=</button>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Display />
  </React.StrictMode>
);
