import useStates, { StateRow } from "../hooks/useStates"
import useStateCommutes from "../hooks/useStateCommutes";
import DataTable from "react-data-table-component";
import { Line, LineChart, XAxis, YAxis } from "recharts";



const CommutePage = () => {
    const { results, clearFilter, search } = useStates()
    const { comparisonResults, year, setYear, selectedStates, setSelectedStates } = useStateCommutes()
    var years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

    if (!results) {
        return <div>'Loading states...'</div>
    }

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
    ]

    function handleRowClicked(row: any) {
        // Could be modified to allow comparison between more than two states.

        if (selectedStates.length < 2 && !selectedStates.includes(row)) {
            setSelectedStates([...selectedStates, row]);
            clearFilter();
            search('')
        }
    }

    function removeSelectedRow(row: any) {
        var filteredSelectedStates = selectedStates.filter(state => state.id !== row.id)
        setSelectedStates(filteredSelectedStates);
    }

    function getTotalCommuters(commuteTimes: any[]) {
        let count = 0;
        commuteTimes.forEach(time => count += time.numberOfPeople);
        return count
    }

    return (

        <div>
            <h2>Select and Compare States by Year</h2>
            <div className="form-field">
                <label htmlFor="year">Year</label>
                <select id="mySelect" name="mySelect" onChange={event => setYear(event.target.value)}>
                    {years.map((year) => {
                        return <option>{year}</option>
                    })}
                </select>
            </div>
            <div>
                <h4>Selected States</h4>
                <ul>
                    {selectedStates.map((item, index) => (
                        <li key={index}>
                            {item.name}
                            <button type="button" onClick={() => removeSelectedRow(item)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            {comparisonResults[0]?.commuteTimes && <>
                <h6>Commute Times</h6>
                <LineChart width={800} height={400} >
                    <Line type="monotone" data={comparisonResults[0]?.commuteTimes} dataKey="numberOfPeople" stroke="#8884d8" />
                    <Line type="monotone" data={comparisonResults[1]?.commuteTimes} dataKey="numberOfPeople" stroke="#ff5733" />
                    <XAxis dataKey="travelTime" />
                    <YAxis />
                </LineChart>
                <b style={{ color: '#8884d8' }}>{comparisonResults[0]?.name} ({getTotalCommuters(comparisonResults[0]?.commuteTimes)} total commuters) &nbsp;</b>
                <b style={{ color: '#ff5733' }}>{comparisonResults[1]?.name} ({getTotalCommuters(comparisonResults[0]?.commuteTimes)} total commuters)</b>
                <h6>Commute Methods</h6>
                <LineChart width={800} height={400} >
                    <Line type="monotone" data={comparisonResults[0]?.commuteMethods} dataKey="numberOfCommuters" stroke="#8884d8" />
                    <Line type="monotone" data={comparisonResults[1]?.commuteMethods} dataKey="numberOfCommuters" stroke="#ff5733" />
                    <XAxis dataKey="method" />
                    <YAxis />
                </LineChart>
                <b style={{ color: '#8884d8' }}>{comparisonResults[0]?.name} &nbsp;</b>
                <b style={{ color: '#ff5733' }}>{comparisonResults[1]?.name}</b>
            </>}
            {/* <button type="button" onClick={compareStates}>Compare</button> */}
            {/* <div className="form-field">
                <label htmlFor="state">Search for a state</label>
                <input
                    value={nameFilter}
                    onChange={(evt) => search(evt.target.value)}
                    name="state"
                    type="text"
                />
                <button onClick={clearFilter}>Clear Search</button>
            </div> */}

            <DataTable
                title=""
                columns={columns}
                data={results}
                progressPending={results === undefined}
                pagination
                onRowClicked={handleRowClicked}
                pointerOnHover
                highlightOnHover
            />
        </div>
    )
}
export default CommutePage
