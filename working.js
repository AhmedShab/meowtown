var config = require('./knexfile').development
var knex = require('knex')(config)

function logError (err) {
  console.log('Bother: ', err)
}

function closeDB () {
knex.destroy()
}

function printTable (table) {
return knex(table)
  .select()
  .then( function (data) {
    console.log("the table: ", data)
    })
  .catch(logError)
  .finally(closeDB)
}

printTable('cats')
