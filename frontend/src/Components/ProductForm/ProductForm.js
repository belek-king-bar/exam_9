import React, {Component} from 'react'
import axios from "axios";
import {CATEGORIES_URL} from "../../api_urls";

// из библиотеки react-datepicker
// стили для дэйтпикера подключены в index.js! без них он не работает!
import DatePicker from "react-datepicker"

// из библиотеки react-select
import Select from 'react-select';


class ProductForm extends Component {
    constructor(props) {
        super(props);


        const newProduct = {
            name: "",
            description: "",
            arrival_date: "",
            price: "",
            categories: []
        };

        this.state = {
            categories: [],
            submitEnabled: true,
            product: newProduct,
            posterFileName: ""
        };

        // если movie передан через props
        if(this.props.product) {
            this.state.product = this.props.product;
        }

    }


    componentDidMount() {
        // загружаем категории
        axios.get(CATEGORIES_URL)
            .then(response => {
                const categories = response.data;
                console.log(categories);
                // и сохраняем их в state
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.categories = categories;
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response)
            });
    }

    // блокировка отправки формы на время выполнения запроса
    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    // разблокировка отправки формы
    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };

    dateToObject = (date) => {
        return date ? new Date(date) : null;
    };

    getCategoryOptions = () => {
        return this.state.categories.map(category => {
            return {value: category.id, label: category.name}
        });
    };

    getCategoryValue = () => {
        if(this.state.categories.length > 0) {
            return this.state.product.categories.map(id => {
                const category = this.state.categories.find(category => category.id === id);
                return {value: id, label: category.name};
            });
        }
        return [];
    };

    updateProductState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let product = {...prevState.product};
            product[fieldName] = value;
            newState.product = product;
            return newState;
        });
    };

    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateProductState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updateProductState(field, date.toISOString().slice(0, 10));
    };

    // обработчик изменения select
    selectChanged = (field, values) => {
        const category_ids = values.map(item => item.value);
        this.updateProductState(field, category_ids);
    };

    // обработчик выбора файла
    fileChanged = (event) => {
        const fileName = event.target.value;
        const fieldName = event.target.name;
        const fileObject = event.target.files.length > 0 ? event.target.files[0] : null;
        this.updateProductState(fieldName, fileObject);
        this.setState(prevState => {
            let newState = {...prevState};
            newState[fieldName + 'FileName'] = fileName;
            return newState;
        });
    };

    // отправка формы
    // внутри вызывает onSubmit - переданное действие - со своим фильмом в качестве аргумента.
    submitForm = (event) => {
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.product)
                .then(this.enableSubmit);
        }
    };

    showErrors = (name) => {
        if(this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        if (this.state.product) {
            const {name, description, arrival_date, price} = this.state.product;
            // распаковка переменных из state.
            const {posterFileName, submitEnabled} = this.state;

            // форматирование дат для DatePicker'ов
            const arrivalDateSelected = this.dateToObject(arrival_date);


            const selectOptions = this.getCategoryOptions();

            const selectValue = this.getCategoryValue();

            return <div className="mb-3">
                <form onSubmit={this.submitForm}>
                    {this.showErrors('non_field_errors')}
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('name')}
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <input type="text" className="form-control" name="description" value={description}
                               onChange={this.inputChanged}/>
                        {this.showErrors('description')}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Дата создания</label>
                        <div>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={arrivalDateSelected}
                                        className="form-control"
                                        name="arrival_date"
                                        onChange={(date) => this.dateChanged('arrival_date', date)}/>
                            {this.showErrors('release_date')}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Категории</label>
                        <Select options={selectOptions} isMulti={true} name='categories' value={selectValue}
                                onChange={(values) => this.selectChanged('categories', values)}/>
                        {this.showErrors('categories')}
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Цена</label>
                        <input type="text" className="form-control" name="price" value={price}
                               onChange={this.inputChanged}/>
                        {this.showErrors('price')}
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </div>;
        }
    }
}


export default ProductForm;