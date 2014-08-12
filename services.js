angular.module('pas')

.service('cbs',
  function() {
    return {
      success: function() {
        console.log('Success:', arguments)
      },

      error: function() {
        console.log('Error:', arguments)
      }
    }
  }
)