(function() {
 var questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }, {
    question: "What is 8*5?",
    choices: [25, 30, 40, 50, 65],
    correctAnswer: 2
  }, {
    question: "What is the sqaure root of 20?",
    choices: [20, 30, 5, 50, 64],
    correctAnswer: 2
  }, {
    question: "What is a fifth of 220?",
    choices: [22, 33, 44, 55, 65],
    correctAnswer: 2
  }, {
    question: "What is 5*5?",
    choices: [25, 22, 35, 11, 64],
    correctAnswer: 0
  }, {
    question: "What is 12*10 divided by 5?",
    choices: [22, 24, 40, 33, 12],
    correctAnswer: 1
  }, {
    question: "what is 100-44?",
    choices: [3, 33, 4, 56, 87],
    correctAnswer: 3
  }, {
    question: "What is 6*6?",
    choices: [20, 36, 40, 50, 64],
    correctAnswer: 1
  }, {
    question: "What is 6*1?",
    choices: [2, 6, 0, 5, 4],
    correctAnswer: 1
  }, {
    question: "What is 100+33?",
    choices: [20, 36, 67, 66, 133],
    correctAnswer: 4
  }, {
    question: "What is 6*10?",
    choices: [20, 36, 40, 50, 60],
    correctAnswer: 4
  }, {
    question: "What is 7*3?",
    choices: [21, 36, 40, 50, 60],
    correctAnswer: 0
  }, {
    question: "What is 10*10?",
    choices: [200, 1000, 1, 10, 100],
    correctAnswer: 4
  }, {
    question: "What is 55-20?",
    choices: [25, 35, 45, 50, 60],
    correctAnswer: 1
  }, {
    question: "What is the square root of 100?",
    choices: [20, 10, 40, 50, 60],
    correctAnswer: 1
  }, {
    question: "What is pie as a number 2 decimels?",
    choices: [2.78, 3.14, 4.45, 5.21, 6.75],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();