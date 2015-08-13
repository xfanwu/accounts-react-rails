'use strict';

var Records = React.createClass({
  getInitialState: function () {
    return {records: this.props.data};
  },

  getDefaultProps: function () {
    return {records: []};
  },

  addRecord: function (record) {
    var records = React.addons.update(this.state.records, { $push: [record] });
    this.setState({records: records});
  },

  deleteRecord: function (record) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, { $splice: [[index, 1]] });
    this.replaceState({records: records});
  },

  updateRecord: function (record, data) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });
    this.replaceState({ records: records });
  },

  credits: function () {
    var credits = this.state.records.filter(function(val){
      return val.amount >= 0;
    });

    return credits.reduce((function(prev, curr){
      return prev + parseFloat(curr.amount);
    }), 0);
  },

  debits: function () {
    var debits = this.state.records.filter(function(val){
      return val.amount < 0;
    });

    return debits.reduce((function(prev, curr){
      return prev + parseFloat(curr.amount);
    }), 0);
  },

  balance: function () {
    return this.credits() + this.debits();
  },

  render: function () {
    var records = this.state.records;
    var rows = [];

    for (var i in records) {
      var record = records[i];
      rows.push(React.createElement(Record, {
        key: record.id, 
        record: record, 
        handleDeleteRecord: this.deleteRecord, 
        handleEditRecord: this.updateRecord
      }));
    }

    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          {React.createElement(AmountBox, {type: 'success', amount: this.credits(), text: 'Credits'})}
          {React.createElement(AmountBox, {type: 'danger', amount: this.debits(), text: 'Debits'})}
          {React.createElement(AmountBox, {type: 'info', amount: this.balance(), text: 'Balance'})}
        </div>
        {React.createElement(RecordForm, {handleNewRecord: this.addRecord})}
        <hr/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
});
