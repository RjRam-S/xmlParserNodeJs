const lex = require('./lexer');
const par = require('./parser');
const lexer = new lex.Lexer();
const parser = new par.Parser();

describe('Parser "areParanthesisBalanced" testing for dom with one child', () => {
    test('Match func', () => {
        //Arrange
        const expectedOutput = true;
        //Act
        const callingResult = parser.areParanthesisBalanced(lexer.lex('<catalog><book></book></catalog>'));
        //Assert
        expect(callingResult).toStrictEqual(expectedOutput);
    });
});