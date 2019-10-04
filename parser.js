// Stack class 
class Stack { 
    // Array is used to implement stack 
    constructor(arr){ 
        this.items = arr? arr : []; 
    } 
    push(item){
        this.items.push(item);
    }
    pop(){
        const len = this.items.length;
        const val = this.items[len-1];
        this.items.splice(len-1, 1);
        return val;
    } 
    peek(){
        return this.items[this.items.length-1];
    } 
    isEmpty(){
        return this.items.length>0;
    }
} 

class Parser{
    constructor(){
        this.stack = new Stack();
    }

    _areParanthesisBalanced(json, base){
        if(json.type=='tag_open'){
            base.stack.push(json)
        }
        else{       //tag close
            if(json.tag_name!=base.stack.peek().tag_name){
                return false;
            }
            base.stack.pop();
        }
        return true;
    }
    areParanthesisBalanced(toParse){
        this.toParse = toParse;
        if(this.toParse.length==0){
            return false;
        }
        const balCheckArr = this.toParse.map((json) => this._areParanthesisBalanced(json,this));
        return balCheckArr.indexOf(false)==-1;
    }
}

module.exports = {
    Parser
}