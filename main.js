$(document).ready(function () {
    function setKeboardLetters(letterType) {
        let letters = latinica;
        if (letterType == 'cirilica' || letterType == 'alfabet') {
            letters = (letterType == 'cirilica') ? cirilica : alfabet;
        }

        let keyboardLetters = $('.js-letter-square');
        for (let i = 0; i < keyboardLetters.length; i++) {
            let letter = (letters[i]) ? letters[i] : '';
            keyboardLetters.eq(i).text(letter);
        }

    }

    function setNewAnimal(animal, letterType) {
        let animalNamePlaceholder = '';
        let animalNameData = (letterType == 'alfabet') ? animal[letterType] : animal.cirilica;
        let animalName = animal[letterType]
        for (let i = 0; i < animalNameData.length; i++) {
            let waviyIndex = i + 1;
            animalNamePlaceholder += '<div class="js-animal-name-placeholder-letter letter-square" style="--i:' + waviyIndex + '"></div>';
        }

        $('.js-animal-name').html(animalName);

        $('.js-animal-name-placeholder').html(animalNamePlaceholder);
        $('.js-animal-image').attr('src', './images/' + animal.alfabet.toLowerCase() + '.png');
    }

    function getLetterArray(text, letterType) {
        let textArray = [];
        for (let i = 0; i < text.length; i++) {
            if (letterType == 'latinica' && text[i + 1] && (text[i] == 'L' || text[i] == 'N') && (text[i + 1] == 'j')) {
                textArray.push(text[i] + 'j');
                i++;
            } else {
                textArray.push(text[i]);
            }
        }
        return textArray;
    }

    function setTheLetterColor(i) {
        let animalPlaceHolderLetters = $('.js-animal-name-placeholder-letter');
        let animalName = $('.js-animal-name').text();
        let animalNameArray = getLetterArray(animalName, letterType);

        if (animalNameArray[i] == animalPlaceHolderLetters.eq(i).text()) {
            animalPlaceHolderLetters.eq(i).addClass('correct-bgr');
            animalPlaceHolderLetters.eq(i).attr('data-answer', 'correct');
        } else {
            animalPlaceHolderLetters.eq(i).addClass('error-bgr');
            animalPlaceHolderLetters.eq(i).attr('data-answer', 'error');
        }
    }

    function setOptionText(letterType) {
        $('#image-option').text(optionText.image[letterType]);
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }



    let currentIndex = 0;
    let letterType = 'cirilica';
    let timeoutID;

    shuffleArray(animals);
    setOptionText(letterType);
    setKeboardLetters(letterType);
    setNewAnimal(animals[currentIndex], letterType);

    $('.js-letter-square').click(function () {
        if (!timeoutID) {
            if ($(this).text()) {
                let animalPlaceHolderLetters = $('.js-animal-name-placeholder-letter');
                for (let i = 0; i < animalPlaceHolderLetters.length; i++) {
                    if (animalPlaceHolderLetters.eq(i).text() == '') {
                        animalPlaceHolderLetters.eq(i).text($(this).text());
                        setTheLetterColor(i);
                        break;
                    }
                }
                let correctAnswers = 0;

                for (let i = 0; i < animalPlaceHolderLetters.length; i++) {
                    if (animalPlaceHolderLetters.eq(i).attr('data-answer') == 'correct') {
                        correctAnswers++;
                    }
                }

                if (correctAnswers == animalPlaceHolderLetters.length) {
                    animalPlaceHolderLetters.addClass('waviy');

                    if (letterType == 'alfabet') {
                        var audio = new Audio('./audio/' + animals[currentIndex].alfabet.toLowerCase() + '.mp3');
                        audio.play();
                    }

                    timeoutID = setTimeout(function () {
                        currentIndex++;
                        if (currentIndex >= animals.length) {
                            currentIndex = 0;
                        }
                        animalPlaceHolderLetters.removeClass('waviy');
                        setNewAnimal(animals[currentIndex], letterType);
                        timeoutID = null;
                    }, 5000);
                }
            }
        }
    });

    $('.js-animal-name-placeholder').on('click', '.js-animal-name-placeholder-letter', function () {
        if (!timeoutID && !$(this).hasClass('correct-bgr') && $(this).text()) {
            $(this).text('');
            $(this).removeClass('error-bgr');
        }
    });

    $('.js-lang-btn').on('click', function () {
        $('.js-lang-btn').removeClass('active-lang-btn');
        $(this).addClass('active-lang-btn');
        letterType = $(this).attr('data-letter-type');
        // currentIndex = 0;
        clearTimeout(timeoutID);
        timeoutID = null;
        setOptionText(letterType);
        setKeboardLetters(letterType);
        setNewAnimal(animals[currentIndex], letterType);
    });
    $('#text-toggle').on('change', function () {
        $('.js-animal-name').toggleClass('hide-with-opacity');
    });

});