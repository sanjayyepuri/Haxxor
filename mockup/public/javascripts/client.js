// Iteration #2 
// var socket = io.connect('http://localhost:3000');
//   socket.on('news', function (data) {
//     console.log(data);
//     socket.emit('my other event', { my: 'data' });
// });




// Iteration #2
// var g_state = true;
// var current_round;
// var submissions = 0;

// setInterval(function(){
//     if(g_state){
//         var val = Math.floor((Math.random() * 10) + 1);
//         submissions++;
//         console.log(val);
//         if(val > 5){
//             game.emit('correct_submission', {user: 'my_user', submission: submissions});
//             console.log('correct_submission: ' + current_round);
//         } else { 
//             console.log('incorrect_submission');
//         }
//     }
// },2000)

// game.on('init_client', function(data){
//     current_round = data.round;
//     console.log('Client Initialized');
//     console.log('Round 1')

// });

// game.on('round_won', function(data){
//     //console.log(data.winner + " won round " + current_round);
//     current_round = data.round;
//     console.log('Round '+ current_round);
// });

// game.on('game_won', function(data){
//     console.log('Game won  by ' + data.winner);
//     process.exit();
// });

var problem = [
    "Print \"Hello World\" (without quotes)",
    "Print \"I love \" in front of each input line",
    "Print the sum of the numbers 1-100",
    "Print the product of the two numbers on each line of the input",
    "Print the concatenated form of two strings on each line of the input"
]

$(document).ready(function() { 
    var lobby = io('http://localhost:3000/random-guid');
    var client_name = $("#competitor").text();

    // var round_active = false;
    // var submissions = 0;

    // setInterval(function(){
    //     if(round_active){
    //         var val = Math.floor((Math.random() * 10) + 1);
    //         submissions++;
    //         console.log(val);
    //         if(val > 5){
    //             console.log('correct_submission: ' + current_round);
    //             lobby.emit('correct_submission', {user: client_name, submission: submissions});
                
    //         } else { 
    //             console.log('incorrect_submission');
    //         }
    //     }
    // },2000)

    console.log('client started: ' + client_name)

    lobby.on('init_client', function(data){
        current_round = data.round;
        $("#problem").text(problem[data.round-1]);
        $("#round").text("Round " + data.round);
        lobby.emit('client_handshake', {user: client_name});
        console.log('Client Initialized.');
    });

    lobby.on('start_round', function(data){
        $("#round").text("Round " + data.round);
        $("#problem").text(problem[data.round-1]);
        console.log('Round ' + data.round);
        round_active = true;
    });

    lobby.on('round_over', function(data){
        //console.log(data.winner + " won round " + current_round);
        $("#round").text("Round " + data.round);
        $("#problem").text(problem[data.round-1]);
        $("#message").text("Welcome to " +client_name);
        round_active = false;
        lobby.emit('ready_up', {user: client_name});
    });

    lobby.on('game_won', function(data){
        console.log('Game won by ' + data.winner);
        $("#message").text(data.winner + " won!");
        //process.exit();
    });


    lobby.on('wrong_submission', function(data){
        if(client_name === data.user){
            $("#message").text("Incorrect");
        }
    });

});
