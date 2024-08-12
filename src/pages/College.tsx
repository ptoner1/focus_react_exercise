import DataTable from 'react-data-table-component'
import { useLocation } from 'react-router-dom'
import useStates from '../hooks/useStates'
import { useEffect } from 'react'

import useStatesCollegeConcentrations, { CollegeConcentration } from '../hooks/useStatesCollegeConcentrations'

const columns = [
    {
        name: 'area',
        selector: (row: CollegeConcentration) => row.area,
        sortable: true
    },
    {
        name: 'degreeType',
        selector: (row: CollegeConcentration) => row.degreeType,
        sortable: true
    },
    {
        name: 'major',
        selector: (row: CollegeConcentration) => row.major,
        sortable: true
    },
    {
        name: 'year',
        selector: (row: CollegeConcentration) => row.year,
        sortable: true
    },
    {
        name: 'numberAwarded',
        selector: (row: CollegeConcentration) => row.numberAwarded,
        sortable: true
    }
]

const CollegePage = () => {
    const location: any = useLocation();
    const { results } = useStates();
    const { selectedState, setSelectedState, stateDetails } = useStatesCollegeConcentrations();

    useEffect(() => {
        if (location.state) {
            setSelectedState(location.state);
        }
    }, [])

    function handleStateSelect(event: any) {
        const obj = JSON.parse(event.target.value);
        setSelectedState(obj)
    }

    function getTableTitle(): string {
        return "College Concentrations for " + selectedState?.name
    }

    return (
        <div>
            <label htmlFor="states">Select a State &nbsp;</label>
            <select name="states" onChange={event => handleStateSelect(event)}>
                {results?.map(state => <option value={JSON.stringify(state)} selected={state.id == selectedState?.id}>{state.name}</option>)}
            </select>
            <DataTable
                title={getTableTitle()}
                columns={columns}
                data={stateDetails || []}
                progressPending={stateDetails === undefined}
                pagination
            />
        </div>
    )
}

export default CollegePage

