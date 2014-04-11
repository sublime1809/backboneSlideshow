/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var Router = Backbone.Router.extend({
    routes: {
        "picture/:uid" : "showPic"
    },
    showPic: function(uid) {
        console.log("showing: " + uid);
    }
});

new Router();
Backbone.history.start();   // won't check for changes without this