const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const enums = require('./typedefs-resolvers/_enum')
const equipments = require('./typedefs-resolvers/equipments')
const supplies = require('./typedefs-resolvers/supplies')
const softwares = require('./typedefs-resolvers/softwares')
const people = require('./typedefs-resolvers/people')
const givens = require('./typedefs-resolvers/givens')
const tools = require('./typedefs-resolvers/tools')

const typeDefs = [
    queries,
    mutations,
    enums,
    equipments.typeDefs,
    supplies.typeDefs,
    softwares.typeDefs,
    people.typeDefs,
    givens.typeDefs,
    tools.typeDefs
]

const resolvers = [
    equipments.resolvers,
    supplies.resolvers,
    softwares.resolvers,
    people.resolvers,
    givens.resolvers,
    tools.resolvers
]

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
