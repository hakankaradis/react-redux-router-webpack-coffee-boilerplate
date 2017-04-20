var schedule = require('node-schedule');
var kodingReqs = require('./kodingreqs');
var createMappingJson = require('./createMappingJson');


module.exports = function(kodingToken, groupName, commitId, full_name, _id) {

  var j;

  return j = schedule.scheduleJob('30 * * * * *', function() {

    return kodingReqs(kodingToken, groupName, {
      _id: _id
    }, 'JComputeStack.one').then(function(stack) {
      var machine;
      machine = stack.machines[0];
      return kodingReqs(kodingToken, groupName, {
        _id: machine._id
      }, 'JMachine.one').then(function(machine) {
        var state;
        state = machine.status.state;
        if (state === 'Running') {

          j.cancel();
          createMappingJson(full_name, commitId);
        }

      })["catch"](function(error) {
        return console.log('Machine not Found');
      });
    })["catch"](function(error) {
      return console.log('Stack Not Found');
    });
  });
};

