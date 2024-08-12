import useStates, { StateRow } from '../hooks/useStates'

import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

const columns = [
    {
        name: 'Id',
        selector: (row: StateRow) => row.id,
    },
    {
        name: 'Key',
        selector: (row: StateRow) => row.key,
    },
    {
        name: 'Name',
        selector: (row: StateRow) => row.name,
    },
    {
        name: 'Slug',
        selector: (row: StateRow) => row.slug,
    },
    {
        name: 'College Concentrations',
        cell: (row: StateRow) => (
            <Link to="/college" state={row}>College Concentrations</Link>
        ),
    },
]
const StateSearch = () => {
    const { results, clearFilter, search, nameFilter } = useStates()

    if (!results) {
        return <div>'Loading states...'</div>
    }

    return (
        <div>
            <div>
                <label htmlFor="state">Search for a state</label>
                <input
                    value={nameFilter}
                    onChange={(evt) => search(evt.target.value)}
                    name="state"
                    type="text"
                />
                <button onClick={clearFilter}>Clear Search</button>
            </div>
            <DataTable
                title="State List"
                columns={columns}
                data={results}
                progressPending={results === undefined}
                pagination
            />
        </div>
    )
}

export default StateSearch
