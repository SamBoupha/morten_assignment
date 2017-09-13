#!/usr/bin/env node

const program = require( 'commander' );
const excelReader = require('./utils/excel-reader');
const fetch = require('node-fetch');
const generateCode = require('./utils/uid');

program.version( '0.1.0' );

program.command( 'get' )
  .description( 'transfer data from excel to DHIS2' )
  .action( () => console.log(excelReader()) );

program.command( 'post' )
  .description( 'get excel data in data folder and send to DHIS2')
  .option( '--source [source]', 'source of the location')
  .option( '--source-username [source_username]', 'source username')
  .option( '--source-password [source_password]', 'source password')
  .option( '--target [target]', 'url of target database')
  .option( '--target-username [target_username]', 'username of target database')
  .option( '--target-password [target_password]', 'password of target database')
  .option( '--mapping [filename]', 'Mapping file')
  .action( args => {

    if ( args.source && args.sourceUsername && args.sourcePassword && args.target && args.targetUsername && args.targetPassword ) {

        (async (urlSource, urlTarget) => {
            const createAuthenticationHeader = (username, password) => {
                return "Basic " + new Buffer( username + ":" + password ).toString( "base64" );
            };

            const sourceHeaders = {
                Authorization: createAuthenticationHeader( args.sourceUsername, args.sourcePassword )
            };
        
            const dataValues = await(await fetch(urlSource, {headers: sourceHeaders} )).json();

            const dataImport = {
                dataValues: []
            }

            dataValues.forEach(function(data) {
                let d = {

                    dataElement: 'DAJfmhFdKCP',
                    categoryOptionCombo: 'lmbxvugTvKr',
                    period: '1999',
                    orgUnit: data.orgunit_id,
                    value: data.population_2015
                }
                dataImport.dataValues.push(d);
            });

            const targetHeaders = {
                Authorization: createAuthenticationHeader( args.targetUsername, args.targetPassword ),
                "Content-Type": "application/json"  
            };

            const res = await fetch(urlTarget, { 
                method: "POST",
                headers: targetHeaders,
                body: JSON.stringify(dataImport)
            });

            console.log("Import completed");

        })(args.source, args.target);

        if(args.mapping) {
            console.log("with mapping");
        }

    } else {
        program.outputHelp();
    }
  } );

program.parse( process.argv );

if ( !process.argv.slice( 2 ).length ) {
  program.outputHelp();
}



