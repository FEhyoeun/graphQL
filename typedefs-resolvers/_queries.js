const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        equipments: [Equipment]
        equipmentAdvs: [EquipmentAdv]
        supplies: [Supply]
        softwares: [Software]
        software: Software
        people: [People]
        person: People
        peopleFiltered(
            team: Int,
            sex: Sex,
            blood_type: BloodType,
            from: String
        ): [People]
        peoplePaginated(
            page: Int!,
            per_page: Int!
        ): [People]
        givens: [Given]
    }
`

module.exports = typeDefs