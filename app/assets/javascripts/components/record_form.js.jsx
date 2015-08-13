var RecordForm = React.createClass({
  getInitialState: function () {
    return ({
      date: '',
      title: '',
      amount: ''
    });
  },

  handleChange: function (e) {
    var name = e.target.name;
    var params = {};
    params[name] = e.target.value;
    this.setState(params);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    $.post('', 
           { record: this.state }, 
           (function(_this) {
             return function(data) {
               _this.props.handleNewRecord(data);
               return _this.setState(_this.getInitialState());
             };
           })(this), 
           'JSON');
  },

  valid: function () {
    return (this.state.title && this.state.date && this.state.amount);
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="form-group">
          <input type="date" className="form-control" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Amount" name="amount" value={this.state.amount} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
      </form>
    );
  }
});

