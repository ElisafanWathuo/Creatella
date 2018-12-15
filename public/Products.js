var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Products = function (_React$Component) {
    _inherits(Products, _React$Component);

    function Products(props) {
        _classCallCheck(this, Products);

        var _this = _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this, props));

        _this.scrollEventHandler = function (domNode) {
            if (_this.domNode.scrollTop + _this.domNode.clientHeight >= _this.domNode.scrollHeight) {
                _this.loadMoreItems();
            }
        };

        _this.loadMoreItems = function () {
            if (_this.state.loadingState) {
                return;
            }
            _this.setState({ loadingState: true, page: _this.state.page + 1 });
            var connAddress = 'http://localhost:3000/api/products';
            if (_this.state.sort == '') {
                connAddress = 'http://localhost:3000/api/products?_page=' + _this.state.page + '&_limit=' + _this.state.limit;
            } else {
                connAddress = 'http://localhost:3000/api/products?_sort' + _this.state.sort;
            }
            setTimeout(function () {
                axios.get(connAddress).then(function (response) {
                    _this.setState(function () {
                        return {
                            products: [].concat(_toConsumableArray(_this.state.products), [response.data]),
                            loadingState: false
                        };
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            }, 1000);
        };

        _this.displayItems = function () {
            var connAddress = 'http://localhost:3000/api/products';
            if (_this.state.sort == '') {
                connAddress = 'http://localhost:3000/api/products?_page=' + _this.state.page + '&_limit=' + _this.state.limit;
            } else {
                connAddress = 'http://localhost:3000/api/products?_sort=' + _this.state.sort;
            }
            axios.get(connAddress).then(function (response) {
                _this.setState(function () {
                    return {
                        products: [].concat(_toConsumableArray(_this.state.products), [response.data])
                    };
                });
            }).catch(function (error) {
                console.log(error);
            });
        };

        _this.handleChange = function (event) {
            _this.setState({ sort: event.target.value, products: [] }, function () {
                _this.displayItems();
            });
        };

        _this.state = {
            products: [],
            sort: '',
            limit: 20,
            page: 0,
            loadingState: false
        };
        return _this;
    }

    _createClass(Products, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var domNode = ReactDOM.findDOMNode(this.domNode);
            domNode.addEventListener('scroll', this.scrollEventHandler(domNode));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var domNode = ReactDOM.findDOMNode(this.domNode);
            domNode.removeEventListener('scroll', this.scrollEventHandler(domNode));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var items = [];
            this.state.products.map(function (igKey) {
                var item = igKey.map(function (ik) {
                    return React.createElement(
                        'div',
                        { style: {
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                padding: '20px',
                                textAlign: 'center'
                            } },
                        React.createElement(
                            'div',
                            { style: {
                                    fontSize: ik["size"],
                                    padding: '20px'
                                } },
                            ik["face"]
                        ),
                        React.createElement(
                            'div',
                            null,
                            '$' + ik["price"].toFixed(2)
                        )
                    );
                });

                items = [].concat(_toConsumableArray(items), [item]);
            });
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    {
                        style: { height: "30px", alignItems: "center", paddingTop: "20px" }
                    },
                    React.createElement(
                        'select',
                        { value: this.state.sort, onChange: this.handleChange },
                        React.createElement(
                            'option',
                            { value: '' },
                            'Sort By'
                        ),
                        React.createElement(
                            'option',
                            { value: 'price' },
                            'Price'
                        ),
                        React.createElement(
                            'option',
                            { value: 'size' },
                            'Size'
                        ),
                        React.createElement(
                            'option',
                            { value: 'id' },
                            'Id'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { style: {
                            display: 'grid',
                            gridTemplateColumns: 'auto auto auto',
                            padding: '10px',
                            overflow: "scroll",
                            height: "700px",
                            backgroundColor: "#e6e6e6"
                        },
                        ref: function ref(node) {
                            return _this2.domNode = node;
                        },
                        onScroll: this.scrollEventHandler.bind(this)
                    },
                    items,
                    this.state.loadingState ? React.createElement(
                        'p',
                        { className: 'loading' },
                        ' loading More Items..'
                    ) : ""
                )
            );
        }
    }]);

    return Products;
}(React.Component);

ReactDOM.render(React.createElement(Products, null), document.getElementById('root'));