import React from 'react';
import './formstyle.css';

const Row = (props) => {
    return <div className='row'>{props.children}</div>;
}

const Column = (props) => {
    return <div className='column'>{props.children}</div>;
}

const TextNombre = (props) => {
    return <input type="text"
        name="nombre" maxLength="50"
        placeholder="Nombre Completo..."
        onChange={props.onChange}
        required={true}
    />;
}

const TextIdentidad = (props) => {
    return <input type="text" name="identidad"
        pattern="[0-9]{4}-[0-9]{4}-[0-9]{5}"
        placeholder="0000-0000-00000"
        onChange={props.onChange}
        required={true}
    />;
}

const ListSexo = (props) => {
    return (
        <select name="sexo" onChange={props.onChange}>
            <option value='M'>Masculino</option>
            <option value='F'>Femenino</option>
        </select>
    );

}

const TextDate = (props) => {
    return <input type='date'
        name='fechanacimiento'
        max='2002-01-01' min='1950-01-01'
        onChange={props.onChange}
        required={true}
    />;
}

const TextEdad = (props) => {
    return <input type='text' name='edad' value={props.edad} readOnly={true} required={true} />;
}

const TextObservaciones = (props) => {
    return <textarea name='observaciones' placeholder='Observaciones...'
        rows='7' maxLength='200'
        onChange={props.onChange} />;
}

const ButtonsContainer = (props) => {
    return (
        <div className='buttoncontainer'>
            <input type='submit' value='Guardar' />
            <button onClick={props.cancelar}>Cancelar</button>
        </div>
    );
}

const FormDesktop = (props) => {
    return (
        <div className="container">
            <Row>
                <Column>
                    <span>Nombre Completo</span>
                </Column>
                <Column>
                    <span>Identidad</span>
                </Column>
            </Row>
            <Row>
                <Column>
                    <TextNombre onChange={props.onChange} />
                </Column>
                <Column>
                    <TextIdentidad onChange={props.onChange} />
                </Column>
            </Row>
            <br />
            <Row >
                <Column>
                    <span>Sexo</span>
                </Column>
                <Column>
                    <span>Fecha de Nacimiento</span>
                </Column>
            </Row>
            <Row>
                <Column>
                    <ListSexo onChange={props.onChange} />
                </Column>
                <Column>
                    <TextDate onChange={props.onChange} />
                </Column>
            </Row>
            <br />
            <Row>
                <Column>
                    <span>Edad</span>
                </Column>
                <Column>
                    <span>Observaciones</span>
                </Column>
            </Row>
            <Row>
                <Column>
                    <TextEdad edad={props.edad} />
                </Column>
                <Column>
                    <TextObservaciones onChange={props.onChange} />
                </Column>
            </Row>
            <br />
            <ButtonsContainer cancelar={props.cancelar} />
        </div>
    );
}

const FormMobile = (props) => {
    return (
        <div className="container">
            <Column>
                <span>Nombre Completo</span>
            </Column>
            <Column>
                <TextNombre onChange={props.onChange} />
            </Column>
            <br />
            <Column>
                <span>Identidad</span>
            </Column>
            <Column>
                <TextIdentidad onChange={props.onChange} />
            </Column>
            <br />
            <Column>
                <span>Sexo</span>
            </Column>
            <Column>
                <ListSexo onChange={props.onChange} />
            </Column>
            <br />
            <Column>
                <span>Fecha de Nacimiento</span>
            </Column>
            <Column>
                <TextDate onChange={props.onChange} />
            </Column>
            <br />
            <Column>
                <span>Edad</span>
            </Column>
            <Column>
                <TextEdad edad={props.edad} />
            </Column>
            <br />
            <Column>
                <span>Observaciones</span>
            </Column>
            <Column>
                <TextObservaciones onChange={props.onChange} />
            </Column>
            <br />
            <ButtonsContainer cancelar={props.cancelar} />
        </div>
    );
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            nombre: '',
            identidad: '',
            sexo: 'M',
            fechanacimiento: '',
            edad: '',
            observaciones: ''
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    myChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        if (nam === 'fechanacimiento') {
            const hoy = new Date();
            const fechanacimiento = new Date(val);
            const edad = hoy.getFullYear() - (fechanacimiento.getFullYear() + 1);
            this.setState({ edad: edad.toString() });
        }
    }

    async mySubmitHandler(event) {
        event.preventDefault();
        const { nombre, identidad, sexo, fechanacimiento, edad, observaciones } = this.state;
        const data = { nombre, identidad, sexo, fechanacimiento, edad, observaciones };
        try {
            const response = await fetch('http://localhost:3001/clientes', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) alert('El registro se inserto con exito');
        }
        catch (error) { console.log(error); }
    }

    render() {
        const isMobile = this.state.width <= 500;
        if (isMobile) {
            return (
                <div>
                    <h2>Agregar Registro</h2>
                    <form onSubmit={this.mySubmitHandler}>
                        <FormMobile onChange={this.myChangeHandler} edad={this.state.edad}
                            cancelar={this.props.cancelar} />
                    </form>

                </div >

            );
        }
        else {
            return (
                <div>
                    <h2>Agregar Registro</h2>
                    <form onSubmit={this.mySubmitHandler}>
                        <FormDesktop onChange={this.myChangeHandler} edad={this.state.edad}
                            cancelar={this.props.cancelar} onSubmit={this.mySubmitHandler} />
                    </form>
                </div >

            );
        }

    }
}

export default Form;