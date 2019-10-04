const lex = require('./lexer');
const lexer = new lex.Lexer('raja');

/*
describe('Lexer basic functionalities', () => {
    test('Match func', () => {
        //Arrange
        const expectedOutput = true;
        //Act
        const callingResult = lexer.match('four');
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
    test('Move func without index', () => {
        //Arrange
        //ci=0
        const expectedOutput = 1;
        //Act
        const callingResult = lexer.move();
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
    test('Move func with index', () => {
        //Arrange
        //ci=1
        const expectedOutput = 3;
        //Act
        const callingResult = lexer.move(2);
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
    test('Peek func without index', () => {
        //Arrange
        //ci=3
        const expectedOutput = 'a';
        //Act
        const callingResult = lexer.peek();
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
    test('Peek func with index', () => {
        //Arrange
        //ci=3
        lexer.currentIndex = 1;
        const expectedOutput = 'aja';
        //Act
        const callingResult = lexer.peek(4);
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
    test('Eat func', () => {
        //Arrange
        //ci=1
        const expectedOutput = 4;
        //Act
        const callingResult = lexer.eat('tri');
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
});
*/

describe('Lexer with input string', () => {
    /*
    test('lex "<tag>"', () => {
        //Arrange
        const expectedOutput = [{type: 'tag_open', tag_name: 'tag' }];
        //Act
        const callingResult = lexer.lex('<tag>');
        //Assert
        expect(callingResult).toMatchObject(expectedOutput);
    });
    test('lex "</tag>"', () => {
        //Arrange
        const expectedOutput = [{type: 'tag_close', tag_name: 'tag' }];
        //Act
        const callingResult = lexer.lex('</tag>');
        //Assert
        expect(callingResult).toMatchObject(expectedOutput);
    });
    test('lex "<tag/>"', () => {
        //Arrange
        const expectedOutput = [{type: 'tag_selfclose', tag_name: 'tag' }];
        //Act
        const callingResult = lexer.lex('<tag/>');
        //Assert
        expect(callingResult).toMatchObject(expectedOutput);
    });
    test('lex "<tag></tag>"', () => {
        //Arrange
        const expectedOutput = [{type: 'tag_open', tag_name: 'tag' },
                                {type: 'tag_close', tag_name: 'tag' }];
        //Act
        const callingResult = lexer.lex('<tag></tag>');
        //Assert
        expect(callingResult).toMatchObject(expectedOutput);
    });
    */
    test('lex dom with children "<catalog><book></book></catalog>"', () => {
        //Arrange
        const expectedOutput = [{type: 'tag_open', tag_name: 'catalog' },
                                {type: 'tag_open', tag_name: 'book' },
                                {type: 'tag_close', tag_name: 'book' },
                                {type: 'tag_close', tag_name: 'catalog' }];
        //Act
        const callingResult = lexer.lex('<catalog><book></book></catalog>');
        //Assert
        expect(callingResult).toMatchObject(expectedOutput);
    });
});
