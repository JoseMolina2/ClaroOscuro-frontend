import React from 'react';
import './style.css';
import Form from './Form';
import Grid from './Grid';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                visible: false
            },
            grid: {
                visible: false
            }
        };

        this.showComponent = this.showComponent.bind(this);
    }

    showComponent(component = '') {
        if (component === 'form') {
            this.setState({ form: { visible: true }, grid: { visible: false } });
            return;
        }

        if (component === 'grid') {
            this.setState({ form: { visible: false }, grid: { visible: true } });
            return;
        }

        this.setState({ form: { visible: false }, grid: { visible: false } });

    }

    render() {
        let form = '';
        let grid = '';
        if (this.state.form.visible) form = <Form cancelar={this.showComponent.bind(this)}></Form>;
        if (this.state.grid.visible) grid = <Grid></Grid>

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>Pantalla Demo</h1>
                    <button onClick={this.showComponent.bind(this, 'form')}>Agregar Registros</button>
                    <br />
                    <br />
                    <button onClick={this.showComponent.bind(this, 'grid')}>Listar Registros</button>
                </div>
                <hr />
                <div>
                    {form}
                    {grid}
                </div>
            </div>
        );
    }
}

export default App;