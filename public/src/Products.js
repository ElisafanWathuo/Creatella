
class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            sort: '',
            limit: 20,
            page: 0,
            loadingState: false
        }
    }

    componentDidMount() {
        let domNode = ReactDOM.findDOMNode(this.domNode);
        domNode.addEventListener('scroll', this.scrollEventHandler(domNode));
    }
    componentWillUnmount() {
        const domNode = ReactDOM.findDOMNode(this.domNode)
        domNode.removeEventListener('scroll', this.scrollEventHandler(domNode));
    }
    scrollEventHandler = (domNode) => {
        if (
            this.domNode.scrollTop + this.domNode.clientHeight >=
            this.domNode.scrollHeight
        ) {
            this.loadMoreItems();
        }
    }

    loadMoreItems = () => {
        if (this.state.loadingState) {
            return;
        }
        this.setState({ loadingState: true, page: (this.state.page + 1) });
        let connAddress = 'http://localhost:3000/api/products';
        if (this.state.sort == '') {
            connAddress = 'http://localhost:3000/api/products?_page=' + this.state.page + '&_limit=' + this.state.limit;
        } else {
            connAddress = 'http://localhost:3000/api/products?_sort' + this.state.sort;
        }
        setTimeout(() => {
            axios.get(connAddress).then(
                (response) => {
                    this.setState(() => {
                        return {
                            products: [...this.state.products, response.data],
                            loadingState: false
                        }
                    })
                }
            ).catch((error) => {
                console.log(error);
            });
        }, 1000);

    }

    displayItems = () => {
        let connAddress = 'http://localhost:3000/api/products';
        if (this.state.sort == '') {
            connAddress = 'http://localhost:3000/api/products?_page=' + this.state.page + '&_limit=' + this.state.limit;
        } else {
            connAddress = 'http://localhost:3000/api/products?_sort=' + this.state.sort;
        }
        axios.get(connAddress).then(
            (response) => {
                this.setState(() => {
                    return {
                        products: [...this.state.products, response.data]
                    }
                })
            }
        ).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event) => {
        this.setState({ sort: event.target.value, products: [] }, () => {
            this.displayItems();
        });

    }

    render() {
        let items = [];
        this.state.products.map(igKey => {
            let item = igKey.map(ik => {
                return (
                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        textAlign: 'center',
                    }}>

                        <div style={{
                            fontSize: ik["size"],
                            padding: '20px'
                        }
                        }>
                            {ik["face"]}
                        </div>
                        <div>
                            {'$' + ik["price"].toFixed(2)}
                        </div>
                    </div>
                );
            });


            items = [...items, item];
        });
        return (
            <div>
                <div
                    style={{ height: "30px", alignItems: "center", paddingTop: "20px" }}
                >
                    <select value={this.state.sort} onChange={this.handleChange}>
                        <option value=''>Sort By</option>
                        <option value='price'>Price</option>
                        <option value="size">Size</option>
                        <option value="id">Id</option>
                    </select>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    padding: '10px',
                    overflow: "scroll",
                    height: "700px",
                    backgroundColor: "#e6e6e6"
                }}
                    ref={node => this.domNode = node}
                    onScroll={this.scrollEventHandler.bind(this)}
                >
                    {items}

                    {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
                </div>
            </div>

        );

    }


}

ReactDOM.render(
    <Products />,
    document.getElementById('root')
)