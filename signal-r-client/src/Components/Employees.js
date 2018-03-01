import React from "react";

export class Employees extends React.Component {

    render() {
        const data = [
            {name: 'bilal', age: 28},
            {name: 'rahul', age: 30},
            {name: 'jay', age: 25},
            {name: 'amar', age: 20},
            {name: 'raj', age: 30},
            {name: 'vikas', age: 24}
        ];

        let index = 1;
        for (let emp of data) {
            emp.id = index++;
        }
        return <div>
            {data.map(emp => <div>
                <div>{emp.id} : {emp.name} - {emp.age} years</div>
            </div>)}
        </div>
    }
}