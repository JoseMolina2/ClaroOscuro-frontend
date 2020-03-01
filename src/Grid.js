import React from 'react';
import './gridstyle.css';


const Table = (props) => {
    const rows = props.rows;
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Identidad</th>
                    <th>Sexo</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Edad</th>
                    <th>Observaciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, key) => {
                        let date = row.fechanacimiento.slice(0, 10);
                        return (
                            <tr key={key}>
                                <td>{row.nombre}</td>
                                <td>{row.identidad}</td>
                                <td>{row.sexo}</td>
                                <td>{date}</td>
                                <td>{row.edad}</td>
                                <td>{row.observaciones}</td>
                            </tr>
                        )

                    }
                    )
                }
            </tbody>
        </table>
    );
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }

        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        const response = await fetch('http://localhost:3001/clientes', { method: 'GET' });
        const json = await response.json();
        if (response.ok) {
            if (this._isMounted) this.setState({ data: json });
        }
        else alert('Hubo un error al tratar de listar a los clientes');
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let table = '';
        const rows = this.state.data;
        if (rows) table = <Table rows={rows}></Table>
        return (
            <div>
                <h2>Listar Registro</h2>
                <div className='container'>
                    {table}
                </div>

            </div>
        );
    }
}

export default Grid;