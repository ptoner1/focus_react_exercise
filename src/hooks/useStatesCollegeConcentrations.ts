import { useEffect, useState } from 'react'

import client from '../api/client'
import { gql } from '@apollo/client'


//  These definitions could be put in a central constants file, where they can be imported by multiple files, rather than being redefined every time we have a new feature
//
export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

export interface CollegeConcentration {
    area: string,
    degreeType: string,
    major: string,
    state: string,
    year: string,
    numberAwarded: any
}

const useStatesCollegeConcentrations = () => {
    const [selectedState, setSelectedState] = useState<StateRow>();
    const [stateDetails, setStateDetails] = useState<CollegeConcentration[]>();

    useEffect(() => {
        if (selectedState?.slug) {
            const fetchData = async () => {
                const data = await client.query({
                    query: gql`
                    query Query {
                        states(name: "${selectedState.slug}") {
                            id
                            key
                            slug
                            name

                            collegeConcentrations(year: null) {
                                area
                                major
                                degreeType
                                state
                                year
                                numberAwarded
                            }
                        }
                    }
                `,
                })
                setStateDetails(data.data.states[0].collegeConcentrations)
            }
            fetchData()
        }

    }, [selectedState])

    return { selectedState, setSelectedState, stateDetails }
}

export default useStatesCollegeConcentrations
