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
            if (letterType == 'latinica' && text[i + 1] && (text[i] == 'L' || text[i] == 'N') && (text[i + 1] == 'J')) {
                textArray.push(text[i] + 'J');
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
            animalPlaceHolderLetters.eq(i).css({ 'background-color': '#01FF70' });
            animalPlaceHolderLetters.eq(i).attr('data-answer', 'correct');
        } else {
            animalPlaceHolderLetters.eq(i).css({ 'background-color': '#FF4136' });
            animalPlaceHolderLetters.eq(i).attr('data-answer', 'error');
        }
    }



    let currentIndex = 0;
    let letterType = 'cirilica';

    setKeboardLetters(letterType);
    setNewAnimal(animals[currentIndex], letterType);

    $('.js-letter-square').click(function () {
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

                var audio = new Audio('./audio/' + animals[currentIndex].alfabet.toLowerCase() + '.mp3');
                audio.play();

                setTimeout(function () {
                    currentIndex++;
                    if (currentIndex >= animals.length) {
                        currentIndex = 0;
                    }
                    animalPlaceHolderLetters.removeClass('waviy');
                    setNewAnimal(animals[currentIndex], letterType);
                }, 5000);
            }
        }

    });

    $('.js-animal-name-placeholder').on('click', '.js-animal-name-placeholder-letter', function () {
        $(this).text('');
        $(this).css({ 'background-color': 'white' });
    });

    $('.js-language-button').on('click', function () {
        $('.js-language-button').removeClass('active-language-button');
        $(this).addClass('active-language-button')
        letterType = $(this).attr('data-letter-type');
        currentIndex = 0;
        setKeboardLetters(letterType);
        setNewAnimal(animals[currentIndex], letterType);
    });

});