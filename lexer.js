class Lexer{
    constructor(token){
        token? this.tolex = token : undefined;
        this.makeVarDefault();
    }

    makeVarDefault(){
        this.result = [];
        this.currentIndex = 0;
        this.gotIdentifier = false;
        this.gotOpenTag = false;
        this.gotOpenTagWClose = false;
        this.gotCloseTag = false;
        this.gotSelfClose = false;
        this.identifier = undefined;
    }

    makeIdentifierDefault(){
        this.gotIdentifier = false;
        this.identifier = undefined;
    }

    makeCIDefault(){
        this.currentIndex = 0;
    }

    match(str){
        const portion = this.tolex.substring(this.currentIndex, str.length);
        return portion==this.tolex;
    }

    move(index){
        index ? this.currentIndex+=index : this.currentIndex++;
        return this.currentIndex;
    }

    peek(index){
        return index ? this.tolex.substring(this.currentIndex, index) : this.tolex.charAt(this.currentIndex);
    }

    eat(str){
        return this.move(str.length);
    }

    lex(token){
        this.tolex = token;
        this.makeVarDefault();
        var char;
        while(this.tolex.length!=0){
            char = this.peek();
            this.processToken(char);
        }
        if(this.tolex.length==0){
            return this.result;
        }
    }

    processToken(char){
        const withNextChar = this.peek(this.currentIndex+2);
        if(char=='<'){ 
            this.gotIdentifier = false;
            if(withNextChar=='</'){
                this.gotOpenTag = false;
                this.gotOpenTagWClose = true;
                this.move(2);
                //this.result.push({type:'open_tag_character', closing: true, value:'</'});
            }else{
                this.gotOpenTag = true;
                this.move()
                //this.result.push({type:'open_tag_character', value:char});
            }
        }
        else if(char=='>' && !this.gotSelfClose){
            if( (this.gotOpenTag || this.gotOpenTagWClose) && this.gotIdentifier){
                this.result.push({
                    type: this.gotOpenTag ? 'tag_open' : 'tag_close',
                    tag_name: this.identifier
                });
                this.makeIdentifierDefault();
                this.makeCIDefault();
                this.tolex = this.tolex.substring(this.splitIdx+1, this.tolex.length);
            }else{
                this.move();
            }
        }
        else if(char=='/'){  
            if(withNextChar=='/>'){
                this.gotSelfCose = true;
                this.result.push({type:'tag_selfclose', tag_name: this.identifier});
                this.move(2);
                this.makeIdentifierDefault();
                this.makeCIDefault();
            }else{
                this.move();
            }
        }
        else if(char.match(/[!@#$%^&*(),.?":{}|]/g)!=null){
            this.move();
        }
        else if(char.match(/^[a-z0-9]+$/i)!=null && !this.gotIdentifier){
            this.gotIdentifier = true;
            const token = this.tolex;
            let splitIdx = token.indexOf('>');
            if(this.identifier){
                splitIdx = this.gotOpenTagWClose ? token.indexOf('</'+this.identifier)+2 : token.indexOf('<'+this.identifier)+1;
                splitIdx+=this.identifier.length;
            } else{
                splitIdx = token.indexOf('/>')!=-1 ? token.indexOf('/>') : splitIdx
            }
            const identifier = this.peek(splitIdx);
            this.identifier = identifier;
            //this.result.push({type:'identifier', value:identifier});
            this.splitIdx = splitIdx;
            //this.eat(identifier);
        }
        else{
            this.move()
        }
    }
}

module.exports = {
    Lexer
}