/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var Picture = Backbone.Model.extend({
    initialize: function() {
        
    },
    defaults: {
        'src': '',
        'alt': ''
    }
});

var Pictures = Backbone.Collection.extend({
    initialize: function() {
        
    }, 
    model: Picture
});

var Slideshow = Backbone.View.extend({
    defaults: {
        timeout: 1,
        currentIndex: 0,
        buttons: {
            size: 10,
            preview: false,
            orientation: 'right',   // possible values: 'top', 'left', 'right', 'bottom'
            navigation: 'vertical',      // possible values: 'horizontal', 'vertical'
            navigationType: 'static',   // possible values: 'static','hover' - hover will turn the mouse into the navigation
            shape: 'circle'              // possible values: 'circle', 'square', 'triangle'
        }
    },
    initialize: function() {
        this.currentIndex = 0;
        // this.$el is a div
        this.$el.css({'width': this.options.width, 'height': this.options.height, 'text-align': 'center' });
        if(this.options.backgroundcolor) {
            this.$el.css('background-color', this.options.backgroundcolor);
        }
        this.$el.append("<img></img>");
        this.image = this.$el.children('img').first();
        this.image.css({'width': 'auto', 'height': '100%'});
        
        this.displayPicture(this.collection.at(0));
        
        if(this.options.buttons) {
            if( this.options.buttons.size == undefined ) { this.options.buttons.size = this.defaults.buttons.size; }
            if( this.options.buttons.orientation == undefined ) { this.options.buttons.orientation = this.defaults.buttons.orientation; }
            this.appendButtons(this.options.buttons.preview);
            if( this.options.buttons.navigation != undefined ) {
                this.appendPagingNav();
            }
        }
        (function(view) {
            view.timer = window.setInterval(function() { view.cyclePictures(); }, view.options.timeout*1000);
        })(this);
    },
    cyclePictures: function(index) {
        if(index == undefined) {
            this.currentIndex = (this.currentIndex + 1) % this.collection.length;
        } else {
            this.currentIndex = index;
        }
        
        var currentPic = this.collection.at(this.currentIndex);
        this.displayPicture(currentPic);
    },
    displayPicture: function(picture) {
        this.image.attr({src: picture.get('src')});
    },
    appendButtons: function() {
        var _this = this;
        var buttonHolder = $("<div></div>");
        _.each(this.collection.toArray(), function(picture) {
            var button = $("<div></div>");
            if(_this.options.buttons.preview) { // if orientation is on top/bottom, the width will be set, otherwise the height will be set
                var buttonBG = $("<img></img>");
                buttonBG.attr('src', picture.get('src'));
                if(_this.options.buttons.orientation == 'bottom' || _this.options.buttons.orientation == 'top') {
                    buttonBG.css({ 'height': _this.options.buttons.size + 'px' });
                } else {
                    if(_this.options.buttons.orientation == 'right') {
                        
                    }
                    buttonBG.css({ 'width': _this.options.buttons.size + 'px' });
                }
                button.append(buttonBG);
            } else {
                button.css({ 'width': _this.options.buttons.size + 'px', 'height': _this.options.buttons.size + 'px' });
                switch(_this.options.buttons.shape) {
                    case 'square':
                        if(_this.options.buttons.backgroundcolor) {
                            button.css({'background-color': _this.options.buttons.backgroundcolor});
                        }
                        break;
                    case 'triangle':
                        button.css({ 
                            'width': '0px',
                            'height': '0px',
                            'border-left': (_this.options.buttons.size/2) + 'px solid transparent', 
                            'border-right': (_this.options.buttons.size/2) + 'px solid transparent',
                            'border-bottom': (_this.options.buttons.size) + 'px solid ' + _this.options.buttons.backgroundcolor
                        });
                        break;
                    case 'circle':
                    default:
                        button.css({ 'border-radius': (_this.options.buttons.size/2) + 'px' });
                        if(_this.options.buttons.backgroundcolor) {
                            button.css({'background-color': _this.options.buttons.backgroundcolor});
                        }
                        break;
                }
            }
            
            if(_this.options.buttons.orientation == 'bottom' || _this.options.buttons.orientation == 'top') {
                button.css({ 'display': 'inline-block' });
            } else if(_this.options.buttons.orientation == 'left') {
                buttonHolder.css({ 'float': 'left' });
            } else {
                buttonHolder.css({ 'float': 'right' });
            }
            button.css({ 'margin': '3px', 'cursor': 'pointer' });
            buttonHolder.append(button);
            button.click( function() {
                _this.displayPicture(picture);
                clearInterval(_this.timer);
                (function(view) {
                    view.timer = window.setInterval(function() { view.cyclePictures(); }, view.options.timeout*1000);
                })(_this);
            } );
        }, this);
        this.$el.append(buttonHolder);
    },
    appendPagingNav: function() {
        var nav = $("<div></div>")
        if( this.options.buttons.navigation == 'horizontal') {
            
        } else {
            
        }
    }
});