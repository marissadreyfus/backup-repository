'use strict';
(function (window) {
    window.game = window.game || {};
    let 
        game = window.game,
        animations = {},
        spawnX = 30,
        spawnY = 600;
        
    game.createPlayer = function (gameState) {
        let 
            asset = init(gameState),
            _direction = 1,
            _walk = createState('walk'), //create the function for this, make sure it works
            _run = createState('run'),
            _idle = createState('idle'),
            _stop = createStopState('stop'),
            _state = _idle;
            _jump = createState('jump')
        
        function createState(name) {
            return {
                idle: idle,
                walk: walk,
                run: run,
                stop: stop,
                onCursorLeft: walk,
                onCursorRight: walk,
                enter: function() { console.log(`entering ${ name }`); asset.body.setSize(22, 95, 0, -3); },
                getName: function() { return name; }
            };
        }
        
        function createStopState(name) {
            var 
                xOffset = .5,
                yOffset = -1,
                state = createState(name);
            state.stop = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.setSize(22, 95, 0, -2);
                asset.x += xOffset * _direction;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        /*
          Tranistion to the idle state.
         */
        function idle() {
            asset.animations.play('idle');
            setState(_idle);
        }
        
        /**
         * Tranistion to the run state.
         */
        function run() {
            asset.scale.x = _direction;
            asset.body.velocity.x = 200 * _direction;
            asset.animations.play('run');
            setState(_run);
        }
        //transition to walk state
        function walk() {
            asset.scale.x = _direction;
            asset.body.velocity.x = 200 * _direction;
            asset.animations.play('walk');
            setState(_run);
        }
        
        /**
         * Tranistion to the stop state.
         */
        function stop() {
            asset.animations.play('stop');
            setState(_stop);
        }
        
        function setState(state) {
            _state.exit();
            _state = state;
            _state.enter();
        }
        //gravity & bounce
        asset.body.bounce.y = 0.4;
        asset.body.gravity.y = 900;
        return {
            asset: asset,
            onKeyUp: function() { _state.onKeyUp(); },
            onCursorRight: function() { _state.onCursorRight(); },
            onCursorLeft: function() { _state.onCursorLeft(); },
            run: function() { _state.run(); },
            idle: function() { _state.idle(); },
            stop: function() { _state.stop(); },
            getStateName: function() { return _state.getName(); },
            setState: setState,
            setDirection(direction) {
                _direction = direction;
            }
        };
    };
    
    /**
     * doNothing: Prevents state transitions. 
     */ 
    function doNothing() { console.log('doing nothing!'); }
    
    function init(game) {
        let asset = game.add.sprite(spawnX, spawnY, 'halle');
        asset.anchor.setTo(.5, 1);
        
        animations.walk = asset.animations.add('walk', Phaser.Animation.generateFrameNames('walk-', 1, 30, '.png', 4), 30, true);
        animations.run = asset.animations.add('run', Phaser.Animation.generateFrameNames('run-', 1, 21, '.png', 4), 30, true);
        animations.stop = asset.animations.add('stop', Phaser.Animation.generateFrameNames('stop-', 1, 2, '.png', 4), 30, true);
        animations.idle = asset.animations.add('idle', Phaser.Animation.generateFrameNames('front-idle-', 1, 179, '.png', 4), 30, true);
        
        game.player = asset;
        game.physics.arcade.enable(asset);
    
        // {"w":69,"h":107}
        asset.body.setSize(22, 95, 0, -3);
        asset.body.collideWorldBounds = true;
        
        return asset;
    }
})(window);