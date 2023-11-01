import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  currentNumberTem = '0';
  decimalNumber = false;
  firstOperand : any = null;
  operator : any = null;
  waitForSecondNumber = false;

  constructor() { }

  ngOnInit() {
  }

  public getNumber(value: string){
    if(this.waitForSecondNumber){
      this.currentNumber === '0'? this.currentNumber = value : this.currentNumber = this.currentNumber + value;
      if( !this.decimalNumber){
        this.currentNumberTem = value;
      } else {
        this.currentNumberTem = this.currentNumberTem  + value;
      }
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = value: this.currentNumber = this.currentNumber + value;
    }
  }

  getDecimal(){
        this.decimalNumber = true;
        this.currentNumber += '.'; 
        this.currentNumberTem += '.';
        if(this.firstOperand != null){
          this.waitForSecondNumber = true;
        }
  }

  private doCalculation(op : any , secondOp : any){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '%': 
      return this.firstOperand %= secondOp; 
      case '+/-': 
      return -this.firstOperand; 
      case '=':
      return secondOp;
    }
  }

  public getOperation(op: string){
    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);
      this.decimalNumber = false;
    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumberTem))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    this.currentNumberTem = this.currentNumber;
    if(this.operator != '='){
      if(this.operator == '+/-'){
         this.currentNumber = String(-Number(this.currentNumber));
      } else {
        this.operator == '*' ? this.currentNumber = this.currentNumber  + "x": this.currentNumber = this.currentNumber  + this.operator;
      }
    } else{
      this.waitForSecondNumber = false;
      this.firstOperand = null;
    }
  }

  public clear(){
    this.currentNumber = '0';
    this.currentNumberTem = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
  
}

