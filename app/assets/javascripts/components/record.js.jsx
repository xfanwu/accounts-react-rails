var Record = React.createClass({
  getInitialState: function () {
    return {edit: false};
  },

  handleToggle: function (e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  },

  handleEdit: function (e) {
    e.preventDefault();
    var data = {
      title: React.findDOMNode(this.refs.title).value,
      date: React.findDOMNode(this.refs.date).value,
      amount: React.findDOMNode(this.refs.amount).value
    };
    return $.ajax({
      method: 'PUT',
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      data: {
        record: data
      },
      success: (function(_this) {
        return function(data) {
          _this.setState({
            edit: false
          });
          return _this.props.handleEditRecord(_this.props.record, data);
        };
      })(this)
    });
  },

  recordForm: function () {
    return (
      <tr>
        <td><input type="date" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/></td>
        <td><input type="number" className="form-control" defaultValue={this.props.record.amount} ref="amount"/></td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  },

  recordRow: function () {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  },

  handleDelete: function (e) {
    e.preventDefault();
    return $.ajax({
      method: 'DELETE',
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      success: (function(_this) {
        return function() {
          return _this.props.handleDeleteRecord(_this.props.record);
        };
      })(this)
    });
  },

  render: function () {
    if (this.state.edit) return this.recordForm();
    else return this.recordRow();
  }
});
