const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/books.service.js"

export function Dashboard() {

    const [data, setData] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    function loadData() {
        bookService.getCategories().then(setData)
        console.log(data)
    }

    function getArray() {
        let total = 0
        for (const category in data) {
            total += data[category]
        }

        const catArray = []
        for (const category in data) {
            if (data[category] > 1) {
                catArray.push(
                    <React.Fragment>
                        <div key={category} style={{ height: data[category] * 4 + 'em' }} className="cat-bar">
                            {data[category] / total * 100}%
                        </div >
                        <div key={category} className="cat-name"> {category}</div >
                    </React.Fragment>
                )
            }
        }
        return catArray
    }


    if (!data) return <div>Loading...</div>

    return (<React.Fragment>
        <Link to="/book">x</Link>
        <div className="dashboard-chart">
            {getArray()}
        </div>
    </React.Fragment>
    )
}