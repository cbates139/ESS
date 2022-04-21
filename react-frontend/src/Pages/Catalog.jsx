import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            product: [],
            searchInput: '',
            filteredData: [],
            dispalyItems: []
        }

        this.setProduct = this.setProduct.bind(this);
        this.searchItems = this.searchItems.bind(this);
    }

    componentDidMount() {
        axios.get('/CatalogItem',{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}).then((res) => {
            this.setState({ 'items': res.data });
        }).catch()
    }


    async setProduct(props) {
        await this.setState({ 'product': props })
        document.location.href = `catalogueItem?id=${this.state.product.id}`
        console.log(this.state.product);
    }
    async searchItems(searchValue) {
        const search = searchValue;
        await this.setState({'searchInput': search})
        
        const filteredData = this.state.items.filter((item, index) => {
            return Object.values(item.name).join('').toLowerCase().includes(searchValue.toLowerCase())
            
        })
        await this.setState({'filteredData': filteredData})
       
        
    }

    


    render() {
        var tickets = [];
        if(this.state.filteredData.length > 1){tickets = this.state.filteredData }
        else {tickets = this.state.items}
            
        const items = [];
        const indexes = [];
        const oldItems = this.state.items;
        for (const [i, value] of oldItems.entries()) {

            indexes.push(i, value.name);
        }

        for (const [i, value] of tickets.entries()) {
            var index = indexes.indexOf(value.name);

            
            items.push(
                <Col md={3}>
                    <Product key={index} sendProduct={this.setProduct} productValue={value}></Product>
                    
                </Col>
                
            );
            
        }
        
        return (
            <div>
                <head> <meta http-equiv="Content-Security-Policy" content=" style-src 'self'; base-uri 'self'; img-src https: data:;"></meta></head>
            <div style={{textAlign: "center"}}>
                    
                    <h2>ABC Catalog</h2>
                    <p>Browse the catalog and select the item you wish to request a for</p>
                    <input icon='search'
                    placeholder='Search...'
                    onChange={(e) => this.searchItems(e.target.value)}
                    />
                    
            </div>
            <div>
                <Row>
                {items}
                </Row>
            </div>
            </div>
        )
    }
}

export default Catalog;
