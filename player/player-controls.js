(function (window) {
    game.input.keyboard.addCallbacks(this, onDown, onUp, onPress);

    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
})
    
