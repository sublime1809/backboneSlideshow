/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var MenuItem = Backbone.Model.extend({
    initialize: function() {
        console.log("Creating Item: ");
        this.bind("change:displayName", function() {
            console.log("You changed the display name! GASP!");
        });
        this.bind("error", function( model, error) {
            console.log("ERROR: " + error);
        });
    },
    defaults: {
        displayName: '',
        action: 'index'
    }
});

var MenuItems = Backbone.Collection.extend({
    initialize: function() {
        console.log("Creating MenuItems: ");
    },
    model: MenuItem
});

var Menu = Backbone.View.extend({
    // defaults
    defaults: {
        width: 40,
        height: 500,
        textalign: 'left',  // possible values 'left', 'right', 'center'
        backgroundcolor: '',
        transparency: 1,    // default - no transparency 
        direction: 'horizontal'     // possible values: 'horizontal','vertical'
    },
    initialize: function() {
        console.log("Creating View: ");
        this.$el.css({
            'width': this.options.width, 
            'height': this.options.height
        });
        if(this.options.transparency) {
            this.$el.css({
                'opacity': this.options.transparency,
                'filter': 'alpha(opacity=' + (this.options.transparency * 100) + ")"
            });
        }
        
        this.render();
    },
    render: function() {
        var ul = $("<ul></ul>");
        _.each(this.collection.toArray(), function(item) {
            var li = $("<li></li>");
            li.text(item.get('displayName'));
            li.click(function() { window.location.hash = item.get('action'); });
            li.css({'cursor': 'pointer'});
            console.log(this.options.direction);
            console.log(this.defaults.direction);
            if((this.options.direction == undefined && this.defaults.direction == 'horizontal') 
                    || this.options.direction == 'horizontal') {
                li.css('display', 'inline-block');
            }
            ul.append(li);
        }, this);
        this.$el.append(ul);
    },
    events: {
        "mouseenter li" : "hoverOn",
        "mouseleave li" : "hoverOff",
        "click li" : "runAction"
    },
    hoverOn: function(e) {
        $(e.target).css('background-color', '#00FF00');
    },
    hoverOff: function(e) {
        $(e.target).css('background-color', '#FFFFFF');
    },
    runAction: function(e) {
        
    }
});