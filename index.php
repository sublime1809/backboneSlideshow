<?php
ini_set('display_errors', true);
?><!DOCTYPE html>
<html>
    <head>
        <title>AM Photography</title>
        <link rel="stylesheet" href="includes/styles/main.css" />
    </head>
    <body>
        <?php  ?>
        <div id="background"></div>
        
        <div id="content">
            <nav id="mainMenu">
            
            </nav>
        </div>
        <!-- End Javascript Loading -->
        <script type="text/javascript" src="includes/scripts/jquery.js"></script>
        <script type="text/javascript" src="includes/scripts/underscore-min.js"></script>
        <script type="text/javascript" src="includes/scripts/backbone-min.js"></script>
        
        <script type="text/javascript" src="includes/scripts/plugins/Slideshow.js"></script>
        <script type="text/javascript" src="includes/scripts/plugins/Menu.js"></script>
        <script type="text/javascript" src="includes/scripts/Routers.js"></script>
        
        <script>
            // Menu
            var item = new MenuItem({ displayName: 'Stuff', action: 'hi' });
            var menuitems = new MenuItems([
                { displayName: 'Stuff', action: 'hi' },
                { displayName: 'Extra', action: 'more' }
            ]);
            var menu = new Menu({ el: $('#mainMenu'), width: '200px', height: '100%', collection: menuitems });
            
            // Slideshow background
            var pictures = new Pictures([
                { src: 'images/CGAdfinal.jpg' }, 
                { src: 'images/FAS_Teether.jpg' },
                { src: 'images/Herbal_Essences.jpg' }, 
                { src: 'images/Logo_final.png' }
            ]);
            var slideshow = new Slideshow({ 
                el: $('#background'), 
                collection: pictures, 
                backgroundcolor: '#000',
                timeout: 3, 
                width: '100%', 
                height: '100%', 
                buttons: {
//                    preview: true,
                    size: 40,
                    shape: 'circle',
                    backgroundcolor: '#0000FF',
                    navigation: 'vertical',
                    navigationType: 'static'
                }
            });
        </script>
    </body>
</html>
