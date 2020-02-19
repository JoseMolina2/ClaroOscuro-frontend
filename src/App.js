import React from 'react';
import './style.css';
import Form from './Form';

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
        this.setState({ form: { visible: false }, grid: { visible: false } });

    }

    render() {
        let form = '';
        if (this.state.form.visible) form = <Form cancelar={this.showComponent.bind(this)}></Form>;

        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>Pantalla Demo</h1>
                    <button onClick={this.showComponent.bind(this, 'form')}>Agregar Registros</button>
                </div>
                <hr />
                <div>
                    {form}
                </div>
            </div>
        );
    }
}

export default App;