const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Mutation {
    deleteEquipment(id: String): Equipment
    insertEquipment(    
        id: String
        used_by: String
        count: Int
        new_or_used: String
    ): Equipment
    editEquipment(
        id: String,
        used_by: String,
        count: Int,
        new_or_used: String
    ): Equipment
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`
// teams라는 요청이 왔을 때, [Team]이라는 배열을 return. 그 Team에 대한 명세는 바로 아래에 또 나옴.

const resolvers = {
    Query: {
        teams: () => database.teams
            .map((team) => {
                team.supplies = database.supplies
                    .filter((supply) => {
                        return supply.team === team.id
                    })
                return team
            }),
        team: (parent, args, context, info) => database.teams
            .filter((team) => {
                return team.id === args.id
            })[0],
        equipments: () => database.equipments,
        supplies: () => database.supplies
    },
    Mutation: {
        deleteEquipment: (parent, args, context, info) => {
            const deleted = database.equipments
                .filter((equipment) => {
                    return equipment.id === args.id
                })[0]
            database.equipments = database.equipments
                .filter((equipment) => {
                    return equipment.id !== args.id
                })
            return deleted
        },
        insertEquipment: (parent, args, context, info) => {
            database.equipments.push(args)
            return args
        },
        editEquipment: (parent, args, context, info) => {
            return database.equipments.filter((equipment) => {
                return equipment.id === args.id
            }).map((equipment) => {
                Object.assign(equipment, args)
                return equipment
            })[0]
        },
    }
}
const server = new ApolloServer({ typeDefs, resolvers })
// ApolloServer는 typeDefs, resolvers를 인자로 받아, 생성자로 서버를 생성하고 listen 명령어로 서버를 실행
// typeDefs: 명세에서 사용될 데이터, 요청의 타입을 지정. gql (탬플릿 리터럴) 로 생성.
// resolvers: 서비스의 액션들을 함수로 지정. 요청에 따라 데이터를 입력, 수정, 삭제, 변환.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})