API Global para utilização em várias aplicações


Ao executar o projeto ocorre um erro de schema causado devido a lib 'mosca' estar descontinuada, para executar o projeto é necessário seguir as instruções a seguir(Logo o broker mqtt será migrado para o aedes):

comment this line in validator.js (\node_modules\jsonschema\lib\validator.js:111):

if((typeof schema !== 'boolean' && typeof schema !== 'object') || schema === null){
     throw new SchemaError('Expected `schema` to be an object or boolean');
}
