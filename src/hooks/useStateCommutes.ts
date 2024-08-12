import { useEffect, useState } from 'react'

import client from '../api/client'
import { gql } from '@apollo/client'

export interface StateRow {
    id: string
    key: string
    name: string
    slug: string
}

const useStateCommutes = () => {
    const [comparisonResults, setComparisonResults] = useState<any[]>([])
    const [year, setYear] = useState('2012');
    const [selectedStates, setSelectedStates] = useState<StateRow[]>([]);

    useEffect(() => {
        if (selectedStates.length > 1 && year) {

            function generateQuery(stateName: string) {
                return {
                    query: gql`query Query {
                    states(name: "${stateName}") {
                        id
                        key
                        slug
                        name
    
                        commuteTimes(year: "${year}") {
                            travelTime
                            numberOfPeople
                            state
                            year
                        }
                        commuteMethods(year: "${year}") {
                            method
                            state
                            year
                            numberOfCommuters
                        }
                }}`
                }
            }

            const fetchData = async () => {
                var results = [];
                for (let selectedState of selectedStates) {
                    const query = generateQuery(selectedState.slug)
                    const data = await client.query(query)
                    results.push(data.data.states[0]);
                }
                setComparisonResults(results);
            };
            fetchData()
        } else {
            setComparisonResults([])
        }

    }, [year, selectedStates])


    return { comparisonResults, year, setYear, selectedStates, setSelectedStates }
}

export default useStateCommutes
